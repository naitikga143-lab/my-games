import * as THREE from 'three';
import { createCharacter } from '../player/model.js';
import { createFighter, shoot, revive, headCenter, fighters } from '../game/fighters.js';
import { WEAPONS } from '../player/weapons.js';
import { blockedAt, losClear, levelOf } from '../world/collision.js';
import { groundY } from '../world/stairs.js';
import { GAME } from '../game/config.js';
import { BOTS } from './config.js';
import * as nav from './nav.js';

const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const rnd = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 2;
const _eye = new THREE.Vector3(), _tp = new THREE.Vector3();
const _org = new THREE.Vector3(), _dir = new THREE.Vector3();

export class Bot {
  constructor(i, scene) {
    this.f = createFighter({ id: 'bot' + i, name: BOTS.NAMES[i % BOTS.NAMES.length] + BOTS.TAG });
    this.model = createCharacter();
    scene.add(this.model.group);

    this.skill = rnd(BOTS.SKILL_MIN, BOTS.SKILL_MAX);
    this.camper = Math.random() < 0.4;
    this.weapon = i % 2;
    this.model.setWeapon(this.weapon);

    this.yaw = Math.random() * 6.28; this.pitch = 0; this.bodyYaw = this.yaw;
    this.feetY = 0;
    this.vel = new THREE.Vector2(); this.des = new THREE.Vector2();
    this.path = []; this.pi = 0;
    this.state = 'hide'; this.sub = 'wait'; this.t = 0; this.waitT = 3; this.peekT = 1; this.hideYaw = this.yaw;
    this.target = null;
    this.lastSeen = new THREE.Vector3(); this.lastSeenT = -99;
    this.spotT = 0; this.percT = Math.random() * 0.3; this.react = 0.6;
    this.aimOff = new THREE.Vector3(); this.aimOffT = 0; this.aimHead = false; this.aimErr = 1;
    this.fireCool = 0; this.burst = 0;
    this.strafe = 1; this.strafeT = 0;
    this.coverCD = 0; this.hitT = -99; this.repathT = 0;
    this.running = false; this.runPlan = false;
    this.deadT = 0; this.stuckT = 0; this.stuckPos = new THREE.Vector2();
    this.now = 0; this.press = 0; this.player = null;
    this.st = { speed: 0, side: 0, dir: 1, crouch: false, run: false, lean: 0, pitch: 0, twist: 0 };
    this.newReact();
  }

  newReact() { this.react = 0.75 - this.skill * 0.4 + Math.random() * 0.25; }
  eye(out) { return out.set(this.f.pos.x, this.feetY + (this.f.crouch ? 0.8 : 1.3), this.f.pos.z); }
  setSub(s) { this.sub = s; this.t = 0; }
  faceYaw(y, dt, rate) { this.yaw += wrap(y - this.yaw) * Math.min(1, dt * rate); }

  // ---------- spawn / death ----------
  spawn(avoid) {
    let n = null;
    for (let k = 0; k < 12; k++) {
      n = nav.randomHide();
      if (!avoid || Math.hypot(n.x - avoid.x, n.z - avoid.z) > 14 || levelOf(n.y) !== levelOf(avoid.y)) break;
    }
    revive(this.f, n.x, n.y, n.z);
    this.feetY = n.y;
    this.vel.set(0, 0); this.des.set(0, 0);
    this.path = []; this.target = null; this.spotT = 0;
    this.yaw = nav.openDirection(n.x, n.y, n.z);
    this.bodyYaw = this.yaw; this.hideYaw = this.yaw;
    this.state = 'hide'; this.sub = 'wait'; this.t = 0; this.waitT = rnd(2, 8);
    this.f.crouch = Math.random() < 0.5;
    this.deadT = 0;
    this.model.setDead(0);
    this.model.group.visible = true;
  }

  die() {
    this.state = 'dead';
    this.deadT = 0;
    this.des.set(0, 0); this.vel.set(0, 0);
    this.model.group.visible = true;
    this.model.group.position.copy(this.f.pos);
    this.model.group.rotation.y = this.bodyYaw + Math.PI;
  }

