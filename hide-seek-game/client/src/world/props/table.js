import * as THREE from 'three';
import { box } from '../builders.js';
import { mats } from '../materials.js';
import { addCollider } from '../colliders.js';

// bots ke chhupne ki jagah: table ke peeche, munh table ke saamne wali taraf
export const tableSpots = [];

export function makeTable(parent, x, y, z, rotY = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  parent.add(g);

  const plate = box(g, 2, 1.1, 0.1, 0, 0.55, 0, mats.wood);
  box(g, 2.1, 0.08, 0.14, 0, 1.12, 0, mats.woodDark);
  for (const sx of [-0.85, 0.85]) {
    box(g, 0.1, 0.1, 0.75, sx, 0.25, -0.42, mats.woodDark);
    box(g, 0.1, 0.1, 0.75, sx, 0.95, -0.42, mats.woodDark);
  }
  g.updateMatrixWorld(true);
  addCollider(plate);

  const s = Math.sin(rotY), c = Math.cos(rotY);
  tableSpots.push({ x: x - 0.55 * s, y, z: z - 0.55 * c, yaw: rotY + Math.PI });
}