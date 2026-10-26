import * as THREE from 'three';
import { Bot } from './bot.js';
import { createCreatureModel } from '../game/creaturemodel.js';
import { fighters, headCenter } from '../game/fighters.js';
import { losClear, levelOf } from '../world/collision.js';
import * as nav from './nav.js';

const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const rnd = (a, b) => a + Math.random() * (b - a);
const CS = { SPEED: 2.7, DASH: 1.7, SIGHT: 32, SEP: 2.4, MATE_GAP: 4 };
const _e = new THREE.Vector3(), _tp = new THREE.Vector3();

// Ghoomta hua creature: chalta rehta hai, chalte-chalte patakha phenkta hai.
export class Creature extends Bot {
  constructor(i, scene, headless, room) {
    super(i, scene, headless, headless ? null : () => createCreatureModel(room));
    this.room = room;
    this.fwType = 0;
    this.fw = null;
    this.mates = [];
    this.wait = 0;
    this.dashT = 0;
    this.f.isBot = true;
  }

  spawn(avoid, node) {
    super.spawn(avoid, node);
    this.state = 'move'; this.sub = 'walk';
    this.f.crouch = false;
    this.path = [];
    this.wait = rnd(0.2, 0.8);
    this.fireCool = rnd(1.5, 3);
    this.dashT = 0;
    this.pitch = 0;
  }

  arrive() { this.path = []; this.wait = rnd(0.1, 0.4); }   // atak gaya to naya target

  hurt(attacker) { super.hurt(attacker); this.dashT = 1.3; }

  update(dt, ctx) {
    this.now = ctx.now;
    if (!this.f.alive) { this.updateDead(dt, ctx); return; }
    if (this.f.hidden) {
      this.f.crouch = false; this.des.set(0, 0);
      this.move(dt); this.animate(dt, ctx);
      return;
    }
    this.t += dt; this.fireCool -= dt; this.dashT -= dt;
    this.running = false;
    this.des.set(0, 0);
    this.f.crouch = false;
    this.perceive(dt);
    this.walk(dt);
    this.separate();
    this.look(dt);
    this.tryThrow();
    this.move(dt);
    this.animate(dt, ctx);
  }

  // ---------- dekhna ----------
  perceive(dt) {
    this.percT -= dt;
    if (this.percT > 0) return;
    const dtp = 0.2 + Math.random() * 0.05;
    this.percT = dtp;
    const f = this.f;
    this.eye(_e);
    const level = levelOf(this.feetY);
    let best = null, bd = Infinity;
    for (const o of fighters) {
      if (o === f || !o.alive || o.isBot || o.hidden) continue;
      const d = Math.hypot(o.pos.x - f.pos.x, o.pos.z - f.pos.z);
      if (d > CS.SIGHT || d >= bd) continue;
      if (Math.abs(o.pos.y - this.feetY) > 3.2 && d > 6) continue;
      headCenter(o, _tp);
      let vis = losClear(_e, _tp, level);
      if (!vis) { _tp.y = o.pos.y + 0.9; vis = losClear(_e, _tp, level); }
      if (vis) { best = o; bd = d; }
    }
    if (best) { this.vis = best; this.visT += dtp; }
    else { this.vis = null; this.visT = 0; }
  }

  // ---------- chalna ----------
  walk(dt) {
    if (this.pi >= this.path.length) {
      this.wait -= dt;
      if (this.wait > 0) return;
      if (!this.pickTarget()) { this.wait = 0.4; return; }
    }
    const r = this.followPath(CS.SPEED * (this.dashT > 0 ? CS.DASH : 1), dt);
    if (r !== 'moving') { this.path = []; this.wait = rnd(0.1, 0.4); }
  }

  pickTarget() {
    const lv = levelOf(this.feetY), p = this.f.pos;
    const hum = this.closest(40);
    let best = null, bs = -Infinity;
    for (let k = 0; k < 14; k++) {
      const n = nav.nodes[(Math.random() * nav.nodes.length) | 0];
      if (!n || n.stair || !n.links.length || n.level !== lv || nav.occ.has(n.i)) continue;
      const d = Math.hypot(n.x - p.x, n.z - p.z);
      if (d < 3 || d > 16) continue;
      let ok = true, minMate = 99;
      for (const m of this.mates) {
        if (m === this || !m.f.alive) continue;
        const dm = Math.hypot(n.x - m.f.pos.x, n.z - m.f.pos.z);
        if (dm < CS.MATE_GAP) { ok = false; break; }
        minMate = Math.min(minMate, dm);
      }
      if (!ok) continue;
      let s = Math.min(minMate, 8) + Math.random() * 3;
      if (hum) {
        const dh = Math.hypot(n.x - hum.pos.x, n.z - hum.pos.z);
        if (dh < 5) continue;                    // player ke upar nahi chadhna
        s -= Math.abs(dh - 10) * 0.3;            // player ke aas-paas rehna
      }
      if (s > bs) { bs = s; best = n; }
    }
    if (!best || !this.pathTo(best)) return false;
    this.release();
    this.node = best;
    nav.occ.add(best.i);
    return true;
  }

  // doosre creature se door rehna
  separate() {
    const p = this.f.pos;
    let sx = 0, sz = 0;
    for (const m of this.mates) {
      if (m === this || !m.f.alive) continue;
      const dx = p.x - m.f.pos.x, dz = p.z - m.f.pos.z, d = Math.hypot(dx, dz);
      if (d < CS.SEP && d > 0.01 && Math.abs(p.y - m.f.pos.y) < 2) {
        const k = (CS.SEP - d) / CS.SEP;
        sx += (dx / d) * k; sz += (dz / d) * k;
      }
    }
    if (sx || sz) { this.des.x += sx * 3; this.des.y += sz * 3; }
  }

  // player dikhe to uski taraf munh, warna chalne ki taraf
  look(dt) {
    const t = this.vis;
    if (t) {
      const dx = t.pos.x - this.f.pos.x, dz = t.pos.z - this.f.pos.z;
      this.faceYaw(Math.atan2(-dx, -dz), dt, 9);
    } else this.faceMove(dt);
  }

  tryThrow() {
    const t = this.vis;
    if (!t || !this.fw || this.fireCool > 0 || this.visT < this.react * 0.5) return;
    const want = Math.atan2(-(t.pos.x - this.f.pos.x), -(t.pos.z - this.f.pos.z));
    if (Math.abs(wrap(want - this.yaw)) > 0.6) return;
    if (this.fw.throwAt(this.f, t, this.fwType)) {
      this.model.kick();
      this.fireCool = rnd(2.4, 4.0);
    } else this.fireCool = 0.6;          // abhi gap/limit: thodi der baad
  }
}