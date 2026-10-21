import * as THREE from 'three';
import { createRenderer } from './core/renderer.js';
import { startLoop } from './core/loop.js';
import { createControls } from './player/controls.js';
import { createCharacter } from './player/model.js';
import { setupTouch } from './player/touch.js';
import { box } from './world/builders.js';
import { mats } from './world/materials.js';
import { me } from './player/self.js';

function sign(scene, text) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 160;
  const x = c.getContext('2d');
  x.fillStyle = '#0b1b36'; x.fillRect(0, 0, 512, 160);
  x.strokeStyle = '#28c8ff'; x.lineWidth = 6; x.strokeRect(6, 6, 500, 148);
  x.fillStyle = '#bfeaff'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = 'bold 46px Arial'; x.fillText(text, 256, 62);
  x.font = '26px Arial'; x.fillText('UNDER CONSTRUCTION', 256, 112);
  const tex = new THREE.CanvasTexture(c);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(6, 1.9),
    new THREE.MeshBasicMaterial({ map: tex }));
  m.position.set(0, 2.2, -8.7);
  scene.add(m);
}

export function startTemp(d) {
  document.body.classList.add('ingame');
  document.body.classList.remove('in-lobby');
  document.getElementById('adTop')?.remove();
  document.getElementById('app')?.remove();

  const { renderer, scene, camera } = createRenderer();
  scene.add(new THREE.HemisphereLight(0xcfeaff, 0x20304a, 1.7));
  box(scene, 18, 0.2, 24, 0, -0.1, 2.5, mats.floor);
  box(scene, 18, 4, 0.4, 0, 2, -9, mats.plank, true);
  box(scene, 18, 4, 0.4, 0, 2, 14.4, mats.plank, true);
  box(scene, 0.4, 4, 24, -9.2, 2, 2.5, mats.plank, true);
  box(scene, 0.4, 4, 24, 9.2, 2, 2.5, mats.plank, true);
  sign(scene, `ROOM ${d.room}`);

  scene.add(camera);
  const avatar = createCharacter();
  scene.add(avatar.group);
  me.id = d.pid; me.name = d.name;
  setupTouch();
  const controls = createControls(camera, renderer.domElement, avatar, 0);
  startLoop((dt) => controls.update(dt), () => renderer.render(scene, camera));
}