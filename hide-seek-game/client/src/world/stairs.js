import { box } from './builders.js';
import { mats } from './materials.js';
import { STAIRS as S, FLOOR_Y, SLAB } from './dims.js';

const cz = (S.z0 + S.z1) / 2;
const w = S.z1 - S.z0;

export function buildStairs(scene) {
  for (let i = 0; i < S.steps; i++) {
    const top = (i + 1) * S.rise;
    box(scene, S.run, top, w, S.x0 + S.run * (i + 0.5), top / 2, cz, mats.stairs);
  }
  // hall ki taraf deewar + railing (shuru ke 1.8m khule)
  const rx0 = S.x0 + 1.8;
  box(scene, S.x1 - rx0, FLOOR_Y + 1, 0.15, (rx0 + S.x1) / 2, (FLOOR_Y + 1) / 2, S.z1 + 0.075, mats.rail, true);
  // upar floor pe khule hisse ki railing
  box(scene, 1.8, 1, 0.15, S.x0 + 0.9, FLOOR_Y + 0.5, S.z1 + 0.075, mats.rail, true);
  // seedhi ke neeche ka east band
  box(scene, 0.2, FLOOR_Y - SLAB, w, S.x1 + 0.1, (FLOOR_Y - SLAB) / 2, cz, mats.rail, true);
}

function inStairs(x, z) {
  return x > S.x0 && x < S.x1 && z > S.z0 && z < S.z1;
}

export function groundY(x, z, currentY) {
  if (inStairs(x, z)) {
    const i = Math.floor((x - S.x0) / S.run);
    return Math.min((i + 1) * S.rise, FLOOR_Y);
  }
  return currentY > FLOOR_Y / 2 + 0.1 ? FLOOR_Y : 0;
}