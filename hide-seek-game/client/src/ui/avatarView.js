import * as THREE from 'three';
import { createCharacter } from '../player/model.js';

const W = 220, H = 260;

export function mountAvatar(box) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(W, H);
  box.append(renderer.domElement);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(35, W / H, 0.1, 20);
  cam.position.set(0, 0.95, 3.6);
  cam.lookAt(0, 0.72, 0);
  scene.add(new THREE.HemisphereLight(0xcfeaff, 0x20304a, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(2, 3, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x28c8ff, 1.1);
  rim.position.set(-3, 2, -2);
  scene.add(rim);

  const av = createCharacter();
  scene.add(av.group);
  const st = { speed: 0, side: 0, dir: 1, crouch: false, run: false, lean: 0, pitch: 0, twist: 0 };

  let raf = 0, last = performance.now(), t = 0;
  const loop = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now; t += dt;
    av.group.rotation.y = Math.sin(t * 0.6) * 0.7;   // halka ghoomta hai
    av.update(dt, st);
    renderer.render(scene, cam);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}