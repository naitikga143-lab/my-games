import { Texture } from 'pixi.js';
import { fbm } from './noise.js';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = v => Math.max(0, Math.min(255, v));

// [height, r, g, b]
const RAMP = [
  [0, 5, 18, 55], [0.38, 8, 40, 105], [0.48, 25, 120, 165], [0.515, 95, 195, 195],
  [0.53, 214, 200, 150], [0.56, 86, 150, 64], [0.64, 36, 100, 48],
  [0.72, 120, 100, 72], [0.78, 150, 145, 140], [0.86, 245, 245, 250], [1, 255, 255, 255],
];
function ramp(e) {
  for (let i = 1; i < RAMP.length; i++) {
    if (e <= RAMP[i][0]) {
      const a = RAMP[i - 1], b = RAMP[i];
      const t = (e - a[0]) / (b[0] - a[0]);
      return [lerp(a[1], b[1], t), lerp(a[2], b[2], t), lerp(a[3], b[3], t)];
    }
  }
  return [255, 255, 255];
}

function toTexture(canvas) {
  const tex = Texture.from(canvas);
  tex.source.style.addressMode = 'repeat';
  return tex;
}

export function makeEarthTexture() {
  const W = 512, H = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(W, H);
  const elev = new Float32Array(W * H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const n = fbm(x / W, y / H, 4, 8, 5, 1);
      elev[y * W + x] = Math.max(0, Math.min(1, (n - 0.5) * 1.5 + 0.5));
    }
  }
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const e = elev[i];
      let [r, g, b] = ramp(e);
      if (e > 0.53) { // land par halki roshni/chhaya (relief)
        const other = elev[((y + 2) % H) * W + ((x + 2) % W)];
        const k = 1 + (e - other) * 6;
        r *= k; g *= k; b *= k;
      }
      img.data[i * 4] = clamp(r);
      img.data[i * 4 + 1] = clamp(g);
      img.data[i * 4 + 2] = clamp(b);
      img.data[i * 4 + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

export function makeCloudTexture() {
  const S = 512;
  const canvas = document.createElement('canvas');
  canvas.width = S; canvas.height = S;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const n = fbm(x / S, y / S, 4, 4, 5, 7);
      const t = Math.max(0, Math.min(1, (n - 0.5) / 0.25));
      const a = t * t * (3 - 2 * t);
      const i = (y * S + x) * 4;
      img.data[i] = 255; img.data[i + 1] = 255; img.data[i + 2] = 255;
      img.data[i + 3] = a * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

export function makeVignetteTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 60, 128, 128, 182);
  g.addColorStop(0, 'rgba(10,40,120,0)');
  g.addColorStop(0.7, 'rgba(15,60,150,0.25)');
  g.addColorStop(1, 'rgba(40,110,230,0.6)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return Texture.from(c);
}

export function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,244,200,0.9)');
  g.addColorStop(1, 'rgba(255,244,200,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return Texture.from(c);
}

let glowTex;
export function getGlowTexture() {
  return (glowTex ??= makeGlowTexture());
}