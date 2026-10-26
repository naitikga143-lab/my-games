import * as THREE from 'three';

const c = document.createElement('canvas');
c.width = c.height = 32;
const x = c.getContext('2d');
const g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
g.addColorStop(0, 'rgba(255,255,255,1)');
g.addColorStop(0.6, 'rgba(255,255,255,.9)');
g.addColorStop(1, 'rgba(255,255,255,0)');
x.fillStyle = g;
x.fillRect(0, 0, 32, 32);
export const dotTex = new THREE.CanvasTexture(c);