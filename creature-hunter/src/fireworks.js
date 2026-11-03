import * as THREE from 'three';

/*
  Fireworks:
    const plan = fw.plan(playerPos, creaturePos);   // burst kahan hoga (player ko dikhne layak)
    ... creature plan.center tak udta hai ...
    fw.show(plan);                                  // blast -> "HAPPY DIWALI"
  Text player ki taraf muh karke banta hai, ~7-13m ooncha (zyada upar nahi).
*/

const VS = /* glsl */ `
  attribute float aSize; attribute float aAlpha; attribute vec3 aColor;
  uniform float uScale; varying float vAlpha; varying vec3 vColor;
  void main() {
    vAlpha = aAlpha; vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * uScale / max(-mv.z, 0.1), 200.0);
    gl_Position = projectionMatrix * mv;
  }
`;
const FS = /* glsl */ `
  varying float vAlpha; varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = smoothstep(1.0, 0.0, d) * vAlpha;
    if (a < 0.003) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

const PALETTE = [
  [1, 0.82, 0.25], [1, 0.55, 0.15], [1, 0.3, 0.55],
  [0.35, 0.9, 1], [0.7, 1, 0.4], [1, 0.95, 0.8],
];
const rr = (a, b) => a + Math.random() * (b - a);

const TEXT_W = 480, TEXT_H = 220;
let TEXT_PTS = null;
function textPoints() {
  if (TEXT_PTS) return TEXT_PTS;
  const c = document.createElement('canvas');
  c.width = TEXT_W; c.height = TEXT_H;
  const x = c.getContext('2d');
  x.fillStyle = '#fff';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.font = "900 92px Impact, 'Arial Black', 'Helvetica Neue', Arial, sans-serif";
  x.fillText('HAPPY', TEXT_W / 2, 58);
  x.fillText('DIWALI', TEXT_W / 2, 162);
  const data = x.getImageData(0, 0, TEXT_W, TEXT_H).data;
  const pts = [];
  for (let y = 0; y < TEXT_H; y += 6) {
    for (let xx = 0; xx < TEXT_W; xx += 6) {
      if (data[(y * TEXT_W + xx) * 4 + 3] > 128) pts.push([xx / TEXT_W, y / TEXT_H, y < TEXT_H / 2 ? 0 : 1]);
    }
  }
  while (pts.length > 1000) pts.splice(Math.floor(Math.random() * pts.length), 1);
  TEXT_PTS = pts;
  return pts;
}

const SLOTS = 16;

export class Fireworks {
  constructor(scene, { max = 2400 } = {}) {
    this.max = max;
    this.cursor = 0;
    const f = (n) => new Float32Array(max * n);
    this.pos = f(3); this.vel = f(3); this.tgt = f(3); this.col = f(3);
    this.phase = f(1); this.sizeBase = f(1);
    this.slot = new Int16Array(max).fill(-1);
    this.kind = new Uint8Array(max);
    this.aColor = f(3); this.aSize = f(1); this.aAlpha = f(1);
    for (let i = 0; i < max; i++) this.pos[i * 3 + 1] = -999;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.aColor, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.aSize, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(this.aAlpha, 1).setUsage(THREE.DynamicDrawUsage));
    this.uniforms = { uScale: { value: 300 } };
    this.points = new THREE.Points(geo, new THREE.ShaderMaterial({
      uniforms: this.uniforms, vertexShader: VS, fragmentShader: FS,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    this.points.frustumCulled = false;
    scene.add(this.points);

    this.showTime = new Float32Array(SLOTS);
    this.showActive = new Uint8Array(SLOTS);
    this.showCursor = 0;

    // hamesha scene mein (intensity 0) => shader recompile nahi hota
    this.light = new THREE.PointLight(0xffb060, 0, 70, 2);
    scene.add(this.light);
    this.lightSlot = -1;
    this.lightPos = new THREE.Vector3();
  }

  /* burst ki jagah: player se 14-40m door, ~20 degree upar (6.5m-13m), player ki taraf muh karke */
  plan(P, C) {
    let dx = C.x - P.x, dz = C.z - P.z;
    let dist = Math.hypot(dx, dz);
    if (dist < 0.01) { dx = 0; dz = 1; dist = 1; }
    dx /= dist; dz /= dist;
    const D = THREE.MathUtils.clamp(dist, 14, 40);
    const y = THREE.MathUtils.clamp(1.7 + D * Math.tan(0.35), 6.5, 13);
    return {
      center: new THREE.Vector3(P.x + dx * D, y, P.z + dz * D),
      right: new THREE.Vector3(-dz, 0, dx), // player ke hisaab se daayein
      W: THREE.MathUtils.clamp(D * 0.62, 9, 22),
    };
  }

  show(plan) {
    const slot = this.showCursor;
    this.showCursor = (slot + 1) % SLOTS;
    this.showTime[slot] = 0;
    this.showActive[slot] = 1;
    this.lightSlot = slot;
    this.lightPos.copy(plan.center);

    const pts = textPoints();
    const W = plan.W, H = (W * TEXT_H) / TEXT_W;
    const c = plan.center;
    const spawn = (kind) => {
      const i = this.cursor;
      this.cursor = (i + 1) % this.max;
      this.slot[i] = slot;
      this.kind[i] = kind;
      return i;
    };

    for (const [u, v, line] of pts) {
      const i = spawn(0);
      const k = i * 3;
      this.pos[k] = c.x; this.pos[k + 1] = c.y; this.pos[k + 2] = c.z;
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      const sp = rr(5, 13);
      this.vel[k] = Math.sin(ph) * Math.cos(th) * sp;
      this.vel[k + 1] = Math.cos(ph) * sp;
      this.vel[k + 2] = Math.sin(ph) * Math.sin(th) * sp;
      this.tgt[k] = c.x + plan.right.x * (u - 0.5) * W;
      this.tgt[k + 1] = c.y + (0.5 - v) * H;
      this.tgt[k + 2] = c.z + plan.right.z * (u - 0.5) * W;
      const col = PALETTE[(Math.floor(u * 7) + line * 2) % PALETTE.length];
      this.col[k] = col[0]; this.col[k + 1] = col[1]; this.col[k + 2] = col[2];
      this.phase[i] = Math.random() * 6.28;
      this.sizeBase[i] = W * 0.026 * (0.8 + Math.random() * 0.4);
    }
    // blast ki chamak
    for (let n = 0; n < 3; n++) {
      const i = spawn(1);
      const k = i * 3;
      this.pos[k] = c.x; this.pos[k + 1] = c.y; this.pos[k + 2] = c.z;
      this.sizeBase[i] = W * (0.5 - n * 0.12);
    }
  }

  update(dt, camera) {
    const h = window.innerHeight * Math.min(window.devicePixelRatio || 1, 1.5);
    this.uniforms.uScale.value = h / (2 * Math.tan((camera.fov * Math.PI) / 360));

    for (let s = 0; s < SLOTS; s++) {
      if (!this.showActive[s]) continue;
      this.showTime[s] += dt;
      if (this.showTime[s] > 6.2) this.showActive[s] = 0;
    }

    for (let i = 0; i < this.max; i++) {
      const s = this.slot[i];
      if (s < 0) continue;
      const k = i * 3;
      if (!this.showActive[s]) {
        this.aAlpha[i] = 0; this.aSize[i] = 0; this.pos[k + 1] = -999; this.slot[i] = -1;
        continue;
      }
      const T = this.showTime[s];

      if (this.kind[i] === 1) { // blast flash
        const f = T / 0.3;
        if (f >= 1) { this.aAlpha[i] = 0; this.aSize[i] = 0; this.slot[i] = -1; this.pos[k + 1] = -999; continue; }
        this.aSize[i] = this.sizeBase[i] * (1 + f * 1.5);
        this.aAlpha[i] = 1 - f;
        this.aColor[k] = 1; this.aColor[k + 1] = 0.9; this.aColor[k + 2] = 0.65;
        continue;
      }

      let alpha = 1;
      let bright = 1;
      if (T < 0.65) { // phailna
        const dr = Math.exp(-3.2 * dt);
        this.vel[k] *= dr; this.vel[k + 1] *= dr; this.vel[k + 2] *= dr;
        const w = T / 0.65;
        bright = 1.6 - 0.6 * w;
      } else if (T < 4.4) { // text banana (spring)
        const K = 45, C = 10;
        for (let a = 0; a < 3; a++) {
          this.vel[k + a] += ((this.tgt[k + a] - this.pos[k + a]) * K - this.vel[k + a] * C) * dt;
        }
        bright = 0.8 + 0.2 * Math.sin(T * 18 + this.phase[i]) + 0.25 * Math.min(1, (T - 0.65) / 0.9);
      } else { // gir kar bujhna
        const dr = Math.exp(-0.6 * dt);
        this.vel[k] *= dr; this.vel[k + 1] = this.vel[k + 1] * dr - 5 * dt; this.vel[k + 2] *= dr;
        alpha = THREE.MathUtils.clamp(1 - (T - 4.4) / 1.5, 0, 1);
      }
      this.pos[k] += this.vel[k] * dt;
      this.pos[k + 1] += this.vel[k + 1] * dt;
      this.pos[k + 2] += this.vel[k + 2] * dt;

      this.aColor[k] = Math.min(1.4, this.col[k] * bright);
      this.aColor[k + 1] = Math.min(1.4, this.col[k + 1] * bright);
      this.aColor[k + 2] = Math.min(1.4, this.col[k + 2] * bright);
      this.aSize[i] = this.sizeBase[i];
      this.aAlpha[i] = alpha * 0.9;
    }

    // blast ki roshni
    if (this.lightSlot >= 0 && this.showActive[this.lightSlot]) {
      const T = this.showTime[this.lightSlot];
      const target = T < 0.25 ? 140 : T < 4.4 ? 18 + 6 * Math.sin(T * 9) : 0;
      this.light.position.copy(this.lightPos);
      this.light.intensity = THREE.MathUtils.damp(this.light.intensity, target, 14, dt);
    } else {
      this.light.intensity = THREE.MathUtils.damp(this.light.intensity, 0, 10, dt);
    }

    const a = this.points.geometry.attributes;
    a.position.needsUpdate = a.aColor.needsUpdate = a.aSize.needsUpdate = a.aAlpha.needsUpdate = true;
  }
}