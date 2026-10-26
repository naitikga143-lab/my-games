import { parentPort, workerData } from 'node:worker_threads';
import * as THREE from 'three';
import { buildHall } from '../world/hall.js';
import { buildRooms } from '../world/rooms.js';
import { buildStairs, groundY } from '../world/stairs.js';
import { placeProps } from '../world/props/layout.js';
import { blockedAt } from '../world/collision.js';
import { FLOOR_Y } from '../world/dims.js';
import { fighters, createFighter, revive, shoot, on } from '../game/fighters.js';
import { WEAPONS, SCOPES } from '../game/weapondata.js';
import { SHOPS, SHOP_RADIUS } from '../game/shopdata.js';
import { createDirector } from './director.js';
import { createFireworks } from './fireworks.js';

const { room, total, active, respawn, respawnMs, grace = 5, roundSec = 300 } = workerData;
const post = (t, d) => parentPort.postMessage({ t, d });
const r2 = (v) => Math.round(v * 100) / 100;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const fin = (v, d = 0) => (Number.isFinite(+v) ? +v : d);

// map sirf collision ke liye (graphics nahi)
const scene = new THREE.Scene();
buildHall(scene);
buildRooms(scene);
buildStairs(scene);
placeProps(scene);

const humans = new Map();   // pid -> H
const byF = new Map();      // fighter -> H
const left = [];            // jo player beech me chhod gaye unka score

const fw = createFireworks({
  humans: () => [...humans.values()].filter((h) => h.f.alive && !h.f.hidden).map((h) => h.f),
  applyFx: (f, fx) => { const h = byF.get(f); if (h) post('fx', { pid: h.pid, ...fx }); },
});
const director = createDirector(scene, total, { grace, active, room, fw });

const SPAWNS = [[0, 12], [-9, 11], [9, 11], [-15, 10]];
const MAX_SPEED = 9;
const _o = new THREE.Vector3(), _d = new THREE.Vector3(), _t = new THREE.Vector3();
let startAt = 0, ended = false;

on('fw', (e) => post('fw', e));

function sendMe(h) {
  const f = h.f;
  post('me', {
    pid: h.pid, kills: f.kills, hs: f.headshots, pts: f.points, coins: f.coins,
    owned: h.owned, scopes: h.scopes, hp: Math.round(f.hp), alive: f.alive, rs: respawn,
  });
}

function spawn(h) {
  const y = director.level() ? FLOOR_Y : 0;
  let x = 0, z = 12;
  for (let k = 0; k < 10; k++) {
    const s = SPAWNS[(h.team - 1 + k) % 4];
    x = s[0] + (Math.random() - 0.5) * 2;
    z = s[1] + (Math.random() - 0.5) * 2;
    if (!blockedAt(x, z, y, 1.4, 0.45)) break;
  }
  revive(h.f, x, y, z);
  h.last = performance.now();
  h.deadT = 0;
  post('respawn', { pid: h.pid, x, y, z });
  sendMe(h);
}

function join(m) {
  if (humans.has(m.pid)) return;
  if (!startAt) startAt = performance.now() + grace * 1000;
  const f = createFighter({ id: m.pid, name: m.name });
  f.team = m.team;
  f.human = true;
  const h = {
    pid: m.pid, f, team: m.team, owned: [true, false, false, false], scopes: [true, false, false, false],
    shotAt: 0, deadT: 0, last: performance.now(), view: { yw: 0, p: 0, l: 0, r: 0, w: 0 },
  };
  humans.set(m.pid, h);
  byF.set(f, h);
  spawn(h);
}

const scoreOf = (h) => ({ pid: h.pid, name: h.f.name, team: h.team, kills: h.f.kills, hs: h.f.headshots, room });

function leave(m) {
  const h = humans.get(m.pid);
  if (!h) return;
  left.push(scoreOf(h));
  const i = fighters.indexOf(h.f);
  if (i >= 0) fighters.splice(i, 1);
  byF.delete(h.f);
  humans.delete(m.pid);
}

function endRound(reason) {
  if (ended) return;
  ended = true;
  fw.clear();
  post('end', { reason, scores: [...left, ...[...humans.values()].map(scoreOf)] });
}

// ---- movement check ----
function onState(m) {
  const h = humans.get(m.pid);
  if (!h || !h.f.alive) return;
  const f = h.f, now = performance.now();
  const dt = clamp((now - h.last) / 1000, 0.02, 1.5);
  const x = clamp(fin(m.x), -20.5, 20.5);
  const z = clamp(fin(m.z), -15.5, 15.5);
  const y = clamp(fin(m.y), 0, FLOOR_Y + 0.3);
  const far = Math.hypot(x - f.pos.x, z - f.pos.z) > MAX_SPEED * dt + 0.8;
  const bad = far || blockedAt(x, z, y, 1.4, 0.1) || Math.abs(y - groundY(x, z, y)) > 1.8;
  h.last = now;
  if (bad) {
    post('corr', { pid: h.pid, x: f.pos.x, y: f.pos.y, z: f.pos.z });
    return;
  }
  f.pos.set(x, y, z);
  f.crouch = !!m.c;
  f.yaw = fin(m.yaw);
  const wi = fin(m.w) | 0;
  h.view = { yw: r2(fin(m.yaw)), p: r2(fin(m.pitch)), l: r2(clamp(fin(m.l), -1, 1)), r: m.r ? 1 : 0, w: h.owned[wi] ? wi : 0 };
}