  updateDead(dt, ctx) {
    this.deadT += dt;
    this.model.setDead(Math.min(1, this.deadT * 3));
    const p = this.f.pos;
    const near = Math.hypot(p.x - ctx.camPos.x, p.z - ctx.camPos.z) < 34;
    this.model.group.visible = this.deadT < 4 && near;
    if (GAME.RESPAWN && this.deadT > GAME.RESPAWN_DELAY + Math.random() * 0.01) this.spawn(ctx.player.pos);
  }

  // ---------- events ----------
  hear(shooter, pos) {
    const f = this.f;
    if (!f.alive || shooter === f || this.state === 'combat') return;
    const d = Math.hypot(pos.x - f.pos.x, pos.z - f.pos.z);
    const otherFloor = Math.abs(pos.y - 1.3 - f.pos.y) > 3;
    const range = BOTS.HEAR * (this.camper ? 0.5 : 1) * (otherFloor ? 0.5 : 1);
    if (d > range || Math.random() > 0.45 + this.skill * 0.45) return;
    this.goSearch(pos.x + rnd(-2, 2), pos.y - 1.3, pos.z + rnd(-2, 2));
  }

  hurt(attacker) {
    this.hitT = this.now;
    if (!attacker || attacker === this.f || !attacker.alive || !this.f.alive) return;
    if (this.state !== 'combat') {
      this.engage(attacker);
      this.fireCool = Math.max(this.fireCool, 0.15 + rnd(0, 0.25));   // palatne me time lagta hai
    }
  }

  // ---------- main update ----------
  update(dt, ctx) {
    this.now = ctx.now; this.press = ctx.pressure; this.player = ctx.player;
    if (!this.f.alive) { this.updateDead(dt, ctx); return; }

    this.t += dt; this.fireCool -= dt; this.coverCD -= dt; this.repathT -= dt;
    this.running = false;
    this.des.set(0, 0);
    this.perceive(dt);

    switch (this.state) {
      case 'hide': this.doHide(dt); break;
      case 'roam': this.doRoam(dt); break;
      case 'search': this.doSearch(dt); break;
      case 'combat': this.doCombat(dt); break;
    }
    if (this.state !== 'combat') this.pitch *= 1 - Math.min(1, dt * 4);

    this.move(dt);
    this.animate(dt, ctx);
  }

  // ---------- dekhna ----------
  perceive(dt) {
    this.percT -= dt;
    if (this.percT > 0) return;
    const dtp = BOTS.PERCEPT_DT + Math.random() * 0.08;
    this.percT = dtp;

    const f = this.f;
    this.eye(_eye);
    const level = levelOf(this.feetY);
    const cosHalf = Math.cos(BOTS.FOV / 2);
    let best = null, bd = Infinity;

    for (const o of fighters) {
      if (o === f || !o.alive) continue;
      const dx = o.pos.x - f.pos.x, dz = o.pos.z - f.pos.z;
      const d = Math.hypot(dx, dz);
      if (d > BOTS.SIGHT || d >= bd) continue;
      if (Math.abs(o.pos.y - this.feetY) > 3.2 && d > 6) continue;
      if (d > 2.5) {
        const dot = (dx * -Math.sin(this.yaw) + dz * -Math.cos(this.yaw)) / d;
        if (dot < cosHalf) continue;
      }
      if (o.crouch && d > 10 && Math.random() < 0.35) continue;
      headCenter(o, _tp);
      let vis = losClear(_eye, _tp, level);
      if (!vis) {
        _tp.y = o.pos.y + (o.crouch ? 0.45 : 0.9);
        vis = losClear(_eye, _tp, level);
      }
      if (vis) { best = o; bd = d; }
    }

    if (best) {
      if (this.state === 'combat') {
        if (!this.target || best === this.target) this.target = best;
        else if (bd < Math.hypot(this.target.pos.x - f.pos.x, this.target.pos.z - f.pos.z) * 0.7) this.target = best;
        if (best === this.target) { this.lastSeen.copy(best.pos); this.lastSeenT = this.now; }
      } else {
        this.spotT += dtp;
        if (this.spotT >= this.react) this.engage(best);
      }
    } else {
      this.spotT = Math.max(0, this.spotT - dtp * 1.5);
    }
  }

  engage(t) {
    this.target = t;
    this.state = 'combat';
    this.setSub('engage');
    this.lastSeen.copy(t.pos);
    this.lastSeenT = this.now;
    this.path = []; this.spotT = 0; this.aimOffT = 0; this.strafeT = 0;
    this.coverCD = Math.min(this.coverCD, rnd(0, 2));
    this.f.crouch = false;
  }

