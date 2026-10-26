import * as THREE from 'three';
import { rayDistance } from '../world/collision.js';
import { emit } from '../game/fighters.js';

const G = 9.8;
const MAX_LIVE = 9, MAX_MINES = 5, GAP = 0.9, CHATAI_LIFE = 14;
const rnd = (a, b) => a + Math.random() * (b - a);
const r2 = (v) => Math.round(v * 100) / 100;

// 0 rocket, 1 anaar bomb, 2 chatai bomb, 3 face bomb, 4 chutt-putt
// sh = shake, sl = slow seconds, sm = dhuaan, fl = flash, kk = view jhatka. HP kisi se nahi ghatta.
const FX = [
  { r: 2.4, sh: 0.9, sl: 1.3, sm: 1.2, fl: 0.0, kk: 0.05 },
  { r: 2.7, sh: 0.5, sl: 1.6, sm: 0.9, fl: 0.0, kk: 0.02 },
  { r: 2.3, sh: 1.0, sl: 1.5, sm: 1.0, fl: 0.2, kk: 0.07 },
  { r: 2.0, sh: 1.1, sl: 1.0, sm: 1.5, fl: 0.28, kk: 0.09 },
  { r: 2.5, sh: 0.25, sl: 0.6, sm: 0.0, fl: 0.0, kk: 0.01 },
];