// ---- shooting check ----
function onShoot(m) {
  const h = humans.get(m.pid);
  if (ended || !h || !h.f.alive || h.f.hidden) return;
  const i = fin(m.w) | 0, w = WEAPONS[i];
  if (!w || !h.owned[i]) return;
  const now = performance.now();
  if (now - h.shotAt < w.delay * 750) return;
  h.shotAt = now;
  if (!Array.isArray(m.o) || !Array.isArray(m.d)) return;
  _o.set(fin(m.o[0]), fin(m.o[1]), fin(m.o[2]));
  _d.set(fin(m.d[0]), fin(m.d[1]), fin(m.d[2]));
  const len = _d.length();
  if (len < 0.5 || len > 1.5) return;
  _d.divideScalar(len);
  const f = h.f;
  if (_o.distanceTo(_t.set(f.pos.x, f.pos.y + 1.3, f.pos.z)) > 3.3) _o.set(f.pos.x, f.pos.y + 1.3, f.pos.z);
  shoot(f, _o, _d, w);
}

// ---- shop ----
const nearShop = (f) => SHOPS.some((s) => Math.abs(f.pos.y - s.y) < 2 && Math.hypot(f.pos.x - s.x, f.pos.z - s.z) < SHOP_RADIUS + 0.6);

function onBuy(m) {
  const h = humans.get(m.pid);
  if (!h || !h.f.alive) return;
  const i = fin(m.i) | 0, w = WEAPONS[i], f = h.f;
  if (!w) return;
  if (!h.owned[i]) {
    if (!nearShop(f)) return post('msg', { pid: h.pid, text: 'Shop ke paas jao' });
    if (f.coins < w.price) return post('msg', { pid: h.pid, text: `${w.name} ke liye ${w.price} coins chahiye` });
    f.coins -= w.price;
    h.owned[i] = true;
    post('msg', { pid: h.pid, text: `${w.name} khareed li!` });
  }
  sendMe(h);
}

function onBuyScope(m) {
  const h = humans.get(m.pid);
  if (!h || !h.f.alive) return;
  const i = fin(m.i) | 0, sc = SCOPES[i], f = h.f;
  if (!sc) return;
  if (!h.scopes[i]) {
    if (!nearShop(f)) return post('msg', { pid: h.pid, text: 'Shop ke paas jao' });
    if (f.coins < sc.price) return post('msg', { pid: h.pid, text: `${sc.name} ke liye ${sc.price} coins chahiye` });
    f.coins -= sc.price;
    h.scopes[i] = true;
    post('msg', { pid: h.pid, text: `${sc.name} scope khareed liya!` });
  }
  sendMe(h);
}

// ---- events -> clients ----
let fresh = false;
on('shot', () => { fresh = true; });
on('tracer', (s, a, b, hit, head, w) => {
  post('tr', {
    s: s.id, a: [r2(a.x), r2(a.y), r2(a.z)], b: [r2(b.x), r2(b.y), r2(b.z)],
    h: hit ? (head ? 2 : 1) : 0, w: Math.max(0, WEAPONS.indexOf(w)), f: fresh ? 1 : 0,
  });
  fresh = false;
});
on('kill', (v, a, head) => {
  const ah = a && byF.get(a);
  post('kill', { victim: v.id, killer: a ? a.id : null, kn: a ? a.name : '', vn: v.name, head: !!head, vpid: null });
  if (ah) sendMe(ah);
});

// ---- snapshot ----
function snap() {
  const l = [], now = performance.now();
  for (const h of humans.values()) {
    const f = h.f, v = h.view;
    l.push({ i: h.pid, n: f.name, t: h.team, x: r2(f.pos.x), y: r2(f.pos.y), z: r2(f.pos.z),
      yw: v.yw, p: v.p, l: v.l, c: f.crouch ? 1 : 0, r: v.r, w: v.w, a: f.alive ? 1 : 0, hp: Math.round(f.hp),
      h: f.hidden ? 1 : 0, gl: Math.ceil(Math.max(0, (startAt - now) / 1000)) });
  }
  for (const b of director.bots()) {
    const f = b.f;
    l.push({ i: f.id, n: f.name, t: 0, b: 1, dz: room, x: r2(f.pos.x), y: r2(f.pos.y), z: r2(f.pos.z),
      yw: r2(b.yaw), p: r2(b.pitch), l: 0, c: f.crouch ? 1 : 0, r: b.running ? 1 : 0, w: 3,
      a: f.alive ? 1 : 0, hp: Math.round(f.hp), h: f.hidden ? 1 : 0 });
  }
  const tl = startAt ? Math.max(0, Math.ceil((startAt + roundSec * 1000 - now) / 1000)) : roundSec;
  post('snap', { l, bl: director.left(), tl: Math.min(tl, roundSec) });
}

let last = performance.now(), snapAcc = 0;
function tick() {
  const now = performance.now();
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  if (!ended) {
    for (const h of humans.values()) {
      h.f.hidden = now < startAt;                       // shuru ke second: GET READY
      if (respawn && !h.f.alive) {
        h.deadT += dt;
        if (h.deadT * 1000 > respawnMs) spawn(h);
      }
    }
    if (humans.size) { director.update(dt); fw.update(dt); }
    if (startAt && now >= startAt + roundSec * 1000) endRound('time');
    else if (humans.size && director.left() === 0) endRound('clear');
  }
  snapAcc += dt;
  if (snapAcc >= 0.08) { snapAcc = 0; snap(); }
}
setInterval(() => {
  try { tick(); } catch (e) { console.error('[sim tick]', e && e.stack ? e.stack : e); }
}, 33);

parentPort.on('message', (m) => {
  try {
    switch (m.t) {
      case 'join': join(m); break;
      case 'leave': leave(m); break;
      case 'state': onState(m); break;
      case 'shoot': onShoot(m); break;
      case 'buy': onBuy(m); break;
      case 'buyscope': onBuyScope(m); break;
      default: break;
    }
  } catch (e) { console.error('[sim msg]', e && e.stack ? e.stack : e); }
});