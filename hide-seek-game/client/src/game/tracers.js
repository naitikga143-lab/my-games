import * as THREE from 'three';

const N = 40;
const lines = [];
let idx = 0;

export function initTracers(scene) {
  for (let i = 0; i < N; i++) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    const mat = new THREE.LineBasicMaterial({
      color: 0xffd9a0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const l = new THREE.Line(geo, mat);
    l.visible = false;
    l.frustumCulled = false;
    l.userData.life = 0;
    scene.add(l);
    lines.push(l);
  }
}

export function tracer(a, b) {
  if (!lines.length) return;
  const l = lines[idx++ % N];
  const p = l.geometry.attributes.position;
  p.setXYZ(0, a.x, a.y, a.z);
  p.setXYZ(1, b.x, b.y, b.z);
  p.needsUpdate = true;
  l.visible = true;
  l.userData.life = 0.12;
}

export function updateTracers(dt) {
  for (const l of lines) {
    if (!l.visible) continue;
    l.userData.life -= dt;
    if (l.userData.life <= 0) { l.visible = false; continue; }
    l.material.opacity = (l.userData.life / 0.12) * 0.8;
  }
}