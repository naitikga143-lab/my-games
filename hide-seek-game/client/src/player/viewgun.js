import * as THREE from 'three';
import { makeGun, makeFlash, makeSight, sightGeo } from './model.js';
import { SIGHT_MOUNT } from './guns.js';
import { eco } from '../game/economy.js';

export function createViewGun(camera) {
  const root = new THREE.Group();
  root.scale.setScalar(1.3);
  root.rotation.y = Math.PI;
  camera.add(root);

  const guns = [0, 1, 2, 3].map((i) => {
    const m = makeGun(i);
    const fl = makeFlash(i);
    m.add(fl);
    m.userData.flash = fl;
    const sg = makeSight(eco.scope, i);
    m.add(sg);
    m.userData.sight = sg;
    root.add(m);
    return m;
  });

  let recoil = 0, t = 0, low = 0, curScope = eco.scope;

  return {
    kick() { recoil = 1; },
    update(dt, visible, weapon, speed, run, ads = 0) {
      root.visible = visible;
      if (!visible) return;
      if (curScope !== eco.scope) {
        curScope = eco.scope;
        guns.forEach((m) => { m.userData.sight.geometry = sightGeo(curScope); });
      }
      guns.forEach((m, i) => (m.visible = i === weapon));
      t += dt * speed * 9;
      recoil *= Math.exp(-dt * 14);                 // smooth recoil
      low += ((run && speed > 0.7 ? 1 : 0) - low) * Math.min(1, dt * 8);
      const k = ads, nk = 1 - k;
      const eyeY = (SIGHT_MOUNT[weapon][0] + 0.04) * 1.3;
      root.position.set(
        0.17 * nk + Math.cos(t) * 0.006 * speed * nk,
        -0.19 * nk - eyeY * k - Math.abs(Math.sin(t)) * 0.01 * speed * nk - low * 0.05 * nk,
        -0.4 + recoil * 0.05 * (1 - 0.5 * k)
      );
      root.rotation.x = recoil * 0.1 * (1 - 0.6 * k) + low * 0.2 * nk;
      guns[weapon].userData.sight.visible = k < 0.35;   // ads me sight ke andar se dekhte hain
      if (eco.scope >= 2 && k > 0.6) root.visible = false;   // 2x/3x: scope overlay dikhta hai
      guns[weapon].userData.flash.visible = recoil > 0.6;
    },
  };
}