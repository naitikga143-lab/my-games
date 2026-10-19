import * as THREE from 'three';
import { colliders } from './colliders.js';
import { FLOOR_Y, SLAB, ROOF_Y, STAIRS as S } from './dims.js';

const R = 0.35;
const _box = new THREE.Box3();
const _ray = new THREE.Ray();
const _hit = new THREE.Vector3();
const _d = new THREE.Vector3();
let byLevel = null;

export const levelOf = (y) => (y > FLOOR_Y / 2 ? 1 : 0);

function lists() {
  if (!byLevel) {
    byLevel = [[], []];
    for (const c of colliders) {
      if (c.min.y < FLOOR_Y - 0.5) byLevel[0].push(c);
      if (c.max.y > FLOOR_Y + 0.3) byLevel[1].push(c);
    }
  }
  return byLevel;
}

export function blockedAt(x, z, feetY, top, r = R) {
  _box.min.set(x - r, feetY + 0.4, z - r);
  _box.max.set(x + r, feetY + top, z + r);
  for (const c of lists()[levelOf(feetY)]) if (c.intersectsBox(_box)) return true;
  return false;
}

// ray kitni door tak saaf hai (deewar, table, floor, chhat)
export function rayDistance(o, d, maxDist, level) {
  _ray.origin.copy(o);
  _ray.direction.copy(d);
  let best = maxDist;
  for (const c of lists()[level]) {
    if (c.containsPoint(o)) continue;
    if (_ray.intersectBox(c, _hit)) {
      const t = _hit.distanceTo(o);
      if (t < best) best = t;
    }
  }
  if (d.y < -1e-4) {
    const t = -o.y / d.y;
    if (t > 0 && t < best) best = t;
  }
  if (Math.abs(d.y) > 1e-4) {
    const t = (FLOOR_Y - SLAB / 2 - o.y) / d.y;
    if (t > 0 && t < best) {
      const x = o.x + d.x * t, z = o.z + d.z * t;
      if (!(x > S.x0 && x < S.x1 && z > S.z0 && z < S.z1)) best = t;
    }
  }
  if (d.y > 1e-4 && level === 1) {
    const t = (ROOF_Y - o.y) / d.y;
    if (t > 0 && t < best) best = t;
  }
  return best;
}

export function losClear(a, b, level) {
  _d.subVectors(b, a);
  const len = _d.length();
  if (len < 0.01) return true;
  _d.divideScalar(len);
  return rayDistance(a, _d, len - 0.05, level) >= len - 0.05;
}