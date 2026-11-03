import { Sprite, Texture } from 'pixi.js';
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
      if (e > 0.53) { // light/shadow on land (relief)
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

// Shaded clouds: sunlit white tops (light from top-right), blue-grey undersides.
export function makeCloudTexture(seed = 7, octaves = 6) {
  const S = 512;
  const canvas = document.createElement('canvas');
  canvas.width = S; canvas.height = S;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(S, S);
  const n = new Float32Array(S * S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) n[y * S + x] = fbm(x / S, y / S, 4, 4, octaves, seed);
  }
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = y * S + x;
      const v = n[i];
      const t = Math.max(0, Math.min(1, (v - 0.47) / 0.2));
      const a = t * t * (3 - 2 * t);
      if (a <= 0) continue;
      const sun = n[((y - 5 + S) % S) * S + ((x + 5) % S)]; // neighbour towards the sun
      const shade = Math.max(0, Math.min(1, 0.78 + (v - sun) * 7));
      const core = Math.max(0, Math.min(1, (v - 0.62) / 0.18)) * 0.3;
      const k = shade * (1 - core);
      const j = i * 4;
      img.data[j] = lerp(150, 255, k);
      img.data[j + 1] = lerp(168, 255, k);
      img.data[j + 2] = lerp(205, 255, k);
      img.data[j + 3] = a * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

// Soft low fog that drifts just above the ground
export function makeFogTexture() {
  const S = 256;
  const canvas = document.createElement('canvas');
  canvas.width = S; canvas.height = S;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(S, S);
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const v = fbm(x / S, y / S, 2, 2, 4, 31);
      const t = Math.max(0, Math.min(1, (v - 0.38) / 0.35));
      const j = (y * S + x) * 4;
      img.data[j] = 215; img.data[j + 1] = 232; img.data[j + 2] = 255;
      img.data[j + 3] = t * t * (3 - 2 * t) * 0.7 * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(canvas);
}

// Big fluffy cloud puffs that fly past in front of the ship
let puffTexs;
export function getPuffTextures() {
  if (!puffTexs) {
    puffTexs = [];
    for (let v = 0; v < 3; v++) {
      const W = 256, H = 192;
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      const ctx = c.getContext('2d');
      for (let i = 0; i < 16; i++) {
        const cx = W * 0.5 + (Math.random() - 0.5) * W * 0.56;
        const cy = H * 0.55 + (Math.random() - 0.5) * H * 0.3 - Math.abs(cx - W / 2) * 0.12;
        const r = 34 + Math.random() * 30;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, 'rgba(255,255,255,0.95)');
        g.addColorStop(0.6, 'rgba(255,255,255,0.55)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      }
      ctx.globalCompositeOperation = 'source-atop';
      const sh = ctx.createLinearGradient(0, H * 0.2, 0, H * 0.95);
      sh.addColorStop(0, 'rgba(180,200,230,0)');
      sh.addColorStop(1, 'rgba(120,140,185,0.55)');
      ctx.fillStyle = sh;
      ctx.fillRect(0, 0, W, H);
      const hi = ctx.createRadialGradient(W * 0.75, H * 0.2, 0, W * 0.75, H * 0.2, W * 0.6);
      hi.addColorStop(0, 'rgba(255,248,225,0.55)');
      hi.addColorStop(1, 'rgba(255,248,225,0)');
      ctx.fillStyle = hi;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
      puffTexs.push(Texture.from(c));
    }
  }
  return puffTexs;
}

export function makeVignetteTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 60, 128, 128, 182);
  g.addColorStop(0, 'rgba(10,40,120,0)');
  g.addColorStop(0.7, 'rgba(15,60,150,0.12)');
  g.addColorStop(1, 'rgba(40,110,230,0.32)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return Texture.from(c);
}

let glowTex;
export function getGlowTexture() {
  if (!glowTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.45)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    glowTex = Texture.from(c);
  }
  return glowTex;
}

// Soft additive glow blob (tint it with any colour)
export function glowSprite(color, size, alpha = 0.8) {
  const s = new Sprite(getGlowTexture());
  s.anchor.set(0.5);
  s.width = s.height = size;
  s.tint = color;
  s.alpha = alpha;
  s.blendMode = 'add';
  return s;
}

let bulletTex;
export function getBulletTexture() {
  if (!bulletTex) {
    const c = document.createElement('canvas');
    c.width = 16; c.height = 48;
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgba(80,170,255,0.28)';
    ctx.fillRect(1, 0, 14, 48);
    const g = ctx.createLinearGradient(0, 0, 0, 48);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.2, 'rgba(190,240,255,1)');
    g.addColorStop(0.8, 'rgba(70,170,255,0.95)');
    g.addColorStop(1, 'rgba(70,170,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(5, 0, 6, 48);
    bulletTex = Texture.from(c);
  }
  return bulletTex;
}


// 4-point sparkle star with a soft halo (for the "sparkle stars" exhaust)
let starTex;
export function getStarTexture() {
  if (!starTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    g.addColorStop(0, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 - Math.PI / 2;
      const r = i % 2 === 0 ? 30 : 5;
      const x = 32 + Math.cos(a) * r, y = 32 + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    starTex = Texture.from(c);
  }
  return starTex;
}