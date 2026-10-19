import * as THREE from 'three';
import { box } from './builders.js';
import { mats } from './materials.js';
import { FLOOR_Y } from './dims.js';

const IZ = 14.85, IX = 19.85;
const FONT = '"Yu Mincho","Hiragino Mincho ProN","Noto Serif JP","MS Mincho",serif';

function at(side, t, d) {
  if (side === 'back') return { x: t, z: -IZ + d, r: 0 };
  if (side === 'front') return { x: t, z: IZ - d, r: Math.PI };
  if (side === 'left') return { x: -IX + d, z: t, r: Math.PI / 2 };
  return { x: IX - d, z: t, r: -Math.PI / 2 };
}

// ---------- boards ----------
const cache = {};
function signMat(text) {
  if (cache[text]) return cache[text];
  const wide = text.length > 1;
  const c = document.createElement('canvas');
  c.width = wide ? 384 : 160; c.height = wide ? 160 : 160;
  const x = c.getContext('2d');
  x.fillStyle = '#2a1a0d'; x.fillRect(0, 0, c.width, c.height);
  x.strokeStyle = '#c9a45a'; x.lineWidth = 8; x.strokeRect(8, 8, c.width - 16, c.height - 16);
  x.fillStyle = '#f0d9a0';
  x.font = `bold ${wide ? 90 : 110}px ${FONT}`;
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, c.width / 2, c.height / 2 + 6);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cache[text] = new THREE.MeshLambertMaterial({ map: tex, emissive: 0x663f1a, emissiveMap: tex });
  return cache[text];
}

const SIGNS = [
  ['back', -4, '酒'], ['back', 3, '居酒屋'], ['back', 15, '龍'],
  ['front', -5, '闇市'], ['front', 5, '命'], ['front', 15, '夜'],
  ['left', 10, '鬼'], ['left', -9, '侍'],
  ['right', 10, '喧嘩'], ['right', -5.5, '修羅'],
];

function sign(scene, y0, [side, t, text]) {
  const p = at(side, t, 0.22);
  const w = text.length > 1 ? 2.4 : 1.0;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, 1.0), signMat(text));
  m.position.set(p.x, y0 + 2.9, p.z);
  m.rotation.y = p.r;
  scene.add(m);
}

// ---------- dolls ----------
const lam = (c) => new THREE.MeshLambertMaterial({ color: c });
const D = { red: lam(0xb3202a), white: lam(0xf2efe6), gold: lam(0xd4a437), black: lam(0x111111) };
const sph = new THREE.SphereGeometry(1, 8, 6);
const cube = new THREE.BoxGeometry(1, 1, 1);

function part(g, geo, mat, sx, sy, sz, x, y, z) {
  const m = new THREE.Mesh(geo, mat);
  m.scale.set(sx, sy, sz);
  m.position.set(x, y, z);
  g.add(m);
}

function daruma(g) {
  part(g, sph, D.red, 0.2, 0.23, 0.19, 0, 0.23, 0);
  part(g, sph, D.white, 0.12, 0.11, 0.05, 0, 0.3, 0.16);
  for (const s of [-1, 1]) {
    part(g, cube, D.black, 0.04, 0.04, 0.02, s * 0.045, 0.31, 0.2);
    part(g, cube, D.black, 0.07, 0.015, 0.02, s * 0.05, 0.36, 0.2);
  }
  part(g, cube, D.gold, 0.12, 0.12, 0.02, 0, 0.13, 0.18);
}

function neko(g) {
  part(g, cube, D.white, 0.26, 0.3, 0.2, 0, 0.15, 0);
  part(g, cube, D.white, 0.3, 0.22, 0.22, 0, 0.38, 0);
  for (const s of [-1, 1]) {
    part(g, cube, D.white, 0.07, 0.08, 0.05, s * 0.1, 0.52, 0);
    part(g, cube, D.black, 0.03, 0.03, 0.02, s * 0.06, 0.4, 0.115);
  }
  part(g, cube, D.red, 0.27, 0.04, 0.21, 0, 0.29, 0);
  part(g, sph, D.gold, 0.035, 0.035, 0.035, 0, 0.26, 0.12);
  part(g, cube, D.white, 0.07, 0.16, 0.07, -0.16, 0.34, 0.05);
}

const DOLLS = [
  ['back', -8, daruma], ['back', 2.5, neko],
  ['front', -10, neko], ['front', 0, daruma], ['front', 10, neko],
  ['left', -8, daruma], ['right', -5.5, neko],
];

function shelf(scene, y0, [side, t, make]) {
  const p = at(side, t, 0.3);
  const g = new THREE.Group();
  g.position.set(p.x, y0 + 1.9, p.z);
  g.rotation.y = p.r;
  box(g, 0.9, 0.06, 0.4, 0, 0, 0, mats.post);
  const doll = new THREE.Group();
  doll.position.y = 0.03;
  make(doll);
  g.add(doll);
  scene.add(g);
}

export function buildDecor(scene) {
  for (const y0 of [0, FLOOR_Y]) {
    SIGNS.forEach((s) => sign(scene, y0, s));
    DOLLS.forEach((d) => shelf(scene, y0, d));
  }
}