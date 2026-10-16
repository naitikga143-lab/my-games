import * as THREE from 'three';
import { box } from '../builders.js';
import { mats } from '../materials.js';

export function makeDoor(parent, x, y, z, rotY = 0, open = 1.2) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  box(g, 0.15, 2.4, 0.3, -1.0, 1.2, 0, mats.trim);
  box(g, 0.15, 2.4, 0.3, 1.0, 1.2, 0, mats.trim);
  box(g, 2.15, 0.15, 0.3, 0, 2.4, 0, mats.trim);

  const pivot = new THREE.Group();
  pivot.position.set(-0.92, 0, 0);
  pivot.rotation.y = -open;
  box(pivot, 0.9, 2.3, 0.06, 0.45, 1.15, 0, mats.door);
  g.add(pivot);
  parent.add(g);
}