import * as THREE from 'three';
import { colliders } from '../world/colliders.js';
import { groundY } from '../world/stairs.js';
import { input, keys } from './input.js';

const SPEED = 5, RADIUS = 0.4, EYE = 1.6, EYE_CROUCH = 0.95;
const TOUCH = matchMedia('(pointer: coarse)').matches;

export function createControls(camera, dom) {
  let yaw = 0, pitch = 0, feetY = 0, eye = EYE;
  camera.rotation.order = 'YXZ';
  camera.position.set(0, EYE, 12);

  if (!TOUCH) {
    dom.addEventListener('click', () => dom.requestPointerLock());
    document.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement !== dom) return;
      input.lookX += e.movementX * 0.002;
      input.lookY += e.movementY * 0.002;
    });
  }

  function blocked(x, z, top) {
    const b = new THREE.Box3(
      new THREE.Vector3(x - RADIUS, feetY + 0.4, z - RADIUS),
      new THREE.Vector3(x + RADIUS, feetY + top, z + RADIUS)
    );
    return colliders.some((c) => c.intersectsBox(b));
  }

  function update(dt) {
    yaw -= input.lookX;
    pitch = Math.max(-1.5, Math.min(1.5, pitch - input.lookY));
    input.lookX = 0; input.lookY = 0;

    const crouch = input.crouch;
    const run = input.run || keys.ShiftLeft;
    const top = crouch ? 0.95 : 1.7;
    eye += ((crouch ? EYE_CROUCH : EYE) - eye) * Math.min(1, dt * 10);

    let f = (keys.KeyW ? 1 : 0) - (keys.KeyS ? 1 : 0) + input.moveY;
    let s = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0) + input.moveX;
    const len = Math.hypot(f, s);
    if (len > 1) { f /= len; s /= len; }
    if (len < 0.1) { f = 0; s = 0; }

    const mul = crouch ? 0.5 : run ? 1.6 : 1;
    const sp = SPEED * mul * dt;
    const dx = (-Math.sin(yaw) * f + Math.cos(yaw) * s) * sp;
    const dz = (-Math.cos(yaw) * f - Math.sin(yaw) * s) * sp;

    const p = camera.position;
    if (!blocked(p.x + dx, p.z, top)) p.x += dx;
    if (!blocked(p.x, p.z + dz, top)) p.z += dz;

    const g = groundY(p.x, p.z, feetY);
    feetY += (g - feetY) * Math.min(1, dt * 12);
    p.y = feetY + eye;
    camera.rotation.set(pitch, yaw, 0);
  }

  return { update };
}