import * as THREE from 'three';
import { box } from './builders.js';
import { mats } from './materials.js';
import { addCollider } from './colliders.js';
import { SHOPS } from '../game/shopdata.js';

function sign(g) {
  if (typeof document === 'undefined') return;   // server worker me canvas nahi hota
  const c = document.createElement('canvas');
  c.width = 512; c.height = 160;
  const x = c.getContext('2d');
  x.fillStyle = '#2a1a0d'; x.fillRect(0, 0, 512, 160);
  x.strokeStyle = '#c9a45a'; x.lineWidth = 8; x.strokeRect(8, 8, 496, 144);
  x.fillStyle = '#f0d9a0'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = 'bold 64px "Yu Mincho","Noto Serif JP",serif';
  x.fillText('武器商', 256, 66);
  x.font = 'bold 28px Arial';
  x.fillText('ARMS SHOP', 256, 124);
  const tex = new THREE.CanvasTexture(c);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.75), new THREE.MeshBasicMaterial({ map: tex }));
  m.position.set(0, 2.25, -0.52);
  g.add(m);
}

export function buildShops(scene) {
  for (const s of SHOPS) {
    const g = new THREE.Group();
    g.position.set(s.x, s.y, s.z);
    g.rotation.y = Math.PI;                       // hall ki taraf munh
    scene.add(g);

    const counter = box(g, 2.6, 1.0, 0.7, 0, 0.5, 0.15, mats.woodDark);
    box(g, 2.7, 0.08, 0.8, 0, 1.04, 0.15, mats.wood);              // counter top
    box(g, 2.6, 1.7, 0.1, 0, 1.2, -0.5, mats.plank);               // peeche ka board
    box(g, 2.5, 0.06, 0.3, 0, 1.45, -0.38, mats.post);             // shelf
    for (let i = 0; i < 5; i++) {                                  // shelf pe gun ke silhouette
      box(g, 0.34, 0.07, 0.07, -1.0 + i * 0.5, 1.52, -0.38, i % 2 ? mats.metal : mats.trim);
    }
    box(g, 0.14, 0.14, 0.06, 0, 1.15, 0.52, mats.screen);          // hari BUY light
    box(g, 0.05, 2.4, 0.05, -1.25, 1.2, 0.15, mats.post);          // do khambe
    box(g, 0.05, 2.4, 0.05, 1.25, 1.2, 0.15, mats.post);
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.4, 8), mats.paper);
    lamp.position.set(0, 2.75, 0.15);
    g.add(lamp);
    sign(g);

    g.updateMatrixWorld(true);
    addCollider(counter);
  }
}