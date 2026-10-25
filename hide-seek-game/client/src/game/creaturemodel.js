import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// 1 Pumpkin Imp, 2 Neel Rakshas, 3 Hara Pishach, 4 Laal Danav
const DESIGNS = [
  { body: 0xff7a1a, belly: 0xffc247, accent: 0x3a8a2a, horn: 0xf5e6c0, eyes: 1, ears: 0, tusk: 0, crown: 0, stem: 1 },
  { body: 0x4a58d8, belly: 0x9fb0ff, accent: 0xffd24a, horn: 0xffd24a, eyes: 2, ears: 0, tusk: 1, crown: 1, stem: 0 },
  { body: 0x4aa84a, belly: 0xb8e08a, accent: 0xaa2a2a, horn: 0x2a3a2a, eyes: 2, ears: 1, tusk: 0, crown: 0, stem: 0 },
  { body: 0xd8332a, belly: 0xff9a7a, accent: 0xffd24a, horn: 0x1a1a1a, eyes: 3, ears: 0, tusk: 1, crown: 1, stem: 0 },
];

const SPH = new THREE.SphereGeometry(1, 12, 10);
const BOX = new THREE.BoxGeometry(1, 1, 1);
const CONE = new THREE.ConeGeometry(1, 1, 8);
const cyl = (rt, rb, h, n = 10) => new THREE.CylinderGeometry(rt, rb, h, n);

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler();
const _pv = new THREE.Vector3(), _sv = new THREE.Vector3();

function P(geo, color, x, y, z, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) {
  const g = geo.clone();
  _q.setFromEuler(_e.set(rx, ry, rz));
  _m.compose(_pv.set(x, y, z), _q, _sv.set(sx, sy, sz));
  g.applyMatrix4(_m);
  const c = new THREE.Color(color), n = g.attributes.position.count, arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return g;
}

const mat = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0x2a1408 });
const cache = [];

function build(d) {
  const W = 0xffffff, K = 0x111111;
  const body = [
    P(SPH, d.body, 0, 0.7, 0, 0.34, 0.42, 0.3),
    P(SPH, d.belly, 0, 0.64, 0.2, 0.22, 0.27, 0.12),
    P(cyl(0.3, 0.3, 0.06), d.accent, 0, 0.46, 0, 1, 1, 0.9),
    P(SPH, d.body, 0, 1.28, 0, 0.3, 0.27, 0.27),
    P(SPH, 0x2a0a0a, 0, 1.17, 0.24, 0.14, 0.05, 0.05),
    P(BOX, W, -0.05, 1.2, 0.27, 0.04, 0.05, 0.02),
    P(BOX, W, 0.05, 1.2, 0.27, 0.04, 0.05, 0.02),
    P(CONE, d.body, 0, 0.4, -0.3, 0.07, 0.28, 0.07, -1.3, 0, 0),
  ];
  const eye = (x, y, s) => body.push(
    P(SPH, W, x, y, 0.22, s, s, s * 0.7),
    P(SPH, K, x, y, 0.22 + s * 0.55, s * 0.5, s * 0.5, s * 0.4));
  if (d.eyes === 1) eye(0, 1.34, 0.11);
  else { eye(-0.1, 1.34, 0.075); eye(0.1, 1.34, 0.075); if (d.eyes === 3) eye(0, 1.47, 0.05); }

  if (d.crown) {
    body.push(P(cyl(0.14, 0.17, 0.1), d.accent, 0, 1.55, 0));
    for (const x of [-0.1, 0, 0.1]) body.push(P(CONE, d.accent, x, 1.64, 0, 0.035, 0.1, 0.035));
  } else {
    for (const s of [-1, 1]) body.push(P(CONE, d.horn, s * 0.16, 1.5, 0, 0.06, 0.2, 0.06, 0, 0, -s * 0.4));
  }
  if (d.stem) body.push(P(cyl(0.04, 0.05, 0.12, 6), 0x3a8a2a, 0, 1.58, 0));
  if (d.ears) for (const s of [-1, 1]) body.push(P(CONE, d.body, s * 0.3, 1.32, 0, 0.07, 0.22, 0.04, 0, 0, -s * 1.25));
  if (d.tusk) for (const s of [-1, 1]) body.push(P(CONE, W, s * 0.09, 1.17, 0.25, 0.025, 0.08, 0.025));

  return {
    body: mergeGeometries(body),
    arm: mergeGeometries([
      P(SPH, d.body, 0, 0, 0, 0.075, 0.075, 0.075),
      P(cyl(0.065, 0.055, 0.4), d.body, 0, -0.2, 0),
      P(SPH, d.belly, 0, -0.43, 0, 0.09, 0.09, 0.09),
    ]),
    leg: mergeGeometries([
      P(cyl(0.095, 0.085, 0.3), d.body, 0, -0.15, 0),
      P(SPH, d.accent, 0, -0.3, 0.05, 0.12, 0.06, 0.16),
    ]),
  };
}

export function createCreatureModel(room = 1) {
  const idx = (room - 1) % 4;
  const g = cache[idx] || (cache[idx] = build(DESIGNS[idx]));

  const group = new THREE.Group();
  group.rotation.order = 'YXZ';
  const root = new THREE.Group();
  group.add(root);
  root.add(new THREE.Mesh(g.body, mat));
  const mk = (geo, x, y, z) => {
    const pv = new THREE.Group();
    pv.position.set(x, y, z);
    pv.add(new THREE.Mesh(geo, mat));
    root.add(pv);
    return pv;
  };
  const armL = mk(g.arm, 0.36, 0.95, 0), armR = mk(g.arm, -0.36, 0.95, 0);
  const legL = mk(g.leg, 0.14, 0.38, 0), legR = mk(g.leg, -0.14, 0.38, 0);

  let t = 0, phase = 0, amp = 0, crouchK = 0, thr = 0;

  return {
    group,
    update(dt, s) {
      t += dt;
      phase += dt * s.speed * 10;
      amp += (Math.min(s.speed, 1.6) * 0.7 - amp) * Math.min(1, dt * 10);
      crouchK += ((s.crouch ? 1 : 0) - crouchK) * Math.min(1, dt * 9);
      thr = Math.max(0, thr - dt * 2.2);
      const sw = Math.sin(phase) * amp;
      legL.rotation.x = sw; legR.rotation.x = -sw;
      armL.rotation.x = -sw * 0.8 + Math.sin(t * 2) * 0.05;
      armR.rotation.x = thr > 0 ? -2.9 * Math.min(1, thr * 2.2) : sw * 0.8;
      root.scale.set(1 + 0.1 * crouchK, 1 - 0.38 * crouchK, 1 + 0.1 * crouchK);
      root.position.y = Math.abs(Math.sin(phase)) * 0.04 * amp + Math.sin(t * 3) * 0.01;
    },
    setWeapon() {},
    kick() { thr = 1; },
    setDead(k) { group.rotation.x = -1.5 * k; },
  };
}