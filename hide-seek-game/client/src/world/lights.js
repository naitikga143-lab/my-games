import * as THREE from 'three';

// kam/zyada roshni: neeche wala 4.0 badlo
export function addLights(scene) {
  scene.add(new THREE.HemisphereLight(0xd9a56a, 0x6a4a2a, 4.0));
}