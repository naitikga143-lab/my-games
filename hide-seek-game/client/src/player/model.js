import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const ROOT_SCALE = 0.86;
export const HEAD_Y = { stand: 1.31, crouch: 0.83 };   // hit-test ke liye
export const MUZZLE = [0.25, 0.36];

const C = {
  hood: 0x2b2a31, hoodDark: 0x1a191e, pants: 0x2c2720, cap: 0x101012,
  glove: 0x0e0e10, shoe: 0x1d1d22, sole: 0xdedbd2, cord: 0xb9b6ae,
  gun: 0x15151a, gunLight: 0x34373f, void: 0x040404, eye: 0xffffff,
};

const bodyMat = new THREE.MeshLambertMaterial({ vertexColors: true });
const eyeMat = new THREE.MeshBasicMaterial({ vertexColors: true });
const flashMat = new THREE.MeshBasicMaterial({ color: 0xffd27a });

const SPH = new THREE.SphereGeometry(1, 10, 8);
const BOX = new THREE.BoxGeometry(1, 1, 1);
const CONE = new THREE.ConeGeometry(1, 1, 8);
const TORUS = new THREE.TorusGeometry(1, 0.25, 6, 14);
const cyl = (rt, rb, h, n = 8) => new THREE.CylinderGeometry(rt, rb, h, n);

// ---------- geometry ko rang ke saath bake karna (har limb = 1 mesh, mobile pe halka) ----------
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler();
const _pv = new THREE.Vector3(), _sv = new THREE.Vector3();

function p(geo, color, x, y, z, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) {
  const g = geo.clone();
  _q.setFromEuler(_e.set(rx, ry, rz));
  _m.compose(_pv.set(x, y, z), _q, _sv.set(sx, sy, sz));
  g.applyMatrix4(_m);
  const c = new THREE.Color(color);
  const n = g.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return g;
}
const bake = (list) => mergeGeometries(list);

let G = null;
function parts() {
  if (G) return G;
  const thigh = (side) => bake([
    p(cyl(0.078, 0.062, 0.36), C.pants, 0, -0.18, 0),
    p(BOX, C.pants, side * 0.082, -0.15, 0.015, 0.035, 0.12, 0.1),   // cargo pocket
  ]);
  G = {
    thighL: thigh(1),
    thighR: thigh(-1),
    shin: bake([
      p(cyl(0.058, 0.07, 0.36), C.pants, 0, -0.18, 0),
      p(SPH, C.shoe, 0, -0.318, 0.04, 0.068, 0.05, 0.13),
      p(BOX, C.sole, 0, -0.352, 0.045, 0.13, 0.03, 0.27),            // safed sole
    ]),
    torso: bake([
      p(cyl(0.21, 0.16, 1, 10), C.hood, 0, 0.28, 0, 1, 0.56, 0.62),
      p(SPH, C.pants, 0, 0, 0, 0.17, 0.1, 0.12),
      p(cyl(0.165, 0.165, 0.05, 10), C.hoodDark, 0, 0.03, 0, 1, 1, 0.66),   // hoodie hem
      p(BOX, C.hoodDark, 0, 0.13, 0.118, 0.23, 0.1, 0.05),                  // pocket
      p(cyl(0.007, 0.007, 0.15, 5), C.cord, -0.05, 0.42, 0.125),
      p(cyl(0.007, 0.007, 0.15, 5), C.cord, 0.05, 0.42, 0.125),
      p(SPH, C.hoodDark, 0, 0.55, -0.085, 0.16, 0.1, 0.09),                 // hood back drape
    ]),
    upperArm: bake([
      p(SPH, C.hood, 0, 0, 0, 0.068, 0.068, 0.068),
      p(cyl(0.058, 0.052, 0.28), C.hood, 0, -0.14, 0),
    ]),
    foreArm: bake([
      p(cyl(0.052, 0.047, 0.24), C.hood, 0, -0.12, 0),
      p(cyl(0.05, 0.05, 0.035), C.hoodDark, 0, -0.235, 0),                  // cuff
      p(cyl(0.04, 0.04, 0.09), C.glove, 0, -0.285, 0),                      // hand (cylinder)
    ]),
    head: bake([
      p(cyl(0.1, 0.17, 0.11, 10), C.hoodDark, 0, 0.03, -0.02, 1, 1, 0.95),  // hood cowl (kandhe pe)
      p(SPH, C.hood, 0, 0.16, -0.015, 0.185, 0.2, 0.2),                     // hood shell
      p(CONE, C.hood, 0, 0.32, -0.1, 0.11, 0.2, 0.11, -0.55, 0, 0),         // peeche latakta hood peak
      p(TORUS, C.hoodDark, 0, 0.145, 0.16, 0.115, 0.125, 0.12),             // hood ka rim
      p(SPH, C.void, 0, 0.14, 0.15, 0.1, 0.085, 0.06),                      // andhera chehra
      p(SPH, C.cap, 0, 0.205, 0.17, 0.11, 0.012, 0.085, 0.22),              // cap ka brim
    ]),
    eyes: bake([
      p(SPH, C.eye, 0.04, 0.135, 0.205, 0.026, 0.014, 0.012, 0, 0, 0.3),
      p(SPH, C.eye, -0.04, 0.135, 0.205, 0.026, 0.014, 0.012, 0, 0, -0.3),
    ]),
    guns: [
      bake([   // pistol (origin = grip)
        p(BOX, C.gun, 0, 0.035, 0.09, 0.044, 0.05, 0.24),
        p(BOX, C.gunLight, 0, 0.035, 0.225, 0.02, 0.022, 0.05),
        p(BOX, C.gunLight, 0, -0.045, -0.01, 0.042, 0.115, 0.058, -0.18, 0, 0),
        p(BOX, C.gun, 0, -0.012, 0.045, 0.02, 0.012, 0.07),
      ]),
      bake([   // smg
        p(BOX, C.gun, 0, 0.03, 0.1, 0.06, 0.08, 0.3),
        p(BOX, C.gunLight, 0, -0.085, 0.06, 0.04, 0.15, 0.05),
        p(BOX, C.gunLight, 0, -0.05, -0.005, 0.045, 0.1, 0.05, -0.2, 0, 0),
        p(BOX, C.gun, 0, 0.03, -0.12, 0.04, 0.06, 0.14),
        p(BOX, C.gunLight, 0, 0.035, 0.3, 0.025, 0.025, 0.1),
        p(BOX, C.gunLight, 0, -0.05, 0.13, 0.035, 0.07, 0.04),
        p(BOX, C.gun, 0, 0.085, 0.08, 0.02, 0.02, 0.08),
      ]),
    ],
  };
  return G;
}

