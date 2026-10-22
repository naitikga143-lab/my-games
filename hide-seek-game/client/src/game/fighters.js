import * as THREE from 'three';
import { rayDistance, levelOf } from '../world/collision.js';
import { HEAD_Y } from '../player/model.js';
import { tracer } from './tracers.js';

export const fighters = [];
const handlers = {};
export const on = (ev, fn) => (handlers[ev] = handlers[ev] || []).push(fn);
export const emit = (ev, ...a) => (handlers[ev] || []).forEach((fn) => fn(...a));

export function createFighter({ id, name, isPlayer = false }) {
  const f = {
    id, name, isPlayer, remote: false, human: false, team: 0,
    pos: new THREE.Vector3(), crouch: false,
    hp: 100, alive: true,
    kills: 0, headshots: 0, points: 0, coins: 0, deaths: 0,
  };
  fighters.push(f);
  return f;
}

export const aliveCount = () => fighters.filter((f) => f.alive).length;

export function revive(f, x, y, z) {
  f.pos.set(x, y, z);
  f.hp = 100;
  f.alive = true;
  f.crouch = false;
  emit('spawn', f);
}

export const headCenter = (f, out) =>
  out.set(f.pos.x, f.pos.y + (f.crouch ? HEAD_Y.crouch : HEAD_Y.stand), f.pos.z);

export function applyDamage(victim, attacker, dmg, head) {
  if (!victim.alive) return;
  victim.hp = Math.max(0, victim.hp - dmg);
  emit('damage', victim, attacker, dmg, head);
  if (victim.hp <= 0) {
    victim.alive = false;
    victim.deaths++;
    if (attacker && attacker !== victim) {
      attacker.kills++;
      attacker.points += head ? 150 : 100;
      attacker.coins += head ? 100 : 60;      // gun kharidne ke coins
      if (head) attacker.headshots++;
    }
    emit('kill', victim, attacker, head);
  }
}

// ---------- hitscan ----------
const R_BODY = 0.28, R_HEAD = 0.17;
const _hc = new THREE.Vector3(), _oc = new THREE.Vector3();
const _end = new THREE.Vector3(), _ts = new THREE.Vector3(), _pd = new THREE.Vector3();

function raySphere(o, d, c, r) {
  _oc.subVectors(o, c);
  const b = _oc.dot(d), cc = _oc.lengthSq() - r * r, disc = b * b - cc;
  if (disc < 0) return -1;
  const t = -b - Math.sqrt(disc);
  return t >= 0 ? t : -1;
}

function rayBody(o, d, f, top) {
  const ox = o.x - f.pos.x, oz = o.z - f.pos.z;
  const a = d.x * d.x + d.z * d.z;
  if (a < 1e-6) return -1;
  const b = ox * d.x + oz * d.z;
  const cc = ox * ox + oz * oz - R_BODY * R_BODY;
  const disc = b * b - a * cc;
  if (disc < 0) return -1;
  const t = (-b - Math.sqrt(disc)) / a;
  if (t < 0) return -1;
  const y = o.y + d.y * t;
  return y >= f.pos.y + 0.05 && y <= top ? t : -1;
}

function pellet(shooter, origin, dir, w) {
  let bestT = Math.min(w.range, rayDistance(origin, dir, w.range, levelOf(origin.y)));
  let victim = null, head = false;

  for (const f of fighters) {
    if (f === shooter || !f.alive) continue;
    if (shooter.team && f.team === shooter.team) continue;   // teammate ko goli nahi lagti
    headCenter(f, _hc);
    const th = raySphere(origin, dir, _hc, R_HEAD);
    const tb = rayBody(origin, dir, f, _hc.y - 0.12);
    let t = -1, isHead = false;
    if (th >= 0 && (tb < 0 || th <= tb + 0.1)) { t = th; isHead = true; }
    else if (tb >= 0) t = tb;
    if (t >= 0 && t < bestT) { bestT = t; victim = f; head = isHead; }
  }

  _end.copy(dir).multiplyScalar(bestT).add(origin);
  _ts.copy(dir).multiplyScalar(0.6).add(origin);
  _ts.y -= 0.12;
  tracer(_ts, _end);
  emit('tracer', shooter, _ts, _end, !!victim, head, w);
  emit('impact', shooter, _end, victim, head);

  if (victim) {
    if (!victim.remote) applyDamage(victim, shooter, head ? w.head : w.body, head);   // remote ka damage server se aata hai
    emit('hit', shooter, victim, head);
  }
}

export function shoot(shooter, origin, dir, w) {
  emit('shot', shooter, origin, dir, w);
  const n = w.pellets || 1;
  for (let i = 0; i < n; i++) {
    if (n > 1) {
      _pd.set(
        dir.x + (Math.random() - 0.5) * 2 * w.psp,
        dir.y + (Math.random() - 0.5) * 2 * w.psp,
        dir.z + (Math.random() - 0.5) * 2 * w.psp
      ).normalize();
      pellet(shooter, origin, _pd, w);
    } else pellet(shooter, origin, dir, w);
  }
}