export function createFireworks({ humans, applyFx }) {
  const P = [];
  let seq = 0, now = 0, nextAt = 0;
  const _n = new THREE.Vector3(), _d = new THREE.Vector3();

  const ev = (o) => emit('fw', o);
  const pack = (p) => ({ id: p.id, ty: p.ty, x: r2(p.pos.x), y: r2(p.pos.y), z: r2(p.pos.z) });

  function hitHumans(c, ty, scale) {
    const f = FX[ty];
    for (const h of humans()) {
      const d = Math.hypot(h.pos.x - c.x, h.pos.y + 1 - c.y, h.pos.z - c.z);
      if (d > f.r) continue;
      const k = (1 - 0.5 * (d / f.r)) * scale;
      applyFx(h, { sh: r2(f.sh * k), sl: r2(f.sl * k), sm: r2(f.sm * k), fl: r2(f.fl * k), kk: r2(f.kk * k) });
    }
  }

  function boom(p, at) {
    p.dead = true;
    ev({ k: 'b', id: p.id, ty: p.ty, x: r2(at.x), y: r2(at.y), z: r2(at.z) });
    hitHumans(at, p.ty, 1);
  }

  function land(p) {
    p.vel.set(0, 0, 0);
    p.t = 0; p.tick = 0;
    if (p.ty === 1) { p.st = 'fuse'; ev({ k: 'l', ...pack(p), dur: 1.2 }); }
    else if (p.ty === 2) { p.st = 'armed'; ev({ k: 'l', ...pack(p), dur: CHATAI_LIFE }); }
    else { p.st = 'pop'; ev({ k: 'l', ...pack(p), dur: 3.2 }); }
  }

  // creature c, target (human) pe type ty ka patakha. false = abhi nahi phenk sakta
  function throwAt(c, target, ty) {
    if (now < nextAt || P.length >= MAX_LIVE) return false;
    if (ty === 2 && P.filter((p) => p.ty === 2).length >= MAX_MINES) return false;
    nextAt = now + GAP;

    const o = new THREE.Vector3(c.pos.x, c.pos.y + (c.crouch ? 0.9 : 1.5), c.pos.z);
    const tp = target.pos;
    const fy = tp.y > 2 ? 4 : 0;
    const p = { id: ++seq, ty, pos: o, vel: new THREE.Vector3(), fy, g: 0, st: 'fly', t: 0, tick: 0, dead: false };

    if (ty === 0 || ty === 3) {
      const aim = new THREE.Vector3(
        tp.x + (ty === 0 ? rnd(-0.4, 0.4) : 0),
        tp.y + (ty === 0 ? 1.0 : target.crouch ? 0.8 : 1.35),
        tp.z + (ty === 0 ? rnd(-0.4, 0.4) : 0));
      p.vel.copy(aim.sub(o).normalize()).multiplyScalar(ty === 0 ? 11 : 14);
    } else {
      const spread = ty === 2 ? 1.0 : 1.6;
      const gx = tp.x + rnd(-spread, spread), gz = tp.z + rnd(-spread, spread);
      const T = Math.min(1.7, Math.max(0.7, Math.hypot(gx - o.x, gz - o.z) / 8));
      p.vel.set((gx - o.x) / T, (fy + 0.05 - o.y) / T + 0.5 * G * T, (gz - o.z) / T);
      p.g = G;
    }
    P.push(p);
    ev({ k: 's', ...pack(p), vx: r2(p.vel.x), vy: r2(p.vel.y), vz: r2(p.vel.z), g: p.g });
    return true;
  }

  function update(dt) {
    now += dt;
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i];
      p.t += dt;

      if (p.t > 12 || !Number.isFinite(p.pos.x + p.pos.y + p.pos.z)) {
        ev({ k: 'x', id: p.id });
        P.splice(i, 1);
        continue;
      }

      if (p.st === 'fly') {
        p.vel.y -= p.g * dt;
        _n.copy(p.pos).addScaledVector(p.vel, dt);
        const len = p.pos.distanceTo(_n);
        let wall = false;
        if (len > 1e-4) {
          _d.subVectors(_n, p.pos).divideScalar(len);
          wall = rayDistance(p.pos, _d, len, p.fy > 2 ? 1 : 0) < len - 1e-3;
        }
        if (p.ty === 0 || p.ty === 3) {
          let near = false;
          for (const h of humans()) {
            if (Math.hypot(_n.x - h.pos.x, _n.y - (h.pos.y + 1), _n.z - h.pos.z) < 0.9) { near = true; break; }
          }
          if (near || wall || p.t > 3.5 || _n.y <= p.fy + 0.03) boom(p, wall ? p.pos : _n);
          else p.pos.copy(_n);
        } else {
          if (wall) { p.vel.x = 0; p.vel.z = 0; p.vel.y = Math.min(p.vel.y, 0); }
          else p.pos.copy(_n);
          if (p.pos.y <= p.fy + 0.05) { p.pos.y = p.fy + 0.03; land(p); }
        }
      } else if (p.st === 'fuse') {
        if (p.t > 1.2) {                       // anaar phat ke fountain ban jaata hai
          p.st = 'burn'; p.t = 0; p.tick = 0;
          ev({ k: 'b', ...pack(p), dur: 2.6 });
          hitHumans(p.pos, 1, 1);
        }
      } else if (p.st === 'burn') {
        p.tick += dt;
        if (p.tick > 0.5) { p.tick = 0; hitHumans(p.pos, 1, 0.45); }
        if (p.t > 2.6) p.dead = true;
      } else if (p.st === 'armed') {            // chatai bomb: pair rakhte hi
        for (const h of humans()) {
          if (Math.hypot(h.pos.x - p.pos.x, h.pos.z - p.pos.z) < 1.0 && Math.abs(h.pos.y - p.pos.y) < 1.2) { boom(p, p.pos); break; }
        }
        if (!p.dead && p.t > CHATAI_LIFE) { p.dead = true; ev({ k: 'x', id: p.id }); }
      } else if (p.st === 'pop') {              // chutt-putt
        p.tick += dt;
        if (p.tick > 0.4) { p.tick = 0; hitHumans(p.pos, 4, 0.6); }
        if (p.t > 3.2) p.dead = true;
      }
      if (p.dead) P.splice(i, 1);
    }
  }

  function clear() {
    for (const p of P) ev({ k: 'x', id: p.id });
    P.length = 0;
  }

  return { throwAt, update, clear };
}