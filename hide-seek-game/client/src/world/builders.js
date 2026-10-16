import * as THREE from 'three';
import { addCollider } from './colliders.js';

const geo = new THREE.BoxGeometry(1, 1, 1);

export function box(parent, w, h, d, x, y, z, mat, solid = false) {
  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.set(w, h, d);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  if (solid) addCollider(mesh);
  return mesh;
}