  // ---------- plan ----------
  pickPlan() {
    this.f.crouch = false;
    this.target = null;
    this.newReact();
    this.setSub('move');
    const hideP = clamp((this.camper ? 0.75 : 0.45) - 0.5 * this.press, 0.1, 0.9);
    if (Math.random() < hideP) {
      this.state = 'hide';
      this.pathTo(nav.randomHide());
    } else {
      this.state = 'roam';
      this.runPlan = Math.random() < 0.3;
      this.pathTo(this.roamGoal());
    }
  }

  roamGoal() {
    const pl = this.player;
    if (pl && pl.alive && Math.random() < this.press * 0.75) {
      return nav.nodeNear(pl.pos.x + rnd(-8, 8), pl.pos.y, pl.pos.z + rnd(-8, 8), 7);
    }
    return nav.randomNode();
  }

  goSearch(x, y, z) {
    this.state = 'search';
    this.setSub('go');
    this.f.crouch = false;
    this.target = null;
    this.pathTo(nav.nearest(x, y, z));
  }

  pathTo(n) {
    this.path = []; this.pi = 0;
    if (!n) return false;
    const s = nav.nearest(this.f.pos.x, this.feetY, this.f.pos.z);
    const p = s ? nav.findPath(s.i, n.i) : null;
    if (!p) return false;
    this.path = p;
    if (p.length > 1) {
      const a = nav.nodes[p[0]], b = nav.nodes[p[1]];
      const x = this.f.pos.x, z = this.f.pos.z;
      if (Math.hypot(x - b.x, z - b.z) < Math.hypot(a.x - b.x, a.z - b.z)) this.pi = 1;
    }
    return true;
  }

  // 'moving' | 'arrived' | 'none'
  followPath(speed, dt) {
    if (this.pi >= this.path.length) return 'none';
    const p = this.f.pos;
    let n = nav.nodes[this.path[this.pi]];
    let dx = n.x - p.x, dz = n.z - p.z, d = Math.hypot(dx, dz);
    if (d < 0.45) {
      this.pi++;
      if (this.pi >= this.path.length) { this.path = []; return 'arrived'; }
      n = nav.nodes[this.path[this.pi]];
      dx = n.x - p.x; dz = n.z - p.z; d = Math.hypot(dx, dz);
    }
    if (d < 1e-4) return 'moving';
    this.des.set((dx / d) * speed, (dz / d) * speed);
    this.running = speed > BOTS.WALK + 0.5;
    return 'moving';
  }

  faceMove(dt) {
    if (this.des.lengthSq() > 0.01) this.faceYaw(Math.atan2(-this.des.x, -this.des.y), dt, 8);
  }

  scan(dt, spread) {
    this.peekT -= dt;
    if (this.peekT <= 0) { this.peekT = rnd(0.6, 1.8); this.hideYaw += rnd(-spread, spread); }
    this.faceYaw(this.hideYaw, dt, 3.5);
  }

  // ---------- states ----------
  doHide(dt) {
    if (this.sub === 'move') {
      const r = this.followPath(this.runPlan ? BOTS.RUN : BOTS.WALK, dt);
      this.faceMove(dt);
      if (r !== 'moving') {
        this.setSub('wait');
        this.waitT = this.camper ? rnd(6, 16) : rnd(3, 8);
        this.hideYaw = nav.openDirection(this.f.pos.x, this.feetY, this.f.pos.z);
        this.f.crouch = Math.random() < 0.6;
      }
      return;
    }
    this.scan(dt, 1.1);
    if (this.t > this.waitT) this.pickPlan();
  }

  doRoam(dt) {
    if (this.sub === 'move') {
      const r = this.followPath(this.runPlan ? BOTS.RUN : BOTS.WALK, dt);
      this.faceMove(dt);
      if (r !== 'moving') { this.setSub('look'); this.waitT = rnd(1, 2.5); this.hideYaw = this.yaw; }
      return;
    }
    this.scan(dt, 1.6);
    if (this.t > this.waitT) this.pickPlan();
  }

