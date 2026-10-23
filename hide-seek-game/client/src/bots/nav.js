import * as THREE from 'three';
import { FLOOR_Y, STAIRS as S } from '../world/dims.js';
import { blockedAt, rayDistance, losClear, levelOf } from '../world/collision.js';
import { tableSpots } from '../world/props/table.js';

export const nodes = [];
export const occ = new Set();
export const coverNodes = [];
let hideNodes = [];

const GRID = 2, NODE_R = 0.5, LINK_R = 0.42, LINK_MAX2 = 9.2;
const EXTRA = [[9, -11], [11, -11], [13, -11]];   // corner room ke darwaaze ke paas

const onStairs = (x, z) =>
  x > S.x0 - 0.2 && x < S.x1 + 0.2 && z > S.z0 - 0.2 && z < S.z1 + 0.05;

function add(x, y, z, level, stair = false) {
  const n = { i: nodes.length, x, y, z, level, stair, links: [], enc: 0 };
  nodes.push(n);
  return n;
}

function link(a, b) {
  if (a.links.includes(b.i)) return;
  a.links.push(b.i);
  b.links.push(a.i);
}

function clear(a, b, y) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const steps = Math.ceil(Math.hypot(dx, dz) / 0.5);
  for (let k = 1; k < steps; k++) {
    const t = k / steps;
    if (blockedAt(a.x + dx * t, a.z + dz * t, y, 1.4, LINK_R)) return false;
  }
  return true;
}

function linkStair(sn, level) {
  const c = nodes
    .filter((n) => !n.stair && n.level === level && Math.hypot(n.x - sn.x, n.z - sn.z) < 6)
    .sort((a, b) => Math.hypot(a.x - sn.x, a.z - sn.z) - Math.hypot(b.x - sn.x, b.z - sn.z));
  let k = 0;
  for (const n of c) {
    if (clear(sn, n, n.y)) { link(sn, n); if (++k >= 2) break; }
  }
  if (!k && c[0]) link(sn, c[0]);
}

export function buildNav() {
  nodes.length = 0;
  coverNodes.length = 0;
  occ.clear();

  for (let level = 0; level < 2; level++) {
    const y = level ? FLOOR_Y : 0;
    for (let x = -19; x <= 19; x += GRID) {
      for (let z = -14; z <= 14; z += GRID) {
        if (onStairs(x, z)) continue;
        if (blockedAt(x, z, y, 1.4, NODE_R)) continue;
        add(x, y, z, level);
      }
    }
  }
  EXTRA.forEach(([x, z]) => { if (!blockedAt(x, z, 0, 1.4, 0.4)) add(x, 0, z, 0); });

  const grid = nodes.slice();
  for (let i = 0; i < grid.length; i++) {
    for (let j = i + 1; j < grid.length; j++) {
      const a = grid[i], b = grid[j];
      if (a.level !== b.level) continue;
      const dx = a.x - b.x, dz = a.z - b.z;
      if (dx * dx + dz * dz > LINK_MAX2) continue;
      if (clear(a, b, a.y)) link(a, b);
    }
  }

  // har table ke peeche ek chhupne ka node
  for (const s of tableSpots) {
    const level = s.y > FLOOR_Y / 2 ? 1 : 0;
    if (blockedAt(s.x, s.z, s.y, 1.4, 0.32)) continue;
    const n = add(s.x, s.y, s.z, level);
    n.face = s.yaw;
    const near = grid
      .filter((g) => g.level === level && (g.x - n.x) ** 2 + (g.z - n.z) ** 2 < 12)
      .sort((a, b) => (a.x - n.x) ** 2 + (a.z - n.z) ** 2 - ((b.x - n.x) ** 2 + (b.z - n.z) ** 2));
    let k = 0;
    for (const g of near) { if (clear(n, g, n.y)) { link(n, g); if (++k >= 3) break; } }
    coverNodes.push(n);
  }

  // seedhi ke node (har 2 step pe)
  const cz = (S.z0 + S.z1) / 2;
  let prev = null, first = null;
  for (let i = 1; i < S.steps; i += 2) {
    const x = S.x0 + S.run * (i + 0.5);
    const y = Math.min((i + 1) * S.rise, FLOOR_Y);
    const n = add(x, y, cz, y > FLOOR_Y / 2 ? 1 : 0, true);
    if (prev) link(prev, n); else first = n;
    prev = n;
  }
  linkStair(first, 0);
  linkStair(prev, 1);

  // chhupne ke liye achhi jagah: jiske aas-paas deewar/prop ho
  for (const n of grid) {
    let c = 0;
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4;
      if (blockedAt(n.x + Math.cos(a) * 1.1, n.z + Math.sin(a) * 1.1, n.y, 1.4, 0.2)) c++;
    }
    n.enc = c;
  }
  hideNodes = coverNodes.filter((n) => n.links.length > 0);
  if (hideNodes.length < 8) {
    hideNodes = grid.filter((n) => n.enc >= 3 && n.links.length > 0);
    if (hideNodes.length < 8) hideNodes = grid.filter((n) => n.links.length > 0);
  }
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const randomHide = () => pick(hideNodes);
export const randomNode = () => {
  for (let k = 0; k < 20; k++) {
    const n = pick(nodes);
    if (!n.stair && n.links.length) return n;
  }
  return pick(hideNodes);
};

