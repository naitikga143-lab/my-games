import * as THREE from 'three';
import { box } from '../builders.js';
import { mats } from '../materials.js';
import { addCollider } from '../colliders.js';

export function makeMachine(parent, x, y, z, rotY = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  box(g, 1, 1.8, 0.8, 0, 0.9, 0, mats.metal);
  box(g, 1.05, 0.1, 0.85, 0, 1.85, 0, mats.trim);
  box(g, 0.7, 0.4, 0.05, 0, 1.4, 0.41, mats.screen);
  box(g, 0.12, 0.12, 0.05, -0.2, 0.9, 0.41, mats.btnRed);
  box(g, 0.12, 0.12, 0.05, 0.0, 0.9, 0.41, mats.btnYellow);
  box(g, 0.12, 0.12, 0.05, 0.2, 0.9, 0.41, mats.btnRed);
  box(g, 0.6, 0.3, 0.05, 0, 0.4, 0.41, mats.trim);
  parent.add(g);
  addCollider(g);
}