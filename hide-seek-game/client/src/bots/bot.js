import * as THREE from 'three';
import { createCharacter } from '../player/model.js';
import { createFighter, shoot, revive, headCenter, fighters } from '../game/fighters.js';
import { BOT_GUN } from '../game/weapondata.js';
import { blockedAt, losClear, levelOf } from '../world/collision.js';
import { groundY } from '../world/stairs.js';
import { BOTS } from './config.js';
import * as nav from './nav.js';

const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const rnd = (a, b) => a + Math.random() * (b - a);
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) * 2;
const _eye = new THREE.Vector3(), _tp = new THREE.Vector3();
const _org = new THREE.Vector3(), _dir = new THREE.Vector3();

const stubModel = () => ({
  group: { visible: true, position: { copy() {}, set() {} }, rotation: { x: 0, y: 0 } },
  update() {}, setWeapon() {}, kick() {}, setDead() {},
});

// Table-cover shooter: table ke peeche chhupta hai, jhaank ke goli chalata hai,
// player paas aaye to daudke doosri table ke peeche chala jaata hai.
export class Bot {
  constructor(i, scene, headless = false) {
    this.headless = headless;
    this.f = createFighter({ id: 'bot' + i, name: BOTS.NAMES[i % BOTS.NAMES.length] + BOTS.TAG });
    this.f.isBot = true;
    if (headless) this.model = stubModel();
    else { this.model = createCharacter(); scene.add(this.model.group); }
    this.model.setWeapon(3);

    this.skill = rnd(BOTS.SKILL_MIN, BOTS.SKILL_MAX);
    this.camper = false; this.rusher = false; this.weapon = 3;
    this.yaw = 0; this.pitch = 0; this.bodyYaw = 0; this.feetY = 0;
    this.vel = new THREE.Vector2(); this.des = new THREE.Vector2();
    this.path = []; this.pi = 0;
    this.state = 'dead'; this.sub = 'wait'; this.t = 0; this.waitT = 3;
    this.peekDur = 1.4; this.shots = 0; this.burstTotal = 4;
    this.node = null; this.hideYaw = 0; this.alertYaw = 0; this.alertT = 0;
    this.vis = null; this.visT = 0; this.contact = false;
    this.lastSeen = new THREE.Vector3(); this.lastSeenT = -99;
    this.percT = Math.random() * 0.3; this.react = 0.6;
    this.aimOff = new THREE.Vector3(); this.aimOffT = 0; this.aimHead = false;
    this.fireCool = 0; this.fleeCD = 0; this.fleeing = false; this.relocT = 30; this.hitT = -99;
    this.running = false; this.deadT = 0; this.now = 0; this.onEngage = null;
    this.stuckT = 0; this.stuckPos = new THREE.Vector2();
    this.st = { speed: 0, side: 0, dir: 1, crouch: false, run: false, lean: 0, pitch: 0, twist: 0 };
    this.newReact();
  }

  newReact() { this.react = 0.75 - this.skill * 0.4 + Math.random() * 0.25; }
  eye(out) { return out.set(this.f.pos.x, this.feetY + (this.f.crouch ? 0.8 : 1.3), this.f.pos.z); }
  faceYaw(y, dt, rate) { this.yaw += wrap(y - this.yaw) * Math.min(1, dt * rate); }
  release() { if (this.node) nav.occ.delete(this.node.i); this.node = null; }

  // ---------- spawn / death ----------
  spawn(avoid, node) {
    let n = node || nav.randomHide();
    if (!node && avoid) {
      for (let k = 0; k < 10; k++) {
        n = nav.randomHide();
        if (Math.hypot(n.x - avoid.x, n.z - avoid.z) > 10) break;
      }
    }
    this.release();
    revive(this.f, n.x, n.y, n.z);
    this.feetY = n.y;
    this.vel.set(0, 0); this.des.set(0, 0);
    this.node = n; nav.occ.add(n.i);
    this.hideYaw = n.face !== undefined ? n.face : Math.random() * 6.28;
    this.yaw = this.hideYaw; this.bodyYaw = this.yaw;
    this.state = 'cover'; this.sub = 'wait'; this.t = 0; this.waitT = rnd(3, 7);
    this.relocT = rnd(25, 50);
    this.f.crouch = true;
    this.vis = null; this.visT = 0; this.contact = false; this.alertT = 0;
    this.fleeing = false; this.fleeCD = 0; this.path = [];
    this.deadT = 0;
    this.model.setDead(0);
    this.model.group.visible = true;
  }

  die() {
    this.release();
    this.state = 'dead';
    this.deadT = 0;
    this.des.set(0, 0); this.vel.set(0, 0);
    if (!this.headless) {
      this.model.group.visible = true;
      this.model.group.position.copy(this.f.pos);
      this.model.group.rotation.y = this.bodyYaw + Math.PI;
    }
  }