export function nodeNear(x, y, z, radius) {
  for (let k = 0; k < 40; k++) {
    const n = pick(nodes);
    if (n.stair || Math.abs(n.y - y) > 2.5) continue;
    if (Math.hypot(n.x - x, n.z - z) < radius && n.links.length) return n;
  }
  return randomNode();
}

export function nearest(x, y, z) {
  let best = null, bd = Infinity;
  for (const n of nodes) {
    const dy = Math.abs(n.y - y);
    if (dy > 2.2) continue;
    const d = (n.x - x) ** 2 + (n.z - z) ** 2 + dy * dy * 4;
    if (d < bd) { bd = d; best = n; }
  }
  return best;
}

// A* (start se goal tak saare node index, start bhi shamil)
export function findPath(si, gi) {
  if (si === gi) return [si];
  const N = nodes.length;
  const g = new Float32Array(N).fill(Infinity);
  const f = new Float32Array(N).fill(Infinity);
  const came = new Int16Array(N).fill(-1);
  const closed = new Uint8Array(N);
  const goal = nodes[gi];
  const h = (i) => Math.hypot(nodes[i].x - goal.x, nodes[i].z - goal.z) + Math.abs(nodes[i].y - goal.y);
  const open = [si];
  g[si] = 0; f[si] = h(si);

  while (open.length) {
    let bi = 0;
    for (let k = 1; k < open.length; k++) if (f[open[k]] < f[open[bi]]) bi = k;
    const cur = open[bi];
    open[bi] = open[open.length - 1];
    open.pop();
    if (cur === gi) {
      const path = [cur];
      let c = cur;
      while (came[c] !== -1) { c = came[c]; path.push(c); }
      return path.reverse();
    }
    closed[cur] = 1;
    const a = nodes[cur];
    for (const nb of a.links) {
      if (closed[nb]) continue;
      const b = nodes[nb];
      const ng = g[cur] + Math.hypot(a.x - b.x, a.z - b.z, a.y - b.y);
      if (ng < g[nb]) {
        came[nb] = cur; g[nb] = ng; f[nb] = ng + h(nb);
        if (!open.includes(nb)) open.push(nb);
      }
    }
  }
  return null;
}

// khade hone ki sabse khuli disha (yaw)
export function openDirection(x, y, z) {
  const o = new THREE.Vector3(x, y + 1.0, z), d = new THREE.Vector3();
  const lvl = levelOf(y);
  const res = [];
  for (let k = 0; k < 8; k++) {
    const yaw = (k * Math.PI) / 4;
    d.set(-Math.sin(yaw), 0, -Math.cos(yaw));
    res.push([rayDistance(o, d, 20, lvl), yaw]);
  }
  res.sort((a, b) => b[0] - a[0]);
  return res[Math.random() < 0.7 ? 0 : 1][1];
}

// aisa node jahan se threat ko crouch me dikhai na de (table/almari/deewar ki aad)
const _e = new THREE.Vector3(), _h = new THREE.Vector3();
export function findCover(pos, threat, maxDist = 12) {
  const level = levelOf(pos.y);
  _e.set(threat.x, threat.y + 1.3, threat.z);
  let best = null, bs = Infinity;
  for (const n of nodes) {
    if (n.stair || n.level !== level) continue;
    const d = Math.hypot(n.x - pos.x, n.z - pos.z);
    if (d < 0.8 || d > maxDist) continue;
    if (Math.hypot(n.x - threat.x, n.z - threat.z) < 3) continue;
    _h.set(n.x, n.y + 0.8, n.z);
    if (losClear(_e, _h, level)) continue;
    const s = d + Math.random() * 3;
    if (s < bs) { bs = s; best = n; }
  }
  return best;
}

export const getHideNodes = () => hideNodes;

// bhaagne ke liye: aisi table jahan se threat ko dikhe nahi, door ho, aur threat ki taraf na ho
const _te = new THREE.Vector3(), _tn = new THREE.Vector3();
export function findTableCover(pos, threat, skip) {
  const level = levelOf(pos.y);
  _te.set(threat.x, threat.y + 1.3, threat.z);
  const tl = Math.hypot(threat.x - pos.x, threat.z - pos.z) || 1;
  let best = null, bs = Infinity;
  for (const n of coverNodes) {
    if (n === skip || occ.has(n.i) || !n.links.length || n.level !== level) continue;
    const d = Math.hypot(n.x - pos.x, n.z - pos.z);
    if (d < 3 || d > 24) continue;
    if (Math.hypot(n.x - threat.x, n.z - threat.z) < 6) continue;
    _tn.set(n.x, n.y + 0.8, n.z);
    if (losClear(_te, _tn, level)) continue;
    const toward = ((n.x - pos.x) * (threat.x - pos.x) + (n.z - pos.z) * (threat.z - pos.z)) / (d * tl);
    const s = d + Math.random() * 4 + (toward > 0.3 ? 15 : 0);
    if (s < bs) { bs = s; best = n; }
  }
  return best;
}