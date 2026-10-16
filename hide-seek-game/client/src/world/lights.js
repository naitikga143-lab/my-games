import * as THREE from 'three';

export function addLights(scene) {
  scene.add(new THREE.HemisphereLight(0xa87c4c, 0x3a2512, 1.3));
}