export const makeGun = (i) => new THREE.Mesh(parts().guns[i], bodyMat);
export function makeFlash(i) {
  const f = new THREE.Mesh(SPH, flashMat);
  f.scale.set(0.05, 0.05, 0.07);
  f.position.set(0, 0.035, MUZZLE[i]);
  f.visible = false;
  return f;
}

// ---------- 2-bone IK: haath hamesha gun ki grip pe pahunchta hai ----------
const UP_L = 0.28, FORE_L = 0.285;
const DOWN = new THREE.Vector3(0, -1, 0);
const X_AXIS = new THREE.Vector3(1, 0, 0);
const POLE_R = new THREE.Vector3(-0.6, -1, -0.2);
const POLE_L = new THREE.Vector3(0.6, -1, -0.2);
const LEFT_OFF = [[0.04, -0.045, 0.02], [0.012, -0.075, 0.13]];
const _d = new THREE.Vector3(), _el = new THREE.Vector3(), _pp = new THREE.Vector3();
const _iq = new THREE.Quaternion();
const _tr = new THREE.Vector3(), _tl = new THREE.Vector3();

function solveArm(arm, target, pole) {
  const S = arm.sh.position;
  _d.subVectors(target, S);
  let dist = _d.length();
  dist = Math.min(UP_L + FORE_L - 0.005, Math.max(Math.abs(UP_L - FORE_L) + 0.02, dist));
  _d.normalize();
  const a = (UP_L * UP_L - FORE_L * FORE_L + dist * dist) / (2 * dist);
  const h = Math.sqrt(Math.max(0, UP_L * UP_L - a * a));
  _pp.copy(pole).addScaledVector(_d, -pole.dot(_d)).normalize();
  _el.copy(S).addScaledVector(_d, a).addScaledVector(_pp, h);          // kohni
  _pp.subVectors(_el, S).normalize();
  arm.sh.quaternion.setFromUnitVectors(DOWN, _pp);
  _pp.copy(S).addScaledVector(_d, dist).sub(_el).normalize();          // forearm direction
  _iq.copy(arm.sh.quaternion).invert();
  _pp.applyQuaternion(_iq);
  arm.elbow.quaternion.setFromUnitVectors(DOWN, _pp);
}

function pivot(parent, x, y, z) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  parent.add(g);
  return g;
}

