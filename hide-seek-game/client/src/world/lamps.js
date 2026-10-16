import * as THREE from 'three';
import { box } from './builders.js';
import { mats } from './materials.js';
import { FLOOR_Y, SLAB, ROOF_Y, STAIRS as S } from './dims.js';

const LIGHT_POWER = 40;
const QUALITY = matchMedia('(pointer: coarse)').matches ? 1 : 2;
const geo = new THREE.CylinderGeometry(0.28, 0.28, 0.6, 8);

// [x, z, tier]  tier 0 = sirf lantern dikhega
//               tier 1 = asli light (phone + PC)
//               tier 2 = asli light sirf PC pe
const HALL = [
  [-14, 9, 2], [-7, 9, 0], [0, 9, 1], [7, 9, 0], [14, 9, 2],
  [-14, -9, 0], [-7, -9, 1], [0, -9, 0], [7, -9, 1],
  [-7, 0, 0], [0, 0, 0], [7, 0, 0],
];
const LEFT = [[-15.5, 0, 1], [-13, 0, 0], [-18.5, 0, 0]];
const RIGHT = [[15.5, 0, 1], [13, 0, 0], [18.5, 0, 0]];
const CORNER = [[16, -11, 1], [13, -9, 0], [18.5, -13.5, 0]];
const UPPER_ONLY = [[15, -11, 0]];

function glow(scene, x, y, z, tier) {
  if (tier === 0 || tier > QUALITY) return;
  const l = new THREE.PointLight(0xffa640, LIGHT_POWER, 16, 2);
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

// seedhi ke step pe khadi lamp (andon style)
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
  const both = [...HALL, ...LEFT, ...RIGHT];

  [...both, ...CORNER].forEach(([x, z, t]) => lantern(scene, x, low, z, t));
  [...both, ...UPPER_ONLY].forEach(([x, z, t]) => lantern(scene, x, ROOF_Y, z, t));

  // seedhi ke upar (hole ke upar latakti lantern)
  lantern(scene, -14.8, ROOF_Y, -13.4, 1);
  lantern(scene, -11.5, ROOF_Y, -13.4, 0);

  // seedhi ke steps pe [step number, tier]
  [[2, 0], [6, 2], [10, 1], [14, 2], [18, 0]].forEach(([s, t]) => stairLamp(scene, s, t));
}