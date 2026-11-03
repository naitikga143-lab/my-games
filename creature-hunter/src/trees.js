import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/*
  createTrees(): Indian Banyan (bargad) trees
  - motha tana + buttress roots (player pichhe chhup sakta hai)
  - latakti hawai jadein (aerial roots) aur moti pillar-roots
  - chauda, chapta canopy
  - minDist: ek tree se doosre ki kam se kam doori
  return: { group, trees, colliders, collide(pos, r), hit(pos) }
*/
export function createTrees({
  count = 30,
  area = 190,
  minDist = 30,
  clearRadius = 14,
  castShadow = false,
  seed = 7,
  nearCount = 3, // itne trees player ke paas (16-26m) taaki daudna na pade
} = {}) {
  let s = seed >>> 0;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };

  /* ---------- positions (minDist ke saath) ---------- */
  const pts = [];
  const grid = new Map();
  const cell = minDist;
  const keyOf = (cx, cz) => `${cx},${cz}`;
  const isFree = (x, z) => {
    if (Math.hypot(x, z) < clearRadius) return false;
    const cx = Math.floor(x / cell), cz = Math.floor(z / cell);
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const arr = grid.get(keyOf(cx + i, cz + j));
        if (!arr) continue;
        for (const p of arr) {
          const dx = p.x - x, dz = p.z - z;
          if (dx * dx + dz * dz < minDist * minDist) return false;
        }
      }
    }
    return true;
  };
  const addTree = (x, z) => {
    const p = { x, z, s: 0.9 + rnd() * 0.4, rot: rnd() * Math.PI * 2, tint: rnd(), v: pts.length % 2 };
    pts.push(p);
    const k = keyOf(Math.floor(x / cell), Math.floor(z / cell));
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(p);
  };

  // pehle kuch trees player ke paas (16-26m), alag-alag disha mein
  for (let k = 0; k < nearCount && pts.length < count; k++) {
    for (let tries = 0; tries < 40; tries++) {
      const a = (k / nearCount) * Math.PI * 2 + 0.4 + rnd() * 0.8;
      const rad = 16 + rnd() * 10;
      const x = Math.cos(a) * rad, z = Math.sin(a) * rad;
      if (!isFree(x, z)) continue;
      addTree(x, z);
      break;
    }
  }

  // baaki random, area ke andar
  for (let tries = 0; pts.length < count && tries < count * 80; tries++) {
    const x = (rnd() * 2 - 1) * area, z = (rnd() * 2 - 1) * area;
    if (!isFree(x, z)) continue;
    addTree(x, z);
  }

  /* ---------- ek banyan ka geometry (2 variants) ---------- */
  const colorize = (geo, hex) => {
    const c = new THREE.Color(hex);
    const n = geo.attributes.position.count;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b; }
    geo.setAttribute('color', new THREE.BufferAttribute(a, 3));
    return geo;
  };

  const leafPalette = [0x2f7a3a, 0x3a8a3f, 0x287040, 0x44903c, 0x2a6e48];

  function buildVariant() {
    const bark = [];
    const leaves = [];
    const pillars = []; // local (x, z) of moti pillar roots

    // main tana (motha)
    bark.push(colorize(new THREE.CylinderGeometry(1.5, 2.1, 7.5, 12, 1).translate(0, 3.75, 0), 0x5a4535));

    // 3 aur tane jo thoda bahar jhukte hain (gnarled look)
    for (let k = 0; k < 3; k++) {
      const ang = k * 2.1 + rnd();
      const g = new THREE.CylinderGeometry(0.6, 0.9, 8.5, 8).translate(0, 4.25, 0);
      g.rotateZ(-0.12);
      g.rotateY(ang);
      g.translate(Math.cos(ang) * 1.5, 0, -Math.sin(ang) * 1.5);
      bark.push(colorize(g, 0x5f4a38));
    }

    // buttress roots (zameen par faile hue)
    for (let k = 0; k < 7; k++) {
      const ang = (k / 7) * Math.PI * 2 + rnd() * 0.4;
      const g = new THREE.ConeGeometry(0.8, 3.6, 6);
      g.rotateZ(-Math.PI / 2);
      g.scale(1, 0.55, 1);
      g.translate(1.5, 0.4, 0);
      g.rotateY(ang);
      bark.push(colorize(g, 0x4f3d2f));
    }

    // moti pillar roots (canopy se zameen tak)
    for (let k = 0; k < 5; k++) {
      const ang = rnd() * Math.PI * 2;
      const rad = 3.5 + rnd() * 4;
      const x = Math.cos(ang) * rad, z = Math.sin(ang) * rad;
      bark.push(colorize(new THREE.CylinderGeometry(0.24, 0.34, 8.5, 8).translate(x, 4.25, z), 0x66513d));
      pillars.push({ x, z });
    }

    // latakti hawai jadein
    for (let k = 0; k < 16; k++) {
      const ang = rnd() * Math.PI * 2;
      const rad = 2.5 + rnd() * 7;
      const len = 3 + rnd() * 4.5;
      const g = new THREE.CylinderGeometry(0.035, 0.075, len, 5).translate(0, -len / 2, 0);
      g.translate(Math.cos(ang) * rad, 7.8, Math.sin(ang) * rad);
      bark.push(colorize(g, 0x77634a));
    }

    // canopy: chaude, chapte blobs
    {
      const g = new THREE.IcosahedronGeometry(4.8, 1);
      g.scale(1.25, 0.7, 1.25);
      g.translate(0, 10.5, 0);
      leaves.push(colorize(g, leafPalette[0]));
    }
    for (let k = 0; k < 11; k++) {
      const ang = rnd() * Math.PI * 2;
      const rad = rnd() * 6.5;
      const r = 3 + rnd() * 1.8;
      const g = new THREE.IcosahedronGeometry(r, 1);
      g.scale(1.25, 0.7, 1.25);
      g.translate(Math.cos(ang) * rad, 8.6 + rnd() * 2.6, Math.sin(ang) * rad);
      leaves.push(colorize(g, leafPalette[Math.floor(rnd() * leafPalette.length)]));
    }

    return { bark: mergeGeometries(bark), leaves: mergeGeometries(leaves), pillars };
  }

  const variants = [buildVariant(), buildVariant()];

  const barkMat = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 1, flatShading: true });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.95, flatShading: true });

  const group = new THREE.Group();
  const dummy = new THREE.Object3D();
  const tint = new THREE.Color();

  variants.forEach((V, vi) => {
    const list = pts.filter((p) => p.v === vi);
    if (!list.length) return;
    const barkMesh = new THREE.InstancedMesh(V.bark, barkMat, list.length);
    const leafMesh = new THREE.InstancedMesh(V.leaves, leafMat, list.length);
    list.forEach((p, i) => {
      dummy.position.set(p.x, 0, p.z);
      dummy.rotation.set(0, p.rot, 0);
      dummy.scale.set(p.s, p.s * (0.92 + p.tint * 0.2), p.s);
      dummy.updateMatrix();
      barkMesh.setMatrixAt(i, dummy.matrix);
      leafMesh.setMatrixAt(i, dummy.matrix);
      tint.setRGB(1, 1, 1).offsetHSL(0, 0, (p.tint - 0.5) * 0.12);
      leafMesh.setColorAt(i, tint);
    });
    barkMesh.instanceMatrix.needsUpdate = true;
    leafMesh.instanceMatrix.needsUpdate = true;
    if (leafMesh.instanceColor) leafMesh.instanceColor.needsUpdate = true;
    for (const m of [barkMesh, leafMesh]) {
      m.castShadow = castShadow;
      m.frustumCulled = false;
      group.add(m);
    }
  });

  /* ---------- colliders: tana + pillar roots ---------- */
  const colliders = [];
  for (const p of pts) {
    colliders.push({ x: p.x, z: p.z, r: 2.3 * p.s, h: 8 * p.s });
    const c = Math.cos(p.rot), sn = Math.sin(p.rot);
    for (const pl of variants[p.v].pillars) {
      colliders.push({
        x: p.x + (pl.x * c + pl.z * sn) * p.s,
        z: p.z + (-pl.x * sn + pl.z * c) * p.s,
        r: 0.42 * p.s,
        h: 8 * p.s,
      });
    }
  }

  // player / creature ko tree ke andar jaane se rokta hai
  function collide(pos, radius = 0.4) {
    for (const t of colliders) {
      const dx = pos.x - t.x, dz = pos.z - t.z;
      const min = t.r + radius;
      const d2 = dx * dx + dz * dz;
      if (d2 < min * min) {
        const d = Math.sqrt(d2) || 0.0001;
        pos.x = t.x + (dx / d) * min;
        pos.z = t.z + (dz / d) * min;
      }
    }
  }

  // rocket tana/pillar se takraya?
  function hit(pos) {
    for (const t of colliders) {
      if (pos.y > t.h) continue;
      const dx = pos.x - t.x, dz = pos.z - t.z;
      if (dx * dx + dz * dz < t.r * t.r) return true;
    }
    return false;
  }

  return { group, trees: pts, colliders, collide, hit };
}