  doSearch(dt) {
    if (this.sub === 'go') {
      const r = this.followPath(this.camper ? BOTS.WALK : BOTS.RUN * 0.85, dt);
      this.faceMove(dt);
      if (r !== 'moving') { this.setSub('look'); this.waitT = rnd(2, 4.5); this.hideYaw = this.yaw; }
      return;
    }
    this.scan(dt, 1.8);
    if (this.t > this.waitT) this.pickPlan();
  }

  doCombat(dt) {
    const f = this.f, t = this.target;
    if (!t || !t.alive) {
      this.target = null;
      if (this.now - this.lastSeenT < 8) this.goSearch(this.lastSeen.x, this.lastSeen.y, this.lastSeen.z);
      else this.pickPlan();
      return;
    }
    const p = f.pos;
    const dx = t.pos.x - p.x, dz = t.pos.z - p.z;
    const dist = Math.hypot(dx, dz) || 0.01;
    const seen = this.now - this.lastSeenT < 0.45;

    // kam health: aad dhoondho
    if (this.sub !== 'cover' && this.sub !== 'hold' && f.hp < 45 && this.coverCD <= 0 && seen) {
      this.coverCD = rnd(5, 9);
      const c = nav.findCover(p, t.pos);
      if (c && this.pathTo(c)) { this.setSub('cover'); f.crouch = false; return; }
    }
    if (this.sub === 'cover') {
      const r = this.followPath(BOTS.RUN, dt);
      this.faceMove(dt);
      if (r !== 'moving') { this.setSub('hold'); f.crouch = true; this.waitT = rnd(1.5, 3.5); }
      return;
    }
    if (this.sub === 'hold') {
      this.faceYaw(Math.atan2(-dx, -dz), dt, 5);
      if (this.t > this.waitT || (seen && dist < 7)) {
        f.crouch = false;
        this.setSub('engage');
        this.fireCool = Math.max(this.fireCool, 0.2);
      }
      return;
    }

    // dikhna band: peecha karo
    if (!seen) {
      if (this.sub !== 'chase') {
        this.setSub('chase');
        this.pathTo(nav.nearest(this.lastSeen.x, this.lastSeen.y, this.lastSeen.z));
      }
      const r = this.followPath(BOTS.RUN * 0.9, dt);
      this.faceMove(dt);
      const lost = this.now - this.lastSeenT;
      if (lost > 6 || (r !== 'moving' && lost > 1.5)) {
        this.goSearch(this.lastSeen.x, this.lastSeen.y, this.lastSeen.z);
      }
      return;
    }
    if (this.sub !== 'engage') this.setSub('engage');

    // nishana (skill ke hisaab se galti)
    const w = WEAPONS[this.weapon];
    this.aimOffT -= dt;
    if (this.aimOffT <= 0) {
      this.aimOffT = rnd(0.25, 0.5);
      const e = (1 - this.skill) * 0.55 * (1 + dist / 18) * (this.vel.length() > 1 ? 1.4 : 1);
      this.aimOff.set(gauss() * e * 0.5, gauss() * e * 0.35, gauss() * e * 0.5);
      this.aimHead = Math.random() < 0.08 + this.skill * 0.3;
    }
    const ty = this.aimHead ? (t.crouch ? 0.85 : 1.31) : (t.crouch ? 0.55 : 0.95);
    _tp.set(t.pos.x, t.pos.y + ty, t.pos.z).add(this.aimOff);
    this.eye(_eye);
    const ddx = _tp.x - _eye.x, ddy = _tp.y - _eye.y, ddz = _tp.z - _eye.z;
    const want = Math.atan2(-ddx, -ddz);
    const wantPitch = Math.atan2(ddy, Math.hypot(ddx, ddz));
    const rate = 3.5 + this.skill * 8;
    this.faceYaw(want, dt, rate);
    this.pitch += (wantPitch - this.pitch) * Math.min(1, dt * rate);
    const err = Math.abs(wrap(want - this.yaw));

    // strafe + doori control
    this.strafeT -= dt;
    if (this.strafeT <= 0) {
      this.strafeT = rnd(0.7, 2);
      this.strafe = Math.random() < 0.5 ? -1 : 1;
      if (Math.random() < 0.15) f.crouch = dist > 6 && Math.random() < 0.5;
    }
    const nx = dx / dist, nz = dz / dist;
    const sp = BOTS.WALK * 0.7;
    let appr = 0;
    if (dist > 14) appr = 1; else if (dist < 5) appr = -0.8;
    this.des.set(-nz * this.strafe * sp + nx * appr * BOTS.WALK, nx * this.strafe * sp + nz * appr * BOTS.WALK);
    if (f.crouch) this.des.multiplyScalar(0.4);

    // goli (jahan bot dekh raha hai wahin jaati hai, seedha target pe nahi)
    if (BOTS.FIRE && this.t > this.react * 0.6 && this.fireCool <= 0 && err < 0.12 + (1 - this.skill) * 0.1) {
      _org.copy(_eye);
      const cp = Math.cos(this.pitch);
      _dir.set(-Math.sin(this.yaw) * cp, Math.sin(this.pitch), -Math.cos(this.yaw) * cp);
      _dir.x += (Math.random() - 0.5) * 2 * w.spread;
      _dir.y += (Math.random() - 0.5) * 2 * w.spread;
      _dir.z += (Math.random() - 0.5) * 2 * w.spread;
      _dir.normalize();
      shoot(f, _org, _dir, w);
      this.model.kick();
      if (w.auto) {
        this.burst--;
        if (this.burst <= 0) {
          this.burst = Math.floor(rnd(3, 7));
          this.fireCool = rnd(0.25, 0.7) * (1.3 - this.skill);
        } else this.fireCool = w.delay;
      } else {
        this.fireCool = w.delay * rnd(1.1, 2.2) * (1.4 - this.skill * 0.6);
      }
    }
  }

