import * as THREE from 'three';
import { makeGun, makeFlash } from './model.js';

export function createViewGun(camera) {
  const root = new THREE.Group();
  root.scale.setScalar(1.3);
  root.rotation.y = Math.PI;   // barrel camera ke saamne
  camera.add(root);

  const guns = [0, 1, 2, 3].map((i) => {
    const m = makeGun(i);
    const fl = makeFlash(i);
    m.add(fl);
    m.userData.flash = fl;
    root.add(m);
    return m;
  });

  let recoil = 0, t = 0, low = 0;

  return {
    kick() { recoil = 1; },
    update(dt, visible, weapon, speed, run) {
      root.visible = visible;
      if (!visible) return;
      guns.forEach((m, i) => (m.visible = i === weapon));
      t += dt * speed * 9;
      recoil = Math.max(0, recoil - dt * 10);
      low += ((run && speed > 0.7 ? 1 : 0) - low) * Math.min(1, dt * 8);
      root.position.set(
        0.17 + Math.cos(t) * 0.006 * speed,
        -0.19 - Math.abs(Math.sin(t)) * 0.01 * speed - low * 0.05,
        -0.4 + recoil * 0.05
      );
      root.rotation.x = recoil * 0.1 + low * 0.2;
      guns[weapon].userData.flash.visible = recoil > 0.6;
    },
  };
}