  updateDead(dt, ctx) {
    this.deadT += dt;
    if (this.headless) return;
    this.model.setDead(Math.min(1, this.deadT * 3));
    const p = this.f.pos;
    const near = Math.hypot(p.x - ctx.camPos.x, p.z - ctx.camPos.z) < 34;
    this.model.group.visible = this.deadT < 4 && near;
  }

  // ---------- events ----------
  alertTo(pos) {
    this.alertT = 5;
    this.alertYaw = Math.atan2(-(pos.x - this.f.pos.x), -(pos.z - this.f.pos.z));
  }

  hear(shooter, pos) {
    const f = this.f;
    if (!f.alive || shooter === f || (shooter && shooter.isBot)) return;
    const d = Math.hypot(pos.x - f.pos.x, pos.z - f.pos.z);
    if (d > BOTS.HEAR || Math.random() > 0.5 + this.skill * 0.4) return;
    this.alertTo(pos);
  }

  // director "awaaz sunao" bolta hai: bot hilta nahi, bas jaldi jhaankta hai
  goSearch(x, y, z) { this.alertTo({ x, y, z }); }

  hurt(attacker) {
    this.hitT = this.now;
    if (!attacker || attacker === this.f || attacker.isBot || !attacker.alive || !this.f.alive) return;
    this.lastSeen.copy(attacker.pos);
    this.lastSeenT = this.now;
    this.alertTo(attacker.pos);
    if (this.state === 'cover' && this.sub === 'peek' && Math.random() < 0.6) this.endPeek();   // goli lage to jhuk jao
  }

  // ---------- main ----------
  update(dt, ctx) {
    this.now = ctx.now;
    if (!this.f.alive) { this.updateDead(dt, ctx); return; }
    this.t += dt; this.fireCool -= dt; this.fleeCD -= dt; this.alertT -= dt; this.relocT -= dt;
    this.running = false;
    this.des.set(0, 0);
    this.perceive(dt);
    if (this.state === 'move') this.doMove(dt); else this.doCover(dt);
    this.move(dt);
    this.animate(dt, ctx);
  }

