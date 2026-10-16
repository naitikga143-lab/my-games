import { box } from './builders.js';
import { mats } from './materials.js';
import { wall } from './wall.js';
import { W, D, FLOOR_Y, SLAB, ROOF_Y, STAIRS as S } from './dims.js';

const X = W / 2, Z = D / 2;

export function buildHall(scene) {
  box(scene, W, 0.2, D, 0, -0.1, 0, mats.floor);
  wall(scene, -X, -Z, X, -Z, 0, ROOF_Y);
  wall(scene, -X, Z, X, Z, 0, ROOF_Y);
  wall(scene, -X, -Z, -X, Z, 0, ROOF_Y);
  wall(scene, X, -Z, X, Z, 0, ROOF_Y);
  box(scene, W, 0.4, D, 0, ROOF_Y + 0.2, 0, mats.ceiling);
  buildSlab(scene);
}

// upar ki floor, seedhi ke liye hole chhodkar
function buildSlab(scene) {
  const y = FLOOR_Y - SLAB / 2;
  box(scene, X - S.x1, SLAB, D, (S.x1 + X) / 2, y, 0, mats.slab);
  box(scene, S.x1 + X, SLAB, Z - S.z1, (S.x1 - X) / 2, y, (S.z1 + Z) / 2, mats.slab);
}