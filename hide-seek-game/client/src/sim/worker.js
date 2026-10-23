import { parentPort, workerData } from 'node:worker_threads';
import * as THREE from 'three';
import { buildHall } from '../world/hall.js';
import { buildRooms } from '../world/rooms.js';
import { buildStairs, groundY } from '../world/stairs.js';
import { placeProps } from '../world/props/layout.js';
import { blockedAt } from '../world/collision.js';
import { FLOOR_Y } from '../world/dims.js';
import { fighters, createFighter, revive, shoot, on } from '../game/fighters.js';
import { WEAPONS, BOT_GUN, SCOPES } from '../game/weapondata.js';
import { SHOPS, SHOP_RADIUS } from '../game/shopdata.js';
import { createDirector } from './director.js';

const { total, respawn, respawnMs } = workerData;
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
const director = createDirector(scene, total);

const humans = new Map();   // pid -> H
const byF = new Map();      // fighter -> H
const SPAWNS = [[0, 12], [-9, 11], [9, 11], [-15, 10]];
const MAX_SPEED = 9;        // m/s (run 6.5 + slack)
const _o = new THREE.Vector3(), _d = new THREE.Vector3(), _t = new THREE.Vector3();

function sendMe(h) {
  const f = h.f;
  post('me', {
    pid: h.pid, kills: f.kills, hs: f.headshots, pts: f.points, coins: f.coins,
    owned: h.owned, scopes: h.scopes, hp: Math.round(f.hp), alive: f.alive, rs: respawn,
  });
}

function spawn(h) {
  let x = 0, z = 12;
  for (let k = 0; k < 8; k++) {
    const s = SPAWNS[(h.team - 1 + k) % 4];
    x = s[0] + (Math.random() - 0.5) * 2;
    z = s[1] + (Math.random() - 0.5) * 2;
    if (!blockedAt(x, z, 0, 1.4, 0.45)) break;
  }
  revive(h.f, x, 0, z);
  h.last = performance.now();
  h.deadT = 0;
  post('respawn', { pid: h.pid, x, y: 0, z });
  sendMe(h);
}

function join(m) {
  if (humans.has(m.pid)) return;
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

function leave(m) {
  const h = humans.get(m.pid);
  if (!h) return;
  const i = fighters.indexOf(h.f);
  if (i >= 0) fighters.splice(i, 1);
  byF.delete(h.f);
  humans.delete(m.pid);
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
  const far = Math.hypot(x - f.pos.x, z - f.pos.z) > MAX_SPEED * dt + 0.8;     // teleport/speed hack
  const bad = far || blockedAt(x, z, y, 1.4, 0.1) || Math.abs(y - groundY(x, z, y)) > 1.8;   // wall ke andar / udna
  h.last = now;
  if (bad) {
    post('corr', { pid: h.pid, x: f.pos.x, y: f.pos.y, z: f.pos.z });             // wapas khinch lo
    return;
  }
  f.pos.set(x, y, z);
  f.crouch = !!m.c;
  const wi = fin(m.w) | 0;
  h.view = { yw: r2(fin(m.yaw)), p: r2(fin(m.pitch)), l: r2(clamp(fin(m.l), -1, 1)), r: m.r ? 1 : 0, w: h.owned[wi] ? wi : 0 };
}

// ---- shooting check ----
function onShoot(m) {
  const h = humans.get(m.pid);
  if (!h || !h.f.alive) return;
  const i = fin(m.w) | 0, w = WEAPONS[i];
  if (!w || !h.owned[i]) return;                                  // gun kharidi hi nahi
  const now = performance.now();
  if (now - h.shotAt < w.delay * 750) return;                     // fire-rate hack
  h.shotAt = now;
  if (!Array.isArray(m.o) || !Array.isArray(m.d)) return;
  _o.set(fin(m.o[0]), fin(m.o[1]), fin(m.o[2]));
  _d.set(fin(m.d[0]), fin(m.d[1]), fin(m.d[2]));
  const len = _d.length();
  if (len < 0.5 || len > 1.5) return;
  _d.divideScalar(len);
  const f = h.f;
  if (_o.distanceTo(_t.set(f.pos.x, f.pos.y + 1.3, f.pos.z)) > 3.3) _o.set(f.pos.x, f.pos.y + 1.3, f.pos.z);   // door se goli nahi
  shoot(f, _o, _d, w);
}

// ---- shop ----
function onBuy(m) {
  const h = humans.get(m.pid);
  if (!h || !h.f.alive) return;
  const i = fin(m.i) | 0, w = WEAPONS[i], f = h.f;
  if (!w) return;
  if (!h.owned[i]) {
    const near = SHOPS.some((s) => Math.abs(f.pos.y - s.y) < 2 && Math.hypot(f.pos.x - s.x, f.pos.z - s.z) < SHOP_RADIUS + 0.6);
    if (!near) return post('msg', { pid: h.pid, text: 'Shop ke paas jao' });
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
    const near = SHOPS.some((s) => Math.abs(f.pos.y - s.y) < 2 && Math.hypot(f.pos.x - s.x, f.pos.z - s.z) < SHOP_RADIUS + 0.6);
    if (!near) return post('msg', { pid: h.pid, text: 'Shop ke paas jao' });
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
    h: hit ? (head ? 2 : 1) : 0, w: w === BOT_GUN ? 3 : WEAPONS.indexOf(w), f: fresh ? 1 : 0,
  });
  fresh = false;
});
on('damage', (v, a, dmg, head) => {
  const h = byF.get(v);
  if (h) post('dmg', { pid: h.pid, hp: Math.round(v.hp), from: a ? a.id : null, name: a ? a.name : '', dmg, head: !!head, dead: v.hp <= 0 });
});
on('kill', (v, a, head) => {
  const vh = byF.get(v), ah = a && byF.get(a);
  post('kill', { victim: v.id, killer: a ? a.id : null, kn: a ? a.name : '', vn: v.name, head: !!head, vpid: vh ? v.id : null });
  if (vh) { vh.deadT = 0; sendMe(vh); }
  if (ah) sendMe(ah);
});