  // ---------- chalna ----------
  move(dt) {
    const f = this.f, p = f.pos;
    const top = f.crouch ? 0.9 : 1.4;
    const k = Math.min(1, dt * 8);
    this.vel.x += (this.des.x - this.vel.x) * k;
    this.vel.y += (this.des.y - this.vel.y) * k;
    const nx = p.x + this.vel.x * dt, nz = p.z + this.vel.y * dt;
    if (!blockedAt(nx, p.z, this.feetY, top)) p.x = nx; else this.vel.x = 0;
    if (!blockedAt(p.x, nz, this.feetY, top)) p.z = nz; else this.vel.y = 0;
    const g = groundY(p.x, p.z, this.feetY);
    this.feetY += (g - this.feetY) * Math.min(1, dt * 12);
    p.y = this.feetY;

    // atak gaya to rasta badlo
    if (this.des.lengthSq() > 0.5) {
      this.stuckT += dt;
      if (this.stuckT > 1.2) {
        if (Math.hypot(p.x - this.stuckPos.x, p.z - this.stuckPos.y) < 0.3) this.unstuck();
        this.stuckT = 0;
        this.stuckPos.set(p.x, p.z);
      }
    } else {
      this.stuckT = 0;
      this.stuckPos.set(p.x, p.z);
    }
  }

  unstuck() {
    this.strafe *= -1;
    if (this.state !== 'combat') this.pickPlan();
    else this.path = [];
  }

  // ---------- animation (door wale bots ki animation skip, mobile ke liye) ----------
  animate(dt, ctx) {
    const f = this.f, g = this.model.group;
    this.bodyYaw += wrap(this.yaw - this.bodyYaw) * Math.min(1, dt * 9);
    let tw = wrap(this.yaw - this.bodyYaw);
    if (Math.abs(tw) > 1.2) { this.bodyYaw = this.yaw - Math.sign(tw) * 1.2; tw = Math.sign(tw) * 1.2; }

    const near = Math.hypot(f.pos.x - ctx.camPos.x, f.pos.z - ctx.camPos.z) < 40;
    g.visible = near;
    if (!near) return;

    g.position.copy(f.pos);
    g.rotation.y = this.bodyYaw + Math.PI;
    const st = this.st;
    st.speed = this.vel.length() / 4.2;
    const fwd = (this.vel.x * -Math.sin(this.yaw) + this.vel.y * -Math.cos(this.yaw)) / 4.2;
    st.side = (this.vel.x * Math.cos(this.yaw) + this.vel.y * -Math.sin(this.yaw)) / 4.2;
    st.dir = fwd < -0.3 ? -1 : 1;
    st.crouch = f.crouch;
    st.run = this.running;
    st.lean = 0;
    st.pitch = this.pitch;
    st.twist = tw;
    this.model.update(dt, st);
  }
}