import * as THREE from 'three';
import { box } from './builders.js';
import { mats } from './materials.js';
import { FLOOR_Y, SLAB, ROOF_Y, STAIRS as S } from './dims.js';

const LIGHT_POWER = 140;
const QUALITY = matchMedia('(pointer: coarse)').matches ? 1 : 2;
const geo = new THREE.CylinderGeometry(0.28, 0.28, 0.6, 8);

// [x, z, tier]  0 = sirf lantern, 1 = asli light (phone + PC), 2 = asli light sirf PC pe
const HALL = [
  [-16, -10, 0], [-8, -10, 2], [0, -10, 1], [8, -10, 2], [16, -10, 0],
  [-16, 0, 1],   [-8, 0, 0],   [0, 0, 1],   [8, 0, 0],   [16, 0, 1],
  [-16, 10, 0],  [-8, 10, 2],  [0, 10, 1],  [8, 10, 2],  [16, 10, 0],
  [-8, -14, 0], [0, -14, 0], [8, -14, 0], [-8, 14, 0], [8, 14, 0],
  [-13.5, -2, 0], [-13.5, 2, 0], [13.5, -2, 0], [13.5, 2, 0],
];
const CORNER = [[14, -11, 1], [18, -13.5, 0], [18, -8.5, 0]];

function glow(scene, x, y, z, tier) {
  if (tier === 0 || tier > QUALITY) return;
  const l = new THREE.PointLight(0xffa640, LIGHT_POWER, 22, 2);
  l.position.set(x, y, z);
  scene.add(l);
}

function lantern(scene, x, ceilY, z, tier) {
  const y = ceilY - 0.9;
  const m = new THREE.Mesh(geo, mats.paper);
  m.position.set(x, y, z);
  scene.add(m);
  box(scene, 0.45, 0.06, 0.45, x, y + 0.33, z, mats.post);
  box(scene, 0.45, 0.06, 0.45, x, y - 0.33, z, mats.post);
  box(scene, 0.03, 0.54, 0.03, x, ceilY - 0.27, z, mats.post);
  glow(scene, x, y - 0.2, z, tier);
}

function stairLamp(scene, step, tier) {
  const x = S.x0 + S.run * (step + 0.5);
  const z = S.z0 + 0.3;
  const base = (step + 1) * S.rise;
  box(scene, 0.06, 0.9, 0.06, x, base + 0.45, z, mats.post);
  const m = new THREE.Mesh(geo, mats.paper);
  m.scale.setScalar(0.6);
  m.position.set(x, base + 1.1, z);
  scene.add(m);
  box(scene, 0.3, 0.05, 0.3, x, base + 1.3, z, mats.post);
  box(scene, 0.3, 0.05, 0.3, x, base + 0.9, z, mats.post);
  glow(scene, x, base + 1.1, z + 0.3, tier);
}

export function buildLamps(scene) {
  const low = FLOOR_Y - SLAB;
  [...HALL, ...CORNER].forEach(([x, z, t]) => lantern(scene, x, low, z, t));
  HALL.forEach(([x, z, t]) => lantern(scene, x, ROOF_Y, z, t));

  lantern(scene, -14.8, ROOF_Y, -13.4, 1);
  lantern(scene, -11.5, ROOF_Y, -13.4, 0);

  [[1, 0], [4, 2], [7, 1], [10, 2], [13, 1], [16, 2], [19, 0]].forEach(([s, t]) => stairLamp(scene, s, t));
}