// ---- snapshot ----
function snap() {
  const l = [];
  for (const h of humans.values()) {
    const f = h.f, v = h.view;
    l.push({ i: h.pid, n: f.name, t: h.team, x: r2(f.pos.x), y: r2(f.pos.y), z: r2(f.pos.z),
      yw: v.yw, p: v.p, l: v.l, c: f.crouch ? 1 : 0, r: v.r, w: v.w, a: f.alive ? 1 : 0, hp: Math.round(f.hp) });
  }
  for (const b of director.bots()) {
    const f = b.f;
    l.push({ i: f.id, n: f.name, t: 0, b: 1, x: r2(f.pos.x), y: r2(f.pos.y), z: r2(f.pos.z),
      yw: r2(b.yaw), p: r2(b.pitch), l: 0, c: f.crouch ? 1 : 0, r: b.running ? 1 : 0, w: 3, a: f.alive ? 1 : 0, hp: Math.round(f.hp) });
  }
  post('snap', { l, bl: director.left() });
}

let cleared = false;
function checkClear() {
  if (cleared || director.left() > 0 || !humans.size) return;
  const alive = [...humans.values()].filter((h) => h.f.alive);
  if (!alive.length) return;
  if (new Set(alive.map((h) => h.team)).size > 1) return;     // doosri team ka human zinda hai
  cleared = true;
  post('clear', { team: alive[0].team });
}

let last = performance.now(), snapAcc = 0;
setInterval(() => {
  const now = performance.now();
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  if (respawn) {
    for (const h of humans.values()) {
      if (h.f.alive) continue;
      h.deadT += dt;
      if (h.deadT * 1000 > respawnMs) spawn(h);
    }
  }
  director.update(dt);
  snapAcc += dt;
  if (snapAcc >= 0.08) { snapAcc = 0; snap(); }
  checkClear();
}, 33);

parentPort.on('message', (m) => {
  switch (m.t) {
    case 'join': join(m); break;
    case 'leave': leave(m); break;
    case 'state': onState(m); break;
    case 'shoot': onShoot(m); break;
    case 'buy': onBuy(m); break;
    case 'buyscope': onBuyScope(m); break;
    default: break;
  }
});