  closest(maxD) {
    let best = null, bd = maxD * maxD;
    const p = this.f.pos, lv = levelOf(this.feetY);
    for (const o of fighters) {
      if (o === this.f || !o.alive || o.isBot || levelOf(o.pos.y) !== lv) continue;
      const d = (o.pos.x - p.x) ** 2 + (o.pos.z - p.z) ** 2;
      if (d < bd) { bd = d; best = o; }
    }
    return best;
  }

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
      if (o === f || !o.alive || o.isBot) continue;
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
      this.vis = best;
      this.visT += dtp;
      this.lastSeen.copy(best.pos);
      this.lastSeenT = this.now;
    } else {
      this.vis = null;
      this.visT = 0;
      if (this.now - this.lastSeenT > 6) this.contact = false;
    }
  }

  // ---------- table ke peeche ----------
  shouldFlee() {
    const t = this.vis;
    if (this.closest(3.5)) return true;                                  // bilkul paas aa gaya
    if (t && Math.hypot(t.pos.x - this.f.pos.x, t.pos.z - this.f.pos.z) < 5.5) return true;
    if (this.now - this.hitT < 1.2 && this.closest(8)) return true;     // maar bhi raha hai aur paas bhi hai
    return false;
  }

  flee() {
    const t = this.vis || this.closest(12);
    const from = t ? t.pos : this.lastSeen;
    this.fleeCD = rnd(4, 7);
    const n = nav.findTableCover(this.f.pos, from, this.node);
    if (n && this.pathTo(n)) { this.goTo(n, true); return; }
    this.startPeek();   // koi jagah nahi: khade hokar lado
  }

  goTo(n, fleeing) {
    this.release();
    this.node = n; nav.occ.add(n.i);
    this.state = 'move';
    this.fleeing = fleeing;
    this.f.crouch = false;
  }

  relocate() {
    let n = null;
    for (let k = 0; k < 8; k++) {
      const c = nav.randomHide();
      if (c && c !== this.node && !nav.occ.has(c.i)) { n = c; break; }
    }
    if (n && this.pathTo(n)) this.goTo(n, false);
    else this.relocT = rnd(15, 30);
  }

  arrive() {
    this.state = 'cover'; this.sub = 'wait'; this.t = 0;
    this.waitT = this.fleeing ? rnd(3, 6) : rnd(2, 5);
    this.fleeing = false;
    this.hideYaw = this.node && this.node.face !== undefined ? this.node.face : this.yaw;
    this.f.crouch = true;
    this.relocT = rnd(25, 50);
    this.path = [];
  }

  doMove(dt) {
    this.f.crouch = false;
    const r = this.followPath(this.fleeing ? BOTS.RUN : BOTS.WALK, dt);
    this.faceMove(dt);
    if (r !== 'moving') this.arrive();
  }

  startPeek() {
    this.state = 'cover';
    this.sub = 'peek'; this.t = 0;
    this.peekDur = rnd(1.0, 1.8);
    this.shots = 0;
    this.burstTotal = Math.floor(rnd(3, 7));
    this.aimOffT = 0;
    this.newReact();
  }

  endPeek() {
    const fired = this.shots > 0;
    this.sub = 'wait'; this.t = 0;
    this.f.crouch = true;
    this.waitT = fired ? rnd(1.4, 3.0) : rnd(2.5, 5.5);
    this.shots = 0;
  }

  doCover(dt) {
    const f = this.f;
    if (this.fleeCD <= 0 && this.shouldFlee()) { this.flee(); return; }

    if (this.sub === 'wait') {
      f.crouch = true;
      this.faceYaw(this.alertT > 0 ? this.alertYaw : this.hideYaw, dt, 4);
      const eager = this.alertT > 0 ? 0.45 : 1;
      if (this.t > this.waitT * eager) this.startPeek();
      else if (this.relocT <= 0 && this.alertT <= 0 && !this.vis) this.relocate();   // bahut kam
      return;
    }
    this.doPeek(dt);
  }

  doPeek(dt) {
    const f = this.f, t = this.vis;
    f.crouch = false;
    if (!t) {
      this.faceYaw(this.alertT > 0 ? this.alertYaw : this.hideYaw, dt, 4);
      if (this.t > this.peekDur) this.endPeek();
      return;
    }
    if (!this.contact) { this.contact = true; if (this.onEngage) this.onEngage(this, t); }

    this.aimOffT -= dt;
    if (this.aimOffT <= 0) {
      this.aimOffT = rnd(0.25, 0.5);
      const dist = Math.hypot(t.pos.x - f.pos.x, t.pos.z - f.pos.z);
      const e = (1 - this.skill) * 0.55 * (1 + dist / 18);
      this.aimOff.set(gauss() * e * 0.5, gauss() * e * 0.35, gauss() * e * 0.5);
      this.aimHead = Math.random() < 0.08 + this.skill * 0.3;
    }
    const ty = this.aimHead ? (t.crouch ? 0.85 : 1.31) : (t.crouch ? 0.55 : 0.95);
    _tp.set(t.pos.x, t.pos.y + ty, t.pos.z).add(this.aimOff);
    this.eye(_eye);
    const ddx = _tp.x - _eye.x, ddy = _tp.y - _eye.y, ddz = _tp.z - _eye.z;
    const want = Math.atan2(-ddx, -ddz);
    const wantPitch = Math.atan2(ddy, Math.hypot(ddx, ddz));
    const rate = 4 + this.skill * 8;
    this.faceYaw(want, dt, rate);
    this.pitch += (wantPitch - this.pitch) * Math.min(1, dt * rate);
    const err = Math.abs(wrap(want - this.yaw));

    if (BOTS.FIRE && this.visT >= this.react * 0.5 && this.fireCool <= 0 && err < 0.12 + (1 - this.skill) * 0.1) {
      _org.copy(_eye);
      const cp = Math.cos(this.pitch);
      _dir.set(-Math.sin(this.yaw) * cp, Math.sin(this.pitch), -Math.cos(this.yaw) * cp);
      _dir.x += (Math.random() - 0.5) * 2 * BOT_GUN.spread;
      _dir.y += (Math.random() - 0.5) * 2 * BOT_GUN.spread;
      _dir.z += (Math.random() - 0.5) * 2 * BOT_GUN.spread;
      _dir.normalize();
      shoot(f, _org, _dir, BOT_GUN);
      this.model.kick();
      this.shots++;
      this.fireCool = BOT_GUN.delay * rnd(1, 1.5);
    }
    if (this.shots >= this.burstTotal || this.t > this.peekDur + 1.6) this.endPeek();
  }

  // ---------- rasta ----------
  pathTo(n) {
    this.path = []; this.pi = 0;
    if (!n) return false;
    const s = nav.nearest(this.f.pos.x, this.feetY, this.f.pos.z);
    const p = s ? nav.findPath(s.i, n.i) : null;
    if (!p) return false;
    this.path = p;
    if (p.length > 1) {
      const a = nav.nodes[p[0]], b = nav.nodes[p[1]];
      if (Math.hypot(this.f.pos.x - b.x, this.f.pos.z - b.z) < Math.hypot(a.x - b.x, a.z - b.z)) this.pi = 1;
    }
    return true;
  }

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

    if (this.des.lengthSq() > 0.5) {
      this.stuckT += dt;
      if (this.stuckT > 1.2) {
        if (Math.hypot(p.x - this.stuckPos.x, p.z - this.stuckPos.y) < 0.3 && this.state === 'move') this.arrive();
        this.stuckT = 0;
        this.stuckPos.set(p.x, p.z);
      }
    } else {
      this.stuckT = 0;
      this.stuckPos.set(p.x, p.z);
    }
  }

  animate(dt, ctx) {
    this.bodyYaw += wrap(this.yaw - this.bodyYaw) * Math.min(1, dt * 9);
    if (this.headless) return;
    const f = this.f, g = this.model.group;
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