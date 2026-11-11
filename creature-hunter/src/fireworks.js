import * as THREE from 'three';
import { Particles } from './weapon.js';

/*
  Fireworks:
    const plan = fw.plan(playerPos, creaturePos);   // burst kahan hoga (player ko dikhne layak)
    fw.show(plan);                                  // seedha blast -> "HAPPY DIWALI" (creature marne par)
    fw.show(plan, { lines: ['RED', 'WINS!'], palette })   // koi bhi text (1-3 line), font apne aap fit hota hai
    fw.shoot(plan, opts);                           // zameen se skyshot udta hai, phir phatta hai (show opts wahi)
    fw.startCelebration({ winner, name, pos, dir }) // match ke baad: winner ka naam + skyshots
  Text player ki taraf muh karke banta hai, ~7-13m ooncha (zyada upar nahi).
  fw.hooks = { launch(pos) -> {update(pos,k), stop()}, burst(pos) }  => awaaz ke liye (main.js lagata hai)
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
const RED_PAL = [[1, 0.28, 0.3], [1, 0.5, 0.35], [1, 0.8, 0.55], [1, 0.95, 0.85]];
const BLUE_PAL = [[0.3, 0.6, 1], [0.35, 0.85, 1], [0.7, 0.9, 1], [1, 1, 1]];
const GOLD = [1, 0.85, 0.4];
const EMBER = [1, 0.35, 0.05];
const rr = (a, b) => a + Math.random() * (b - a);
const _v = new THREE.Vector3();
const _c = new THREE.Vector3();

/* ---------- text => points (1-3 line, font apne aap fit) ---------- */
const TEXT_W = 480, TEXT_H = 220;
const TEXT_CACHE = new Map();
function textPoints(lines) {
  const key = lines.join('|');
  if (TEXT_CACHE.has(key)) return TEXT_CACHE.get(key);
  const rows = lines.slice(0, 3);
  const n = rows.length;
  const c = document.createElement('canvas');
  c.width = TEXT_W; c.height = TEXT_H;
  const x = c.getContext('2d');
  x.fillStyle = '#fff';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const font = (s) => `900 ${s}px Impact, 'Arial Black', 'Helvetica Neue', Arial, sans-serif`;
  const maxSize = n === 1 ? 130 : n === 2 ? 92 : 66;
  x.font = font(maxSize);
  let size = maxSize;
  for (const t of rows) size = Math.min(size, (maxSize * TEXT_W * 0.94) / Math.max(1, x.measureText(t).width));
  x.font = font(size);
  rows.forEach((t, i) => x.fillText(t, TEXT_W / 2, (TEXT_H / n) * (i + 0.5)));
  const data = x.getImageData(0, 0, TEXT_W, TEXT_H).data;
  const pts = [];
  for (let y = 0; y < TEXT_H; y += 6) {
    for (let xx = 0; xx < TEXT_W; xx += 6) {
      if (data[(y * TEXT_W + xx) * 4 + 3] > 128) pts.push([xx / TEXT_W, y / TEXT_H, Math.min(n - 1, Math.floor(y / (TEXT_H / n)))]);
    }
  }
  while (pts.length > 1000) pts.splice(Math.floor(Math.random() * pts.length), 1);
  TEXT_CACHE.set(key, pts);
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
    this.kind = new Uint8Array(max); // 0 text, 1 flash, 2 saada burst
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

    // skyshot ka udta raasta (chingaariyan)
    this.trail = new Particles(320, true);
    scene.add(this.trail.points);
    this.rockets = [];
    this.celeb = null;
    this.hooks = { launch: null, burst: null };

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

  /* zameen se udta hai, phir phatta hai */
  shoot(plan, opts = {}) {
    const c = plan.center;
    const a = new THREE.Vector3(c.x + rr(-1.5, 1.5), 0.2, c.z + rr(-1.5, 1.5));
    const r = { t: 0, dur: 0.9 + c.y * 0.02, a, b: c.clone(), pos: a.clone(), plan, opts, snd: null };
    if (this.hooks.launch) r.snd = this.hooks.launch(a);
    this.rockets.push(r);
  }

  /* match ke baad: winner ka naam (teen baar) + beech mein skyshots */
  startCelebration({ winner, name, pos, dir, seconds = 30 }) {
    const pal = winner === 'blue' ? BLUE_PAL : winner === 'red' ? RED_PAL : PALETTE;
    const team = winner === 'blue' ? 'BLUE' : winner === 'red' ? 'RED' : null;
    const win = name ? [String(name).toUpperCase().slice(0, 12), 'WINS!'] : team ? [team, 'WINS!'] : ['DRAW'];
    const ev = [
      { at: 0.8, text: true, lines: win, pal },
      { at: 10.5, text: true, lines: ['HAPPY', 'DIWALI'], pal: PALETTE },
      { at: 20, text: true, lines: win, pal },
    ];
    for (let t = 2.4; t < seconds - 2; t += 1.5) {
      if (ev.some((e) => e.text && Math.abs(e.at - t) < 1.4)) continue;
      ev.push({ at: t, text: false, pal: Math.random() < 0.6 ? pal : PALETTE });
    }
    ev.sort((x, y) => x.at - y.at);
    this.celeb = { t: 0, i: 0, ev, seconds, pos, dir };
  }

  _celebShot(cb, e) {
    const P = cb.pos;
    let fx = cb.dir.x, fz = cb.dir.z;
    const l = Math.hypot(fx, fz);
    if (l < 0.001) { fx = 0; fz = 1; } else { fx /= l; fz /= l; }
    const ang = e.text ? rr(-0.2, 0.2) : rr(-1.2, 1.2);
    const D = e.text ? rr(24, 30) : rr(14, 38);
    const ca = Math.cos(ang), sa = Math.sin(ang);
    _c.set(P.x + (fx * ca - fz * sa) * D, 0, P.z + (fx * sa + fz * ca) * D);
    const plan = this.plan(P, _c);
    this.shoot(plan, e.text ? { lines: e.lines, palette: e.pal } : { plain: true, palette: e.pal });
  }

  show(plan, opts = {}) {
    const slot = this.showCursor;
    this.showCursor = (slot + 1) % SLOTS;
    this.showTime[slot] = 0;
    this.showActive[slot] = 1;
    this.lightSlot = slot;
    this.lightPos.copy(plan.center);
    if (this.hooks.burst) this.hooks.burst(plan.center);

    const pal = opts.palette || PALETTE;
    const W = plan.W, H = (W * TEXT_H) / TEXT_W;
    const c = plan.center;
    const spawn = (kind) => {
      const i = this.cursor;
      this.cursor = (i + 1) % this.max;
      this.slot[i] = slot;
      this.kind[i] = kind;
      return i;
    };

    if (opts.plain) { // saada phoolon wala burst
      for (let n = 0; n < 130; n++) {
        const i = spawn(2);
        const k = i * 3;
        this.pos[k] = c.x; this.pos[k + 1] = c.y; this.pos[k + 2] = c.z;
        const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
        const sp = rr(6, 13);
        this.vel[k] = Math.sin(ph) * Math.cos(th) * sp;
        this.vel[k + 1] = Math.cos(ph) * sp;
        this.vel[k + 2] = Math.sin(ph) * Math.sin(th) * sp;
        const col = pal[Math.floor(Math.random() * pal.length)];
        this.col[k] = col[0]; this.col[k + 1] = col[1]; this.col[k + 2] = col[2];
        this.phase[i] = Math.random() * 6.28;
        this.sizeBase[i] = W * 0.018 * (0.8 + Math.random() * 0.4);
      }
      for (let n = 0; n < 2; n++) { // chhoti chamak (celebration mein baar baar hota hai, isliye halki)
        const i = spawn(1);
        const k = i * 3;
        this.pos[k] = c.x; this.pos[k + 1] = c.y; this.pos[k + 2] = c.z;
        this.sizeBase[i] = W * (0.22 - n * 0.07);
      }
      return;
    }

    const pts = textPoints(opts.lines || ['HAPPY', 'DIWALI']);
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
      const col = pal[(Math.floor(u * 7) + line * 2) % pal.length];
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
    const scale = h / (2 * Math.tan((camera.fov * Math.PI) / 360));
    this.uniforms.uScale.value = scale;
    this.trail.uniforms.uScale.value = scale;

    // celebration ka schedule
    const cb = this.celeb;
    if (cb) {
      cb.t += dt;
      while (cb.i < cb.ev.length && cb.ev[cb.i].at <= cb.t) this._celebShot(cb, cb.ev[cb.i++]);
      if (cb.t >= cb.seconds) this.celeb = null;
    }

    // udte skyshot
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.t += dt;
      const u = Math.min(1, r.t / r.dur);
      r.pos.lerpVectors(r.a, r.b, 1 - (1 - u) * (1 - u)); // upar jaate jaate dheema
      for (let n = 0; n < 3; n++) {
        _v.set(rr(-0.4, 0.4), rr(-1.5, -0.3), rr(-0.4, 0.4));
        this.trail.emit(r.pos, _v, rr(0.3, 0.6), rr(0.16, 0.26), -0.5, GOLD, EMBER, 0.9, 1.2, 2);
      }
      if (r.snd) r.snd.update(r.pos, 1);
      if (u >= 1) {
        if (r.snd) r.snd.stop();
        this.show(r.plan, r.opts);
        this.rockets.splice(i, 1);
      }
    }
    this.trail.update(dt);

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

      if (this.kind[i] === 2) { // saada burst: phailo, jhilmilao, girte hue bujho
        const f = T / 2.0;
        if (f >= 1) { this.aAlpha[i] = 0; this.aSize[i] = 0; this.slot[i] = -1; this.pos[k + 1] = -999; continue; }
        const dr = Math.exp(-1.7 * dt);
        this.vel[k] *= dr; this.vel[k + 1] = this.vel[k + 1] * dr - 4.5 * dt; this.vel[k + 2] *= dr;
        this.pos[k] += this.vel[k] * dt;
        this.pos[k + 1] += this.vel[k + 1] * dt;
        this.pos[k + 2] += this.vel[k + 2] * dt;
        const b = (1.2 - 0.4 * f) * (0.8 + 0.3 * Math.sin(T * 25 + this.phase[i]));
        this.aColor[k] = Math.min(1.4, this.col[k] * b);
        this.aColor[k + 1] = Math.min(1.4, this.col[k + 1] * b);
        this.aColor[k + 2] = Math.min(1.4, this.col[k + 2] * b);
        this.aSize[i] = this.sizeBase[i];
        this.aAlpha[i] = (1 - f) * 0.9;
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