export function createCharacter() {
  const g = parts();
  const mesh = (geo, parent, mat = bodyMat) => {
    const m = new THREE.Mesh(geo, mat);
    parent.add(m);
    return m;
  };

  const group = new THREE.Group();
  group.rotation.order = 'YXZ';
  const root = new THREE.Group();
  root.scale.setScalar(ROOT_SCALE);
  group.add(root);
  const body = pivot(root, 0, 0, 0);

  function makeLeg(x, thighGeo) {
    const hip = pivot(body, x, 0.72, 0);
    mesh(thighGeo, hip);
    const knee = pivot(hip, 0, -0.36, 0);
    mesh(g.shin, knee);
    return { hip, knee };
  }
  const legL = makeLeg(0.115, g.thighL), legR = makeLeg(-0.115, g.thighR);

  const upper = pivot(body, 0, 0.78, 0);
  mesh(g.torso, upper);

  const aim = pivot(upper, 0, 0.52, 0);
  function makeArm(x) {
    const sh = pivot(aim, x, 0, 0);
    mesh(g.upperArm, sh);
    const elbow = pivot(sh, 0, -UP_L, 0);
    mesh(g.foreArm, elbow);
    return { sh, elbow };
  }
  const armL = makeArm(0.25), armR = makeArm(-0.25);

  const head = pivot(upper, 0, 0.58, 0);
  mesh(g.head, head);
  mesh(g.eyes, head, eyeMat);

  const gunMount = pivot(aim, 0, 0, 0);
  const guns = [0, 1].map((i) => {
    const m = makeGun(i);
    const fl = makeFlash(i);
    m.add(fl);
    m.userData.flash = fl;
    m.visible = i === 0;
    gunMount.add(m);
    return m;
  });
  let cur = 0;

  let t = 0, phase = 0, amp = 0, crouchK = 0, runK = 0, recoil = 0;

  function update(dt, s) {
    t += dt;
    phase += dt * s.speed * 9 * s.dir;
    amp += (Math.min(s.speed, 1.6) * 0.6 - amp) * Math.min(1, dt * 10);
    crouchK += ((s.crouch ? 1 : 0) - crouchK) * Math.min(1, dt * 9);
    runK += ((s.run && s.speed > 0.7 ? 1 : 0) - runK) * Math.min(1, dt * 8);
    recoil = Math.max(0, recoil - dt * 9);
    const c = crouchK;

    // legs
    const sw = Math.sin(phase) * amp;
    const kL = Math.max(0, -Math.cos(phase)) * amp * 1.4;
    const kR = Math.max(0, Math.cos(phase)) * amp * 1.4;
    const hL = sw * (1 - 0.5 * c) - 1.55 * c;
    const hR = -sw * (1 - 0.5 * c) - 1.55 * c;
    const nL = kL + 2.3 * c, nR = kR + 2.3 * c;
    legL.hip.rotation.x = hL; legR.hip.rotation.x = hR;
    legL.knee.rotation.x = nL; legR.knee.rotation.x = nR;
    const hgtL = 0.36 * Math.cos(hL) + 0.36 * Math.cos(hL + nL);
    const hgtR = 0.36 * Math.cos(hR) + 0.36 * Math.cos(hR + nR);
    body.position.y = (Math.max(hgtL, hgtR) - 0.72) * (0.5 + 0.5 * c);
    body.position.z = -0.115 * c;
    body.rotation.y = Math.sin(phase) * amp * 0.15;

    // upper body
    upper.scale.y = 1 + Math.sin(t * 1.8) * 0.012;
    upper.rotation.set(
      0.04 + 0.5 * c + 0.14 * runK,
      s.twist * 0.6 - body.rotation.y * 0.7,
      s.lean * 0.3 + s.side * 0.07
    );

    // aim + hands: gun ki grip pe IK
    aim.rotation.x = -s.pitch * 0.85 * (1 - 0.6 * runK) - upper.rotation.x + 0.35 * runK;
    const sway = Math.sin(phase * 2) * amp * 0.012;
    _tr.set(-0.03 - 0.05 * runK, -0.04 - 0.18 * runK + sway + recoil * 0.012, 0.34 - 0.08 * runK - recoil * 0.06);
    gunMount.position.copy(_tr);
    gunMount.rotation.x = -recoil * 0.12;
    const lo = LEFT_OFF[cur];
    _tl.set(lo[0], lo[1], lo[2]).applyAxisAngle(X_AXIS, gunMount.rotation.x).add(_tr);
    solveArm(armR, _tr, POLE_R);
    solveArm(armL, _tl, POLE_L);

    head.rotation.set(-s.pitch * 0.6 + recoil * 0.1 - upper.rotation.x * 0.7, s.twist * 0.4, 0);
    guns[cur].userData.flash.visible = recoil > 0.6;
  }

  function setWeapon(i) {
    if (i === cur) return;
    guns[cur].userData.flash.visible = false;
    cur = i;
    guns.forEach((m, j) => (m.visible = j === i));
    recoil = 0;
  }

  const kick = () => { recoil = 1; };
  const setDead = (k) => { group.rotation.x = -1.5 * k; };

  return { group, update, setWeapon, kick, setDead };
}