import * as THREE from 'three';

const N = 60, SPEED = 260, LEN = 0.7;
const items = [];
let idx = 0;
const Y = new THREE.Vector3(0, 1, 0);
const _d = new THREE.Vector3();

export function initTracers(scene) {
  const geo = new THREE.CylinderGeometry(0.012, 0.012, LEN, 6);
  for (let i = 0; i < N; i++) {
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color: 0xffd9a0, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    m.visible = false;
    m.frustumCulled = false;
    scene.add(m);
    items.push({ m, a: new THREE.Vector3(), d: new THREE.Vector3(), dist: 0, s: 0 });
  }
}

export function tracer(a, b) {
  if (!items.length) return;                       // server worker me graphics nahi
  _d.subVectors(b, a);
  const dist = _d.length();
  if (dist < 0.5) return;
  _d.divideScalar(dist);
  const it = items[idx++ % N];
  it.a.copy(a); it.d.copy(_d); it.dist = dist; it.s = 0;
  it.m.quaternion.setFromUnitVectors(Y, _d);
  it.m.visible = true;
}

export function updateTracers(dt) {
  for (const it of items) {
    if (!it.m.visible) continue;
    it.s += SPEED * dt;
    if (it.s - LEN / 2 > it.dist) { it.m.visible = false; continue; }
    it.m.position.copy(it.a).addScaledVector(it.d, Math.min(it.s, it.dist));
  }
}