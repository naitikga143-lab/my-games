import * as THREE from 'three';

export const colliders = [];

export function addCollider(obj) {
  obj.updateMatrixWorld(true);
  colliders.push(new THREE.Box3().setFromObject(obj));
}