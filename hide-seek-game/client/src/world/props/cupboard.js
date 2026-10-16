import * as THREE from 'three';
import { box } from '../builders.js';
import { mats } from '../materials.js';
import { addCollider } from '../colliders.js';

export function makeCupboard(parent, x, y, z, rotY = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  box(g, 1.2, 2.2, 0.6, 0, 1.1, 0, mats.woodDark);
  box(g, 0.56, 2.0, 0.04, -0.29, 1.1, 0.31, mats.wood);
  box(g, 0.56, 2.0, 0.04, 0.29, 1.1, 0.31, mats.wood);
  box(g, 0.04, 0.2, 0.04, -0.06, 1.1, 0.35, mats.trim);
  box(g, 0.04, 0.2, 0.04, 0.06, 1.1, 0.35, mats.trim);
  parent.add(g);
  addCollider(g);
}