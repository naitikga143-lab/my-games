import * as THREE from 'three';
import { getSfx } from './sfx.js';

const { clamp, damp } = THREE.MathUtils;
const UP = new THREE.Vector3(0, 1, 0);
const _v = new THREE.Vector3();
const _w = new THREE.Vector3();
const _col = new THREE.Color();
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const ease = (t) => t * t * (3 - 2 * t);
const easeOut = (t) => 1 - (1 - t) * (1 - t);

/* ====================== TUNING (yahan se balance karo) ====================== */
export const CRACKER = {
  MAX_ACTIVE: 4,       // ek saath zyada se zyada itne crackers
  GLOBAL_GAP: 1.6,     // do throws ke beech kam se kam gap (sab creatures mila ke)
  GRAVITY: 14,
  DMG: { anar: 5, chakri: 5, rocket: 8, bomb: 10 },
  ANAR_LIFE: 2.6,
  CHAKRI_LIFE: 3.2,
  CHAKRI_SPEED: 1.5,   // chakri player ki taraf sarakti hai
  ROCKET_SPEED: 12,
  BOMB_FUSE: 1.5,      // girne ke baad phatne tak
  BOMB_RADIUS: 3.2,
};

const WING_COLORS = [0xffb347, 0x7fd6ff, 0xff8fd8, 0xb6ff7a, 0xffe066];
const STAR_COLORS = [0x7df9ff, 0xffe45c, 0xff7bd5, 0x9dff6a, 0xffa94d, 0xc19bff];

function lobVel(from, to, T, out) {
  const g = CRACKER.GRAVITY;
  return out.set((to.x - from.x) / T, (to.y - from.y + 0.5 * g * T * T) / T, (to.z - from.z) / T);
}

/* ====================== textures (canvas se, koi image file nahi) ====================== */
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function starTexture() {
  return canvasTex(64, 64, (g) => {
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,0.55)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    g.fillStyle = '#fff';
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const r = i % 2 ? 11 : 27;
      g.lineTo(32 + Math.cos(a) * r, 32 + Math.sin(a) * r);
    }
    g.closePath();
    g.fill();
  });
}

// "शुभ" + swastik (haath se bana) + "लाभ"
function emblemTexture() {
  return canvasTex(128, 384, (g) => {
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.shadowColor = '#ff9a00';
    g.shadowBlur = 14;
    g.fillStyle = '#ffd24a';
    g.strokeStyle = '#ffd24a';
    g.font = "bold 78px 'Noto Sans Devanagari','Nirmala UI','Mangal',sans-serif";
    g.fillText('शुभ', 64, 66);
    g.fillText('लाभ', 64, 318);
    g.lineWidth = 13;
    g.lineCap = 'butt';
    g.beginPath();
    g.moveTo(64, 148); g.lineTo(64, 236);
    g.moveTo(20, 192); g.lineTo(108, 192);
    g.moveTo(64, 148); g.lineTo(90, 148);
    g.moveTo(108, 192); g.lineTo(108, 218);
    g.moveTo(64, 236); g.lineTo(38, 236);
    g.moveTo(20, 192); g.lineTo(20, 166);
    g.stroke();
  });
}

// Skull: canvas par detail wala skull banake uske pixels sample karte hain
// (cranium, aankhon ke gaddhe, naak, gaal ke gaddhe, jabda aur daant). Kinare zyada points => outline saaf.
let SKULL = null;
function skullData() {
  if (SKULL) return SKULL;
  const S = 128;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const rrect = (x, y, w, h, r) => {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  };
  const ell = (cx, cy, rx, ry, rot = 0) => { g.beginPath(); g.ellipse(cx, cy, rx, ry, rot, 0, Math.PI * 2); };

  g.fillStyle = '#000'; g.fillRect(0, 0, S, S);
  g.fillStyle = '#fff';
  ell(64, 52, 39, 37); g.fill();            // cranium
  rrect(38, 72, 52, 30, 12); g.fill();      // gaal + upar ka jabda
  rrect(46, 98, 36, 19, 8); g.fill();       // neeche ka jabda
  g.fillStyle = '#000';
  ell(48, 62, 11, 13, -0.15); g.fill();     // aankhon ke gaddhe
  ell(80, 62, 11, 13, 0.15); g.fill();
  g.beginPath(); g.moveTo(64, 74); g.lineTo(57, 90); g.lineTo(64, 86); g.lineTo(71, 90); g.closePath(); g.fill(); // naak
  ell(41, 86, 3.5, 7); g.fill();            // gaal ke gaddhe
  ell(87, 86, 3.5, 7); g.fill();
  for (const x of [55, 59.5, 64, 68.5, 73]) g.fillRect(x - 0.75, 100, 1.5, 14); // daant
  g.fillRect(50, 105.2, 28, 1.6);

  const d = g.getImageData(0, 0, S, S).data;
  const lit = (x, y) => x >= 0 && y >= 0 && x < S && y < S && d[(y * S + x) * 4] > 128;
  const edges = [], inner = [];
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      if (!lit(x, y)) continue;
      const e = !lit(x + 1, y) || !lit(x - 1, y) || !lit(x, y + 1) || !lit(x, y - 1);
      (e ? edges : inner).push([x, y]);
    }
  }
  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  };
  shuffle(edges); shuffle(inner);

  const NE = 200, NI = 140, NEYE = 22;
  const n = NE + NI + NEYE;
  const uv = new Float32Array(n * 2);
  const kind = new Uint8Array(n);   // 0 andar, 1 kinara, 2 aankh
  const jaw = new Uint8Array(n);    // 1 = neeche ka jabda (hilta hai)
  const dz = new Float32Array(n);   // thodi gehrai (gumbad jaisa)
  const put = (i, x, y, k) => {
    const u = (x - 64) / 64, v = (64 - y) / 64;
    uv[i * 2] = u; uv[i * 2 + 1] = v;
    kind[i] = k;
    jaw[i] = k !== 2 && y > 98 ? 1 : 0;
    dz[i] = k === 2 ? -0.05 : 0.45 * Math.max(0, 1 - (u * u * 1.6 + (v - 0.2) * (v - 0.2) * 1.1));
  };
  for (let i = 0; i < NE; i++) { const p = edges[i % edges.length]; put(i, p[0], p[1], 1); }
  for (let i = 0; i < NI; i++) { const p = inner[i % inner.length]; put(NE + i, p[0], p[1], 0); }
  for (let i = 0; i < NEYE; i++) {
    const L = i % 2 === 0;
    const cx = L ? 48 : 80, cy = 62, a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * 0.7;
    put(NE + NI + i, cx + 11 * r * Math.cos(a), cy + 13 * r * Math.sin(a), 2);
  }
  SKULL = { n, uv, kind, jaw, dz };
  return SKULL;
}

// naram gol bindu (square points ki jagah)
function dotTexture() {
  return canvasTex(32, 32, (g) => {
    const grd = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.45, 'rgba(255,255,255,0.7)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 32, 32);
  });
}

/* ====================== chingaari pool (ek hi draw call) ====================== */
class Sparks {
  constructor(scene, n, size) {
    this.n = n;
    this.pos = new Float32Array(n * 3);
    this.col = new Float32Array(n * 3);
    this.base = new Float32Array(n * 3);
    this.vel = new Float32Array(n * 3);
    this.life = new Float32Array(n);
    this.max = new Float32Array(n);
    this.grav = new Float32Array(n);
    for (let i = 0; i < n; i++) this.pos[i * 3 + 1] = -999;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    this.points = new THREE.Points(g, new THREE.PointsMaterial({
      size, vertexColors: true, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, toneMapped: false,
    }));
    this.points.frustumCulled = false;
    this.cur = 0;
    scene.add(this.points);
  }

  emit(x, y, z, vx, vy, vz, r, g, b, life, grav = 8) {
    const i = this.cur;
    this.cur = (i + 1) % this.n;
    const k = i * 3;
    this.pos[k] = x; this.pos[k + 1] = y; this.pos[k + 2] = z;
    this.vel[k] = vx; this.vel[k + 1] = vy; this.vel[k + 2] = vz;
    this.base[k] = r; this.base[k + 1] = g; this.base[k + 2] = b;
    this.life[i] = this.max[i] = life;
    this.grav[i] = grav;
  }

  burst(c, count, speedMin, speedMax, life, colors, grav = 7) {
    for (let i = 0; i < count; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const sp = rnd(speedMin, speedMax);
      _col.setHex(pick(colors));
      this.emit(c.x, c.y, c.z,
        Math.sin(ph) * Math.cos(th) * sp, Math.cos(ph) * sp, Math.sin(ph) * Math.sin(th) * sp,
        _col.r, _col.g, _col.b, rnd(life * 0.6, life), grav);
    }
  }

  update(dt) {
    const { pos, col, base, vel, life, max, grav } = this;
    for (let i = 0; i < this.n; i++) {
      if (life[i] <= 0) continue;
      const k = i * 3;
      life[i] -= dt;
      if (life[i] <= 0) {
        col[k] = col[k + 1] = col[k + 2] = 0;
        pos[k + 1] = -999;
        continue;
      }
      vel[k + 1] -= grav[i] * dt;
      pos[k] += vel[k] * dt;
      pos[k + 1] += vel[k + 1] * dt;
      pos[k + 2] += vel[k + 2] * dt;
      const t = life[i] / max[i];
      col[k] = base[k] * t; col[k + 1] = base[k + 1] * t; col[k + 2] = base[k + 2] * t;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.color.needsUpdate = true;
  }
}

/* ====================== 1. ANAAR + titliyan ====================== */
class Anar {
  constructor(sys) {
    this.sys = sys;
    this.kind = 'anar';
    this.active = false;
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.mesh = new THREE.Mesh(sys.geo.can, sys.mat.anar);
    this.mesh.visible = false;
    sys.scene.add(this.mesh);
    this.bMat = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide, transparent: true, opacity: 0, depthWrite: false, toneMapped: false,
    });
    this.flies = [];
    for (let i = 0; i < 6; i++) {
      const g = new THREE.Group();
      const wl = new THREE.Mesh(sys.geo.wing, this.bMat);
      const wr = new THREE.Mesh(sys.geo.wing, this.bMat);
      wr.scale.x = -1;
      g.add(wl, wr);
      g.visible = false;
      sys.scene.add(g);
      this.flies.push({
        g, wl, wr, ph: Math.random() * 6.28, ang: Math.random() * 6.28,
        rad: rnd(0.7, 1.6), h: rnd(0.6, 2.2), spd: rnd(0.8, 1.6),
      });
    }
  }

  spawn(from, target) {
    const s = this.sys;
    const d = Math.hypot(target.x - from.x, target.z - from.z);
    const T = clamp(d / 13, 0.7, 1.7);
    const a = Math.random() * Math.PI * 2, r = rnd(0.6, 1.8);
    _v.set(target.x + s.pvel.x * T * 0.6 + Math.cos(a) * r, 0.2, target.z + s.pvel.z * T * 0.6 + Math.sin(a) * r);
    lobVel(from, _v, T, this.vel);
    this.pos.copy(from);
    this.mesh.position.copy(from);
    this.mesh.visible = true;
    this.bMat.color.setHex(pick(WING_COLORS));
    this.bMat.opacity = 0;
    this.state = 'fly'; this.t = 0; this.acc = 0; this.hit = false;
    this.active = true;
  }

  stop() {
    this.active = false;
    this.mesh.visible = false;
    this.bMat.opacity = 0;
    for (const f of this.flies) f.g.visible = false;
    if (this.snd) { this.snd.stop(); this.snd = null; }
  }

  update(dt, time) {
    const s = this.sys, sp = s.sparks, pos = this.pos;
    this.t += dt;

    if (this.state === 'fly') {
      this.vel.y -= CRACKER.GRAVITY * dt;
      pos.addScaledVector(this.vel, dt);
      this.mesh.position.copy(pos);
      this.mesh.rotation.x += dt * 9;
      this.mesh.rotation.z += dt * 6;
      sp.emit(pos.x, pos.y, pos.z, rnd(-0.4, 0.4), rnd(0.2, 0.8), rnd(-0.4, 0.4), 1, 0.6, 0.15, 0.3, 3);
      if (this.vel.y < 0 && pos.y <= 0.2) {
        pos.y = 0.2;
        this.mesh.position.copy(pos);
        this.mesh.rotation.set(0, 0, 0);
        s.sfx.thud(pos, 0.4);
        s.sfx.fuse(pos);
        this.state = 'wait'; this.t = 0;
      }
      return;
    }

    if (this.state === 'wait') {
      // jalne se pehle halki chingaari (player ko pata chale)
      sp.emit(pos.x, pos.y + 0.25, pos.z, rnd(-0.5, 0.5), rnd(1, 2), rnd(-0.5, 0.5), 1, 0.7, 0.2, 0.3, 4);
      if (this.t > 0.35) { this.state = 'burn'; this.t = 0; this.snd = s.sfx.anarLoop(pos); }
      return;
    }

    // burn: fountain
    const L = CRACKER.ANAR_LIFE;
    const k = clamp(this.t / 0.2, 0, 1) * clamp((L - this.t) / 0.8, 0, 1);
    if (this.snd) this.snd.update(pos, k);
    this.acc += dt * 60 * k;
    while (this.acc >= 1) {
      this.acc -= 1;
      const a = Math.random() * Math.PI * 2;
      const hv = Math.random() * 1.7;
      const white = Math.random() < 0.15;
      sp.emit(pos.x, pos.y + 0.22, pos.z, Math.cos(a) * hv, rnd(4.3, 6.4), Math.sin(a) * hv,
        1, white ? 0.95 : rnd(0.55, 0.85), white ? 0.7 : rnd(0.1, 0.35), rnd(0.7, 1.1), 8);
    }

    // titliyan: anaar ke saath hi aati aur fade hoti hain
    this.bMat.opacity = k * 0.95;
    for (const f of this.flies) {
      f.g.visible = k > 0.03;
      f.ang += f.spd * dt;
      f.g.position.set(
        pos.x + Math.cos(f.ang) * f.rad,
        pos.y + 0.4 + f.h + Math.sin(time * 2.3 + f.ph) * 0.25,
        pos.z + Math.sin(f.ang) * f.rad
      );
      f.g.rotation.y = -f.ang;
      const fl = Math.sin(time * 16 + f.ph) * 0.9;
      f.wl.rotation.y = fl;
      f.wr.rotation.y = -fl;
    }

    if (!this.hit && k > 0.25) {
      const p = s.player;
      if (Math.hypot(p.x - pos.x, p.z - pos.z) < 1.3 && p.y < 2.6) {
        this.hit = true;
        s.hurt(CRACKER.DMG.anar, 'anar');
      }
    }
    if (this.t >= L) this.stop();
  }
}

/* ====================== 2. CHAKRI + shubh / swastik / laabh ====================== */
class Chakri {
  constructor(sys) {
    this.sys = sys;
    this.kind = 'chakri';
    this.active = false;
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.mesh = new THREE.Mesh(sys.geo.disc, sys.mat.chakri);
    this.mesh.visible = false;
    sys.scene.add(this.mesh);

    this.M = 96;
    this.ph = new Float32Array(this.M);
    for (let i = 0; i < this.M; i++) this.ph[i] = Math.random() * 6.28;
    this.fp = new Float32Array(this.M * 3);
    this.fc = new Float32Array(this.M * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.fp, 3));
    g.setAttribute('color', new THREE.BufferAttribute(this.fc, 3));
    this.funnel = new THREE.Points(g, new THREE.PointsMaterial({
      size: 0.14, vertexColors: true, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, toneMapped: false,
    }));
    this.funnel.frustumCulled = false;
    this.funnel.visible = false;
    sys.scene.add(this.funnel);
  }

  spawn(from, target) {
    const s = this.sys;
    const d = Math.hypot(target.x - from.x, target.z - from.z);
    const T = clamp(d / 13, 0.7, 1.7);
    const a = Math.random() * Math.PI * 2, r = rnd(1.8, 3.2);
    _v.set(target.x + s.pvel.x * T * 0.5 + Math.cos(a) * r, 0.05, target.z + s.pvel.z * T * 0.5 + Math.sin(a) * r);
    lobVel(from, _v, T, this.vel);
    this.pos.copy(from);
    this.mesh.position.copy(from);
    this.mesh.visible = true;
    this.state = 'fly'; this.t = 0; this.acc = 0; this.hit = false; this.emb = false;
    this.active = true;
  }

  stop() {
    this.active = false;
    this.mesh.visible = false;
    this.funnel.visible = false;
    if (this.snd) { this.snd.stop(); this.snd = null; }
  }

  update(dt) {
    const s = this.sys, sp = s.sparks, pos = this.pos;
    this.t += dt;

    if (this.state === 'fly') {
      this.vel.y -= CRACKER.GRAVITY * dt;
      pos.addScaledVector(this.vel, dt);
      this.mesh.position.copy(pos);
      this.mesh.rotation.y += dt * 20;
      sp.emit(pos.x, pos.y, pos.z, rnd(-0.4, 0.4), rnd(0.2, 0.8), rnd(-0.4, 0.4), 1, 0.45, 0.1, 0.3, 3);
      if (this.vel.y < 0 && pos.y <= 0.05) {
        pos.y = 0.05;
        this.state = 'spin'; this.t = 0;
        this.funnel.visible = true;
        s.sfx.thud(pos, 0.4);
        this.snd = s.sfx.chakriLoop(pos);
      }
      return;
    }

    const L = CRACKER.CHAKRI_LIFE;
    const t = this.t;
    const k = clamp(t / 0.25, 0, 1) * clamp((L - t) / 0.7, 0, 1);

    // player ki taraf sarakti hai
    if (t > 0.4) {
      const p = s.player;
      const dx = p.x - pos.x, dz = p.z - pos.z;
      const d = Math.hypot(dx, dz);
      if (d > 0.3) {
        pos.x += (dx / d) * CRACKER.CHAKRI_SPEED * dt;
        pos.z += (dz / d) * CRACKER.CHAKRI_SPEED * dt;
      }
    }
    this.mesh.position.copy(pos);
    this.mesh.rotation.y += dt * 16;
    if (this.snd) this.snd.update(pos, k);

    // chakri: zameen par ghoomta hua gol spiral (4 arms), chingaari side mein bahar jaati hai
    for (let i = 0; i < this.M; i++) {
      const u = (i / this.M + t * 1.3) % 1;       // 0 = chakri ke paas, 1 = sabse door
      const arm = (i % 4) * (Math.PI / 2);
      const th = arm + t * 14 - u * 6;            // peeche ki taraf mudta spiral
      const r = 0.22 + u * 1.5;
      const j = i * 3;
      this.fp[j] = pos.x + Math.cos(th) * r;
      this.fp[j + 1] = pos.y + 0.1 + Math.sin(u * Math.PI) * 0.22;
      this.fp[j + 2] = pos.z + Math.sin(th) * r;
      const f = (1 - u * u) * k;
      this.fc[j] = f; this.fc[j + 1] = f * (0.5 + 0.3 * (1 - u)); this.fc[j + 2] = f * 0.12;
    }
    this.funnel.geometry.attributes.position.needsUpdate = true;
    this.funnel.geometry.attributes.color.needsUpdate = true;

    // kuch tez chingaariyan tangent direction mein (upar nahi, side mein)
    this.acc += dt * 30 * k;
    while (this.acc >= 1) {
      this.acc -= 1;
      const a = t * 14 + Math.floor(Math.random() * 4) * (Math.PI / 2);
      sp.emit(pos.x + Math.cos(a) * 0.25, pos.y + 0.12, pos.z + Math.sin(a) * 0.25,
        Math.cos(a - 0.9) * 3.2, rnd(0.2, 0.7), Math.sin(a - 0.9) * 3.2, 1, 0.6, 0.15, 0.45, 5);
    }

    // funnel ke center se shubh + swastik + laabh nikalta hai
    if (!this.emb && t > 0.7) {
      this.emb = true;
      s.emblems.spawn(pos.x, pos.z);
    }

    if (!this.hit && k > 0.3) {
      const p = s.player;
      if (Math.hypot(p.x - pos.x, p.z - pos.z) < 1.35 && p.y < 0.8) {
        this.hit = true;
        s.hurt(CRACKER.DMG.chakri, 'chakri');
      }
    }
    if (t >= L) this.stop();
  }
}

/* ====================== 3. ROCKET + taare ====================== */
class Rocket {
  constructor(sys) {
    this.sys = sys;
    this.kind = 'rocket';
    this.active = false;
    this.pos = new THREE.Vector3();
    this.dir = new THREE.Vector3();
    this.mesh = new THREE.Group();
    const body = new THREE.Mesh(sys.geo.rBody, sys.mat.rocket);
    const nose = new THREE.Mesh(sys.geo.rNose, sys.mat.rocketTip);
    nose.position.y = 0.23;
    this.mesh.add(body, nose);
    this.mesh.visible = false;
    sys.scene.add(this.mesh);
  }

  spawn(from, target) {
    const s = this.sys;
    _v.set(target.x, target.y + 0.95, target.z);
    const tf = _v.distanceTo(from) / CRACKER.ROCKET_SPEED;
    // aadha lead: seedha bhaagne wale ko lag sakta hai, side hatne wala bach jaata hai
    _v.x += s.pvel.x * tf * 0.5;
    _v.z += s.pvel.z * tf * 0.5;
    this.dir.copy(_v).sub(from);
    this.left = this.dir.length() + 0.6;
    this.dir.normalize();
    this.pos.copy(from);
    this.mesh.position.copy(from);
    this.mesh.quaternion.setFromUnitVectors(UP, this.dir);
    this.mesh.visible = true;
    this.acc = 0;
    this.active = true;
    this.snd = s.sfx.rocketFly(from);
  }

  stop() {
    this.active = false;
    this.mesh.visible = false;
    if (this.snd) { this.snd.stop(); this.snd = null; }
  }

  update(dt) {
    const s = this.sys, pos = this.pos;
    const step = CRACKER.ROCKET_SPEED * dt;
    pos.addScaledVector(this.dir, step);
    this.left -= step;
    this.mesh.position.copy(pos);
    if (this.snd) this.snd.update(pos, 1);

    this.acc += dt * 90;
    while (this.acc >= 1) {
      this.acc -= 1;
      s.sparks.emit(pos.x - this.dir.x * 0.25, pos.y - this.dir.y * 0.25, pos.z - this.dir.z * 0.25,
        rnd(-0.5, 0.5), rnd(-0.3, 0.5), rnd(-0.5, 0.5), 1, 0.65, 0.2, 0.35, 3);
    }

    _w.set(s.player.x, s.player.y + 0.95, s.player.z);
    if (pos.distanceToSquared(_w) < 0.85 * 0.85) {
      s.hurt(CRACKER.DMG.rocket, 'rocket');
      this.explode();
      return;
    }
    if (this.left <= 0 || pos.y < 0.1) this.explode();
  }

  explode() {
    const s = this.sys, pos = this.pos;
    s.sparks.burst(pos, 28, 2, 6, 0.8, STAR_COLORS, 6);
    _v.set(pos.x, Math.max(pos.y, 0.6) + 1.0, pos.z);
    s.stars.spawn(_v);
    s.addShake(pos, 0.2);
    s.sfx.rocketBang(pos);
    this.stop();
  }
}

/* ====================== 4. BOMB + laal skull ====================== */
class Bomb {
  constructor(sys) {
    this.sys = sys;
    this.kind = 'bomb';
    this.active = false;
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.land = new THREE.Vector3();
    this.mat = new THREE.MeshBasicMaterial({ color: 0x222222 });
    this.mesh = new THREE.Mesh(sys.geo.bomb, this.mat);
    this.mesh.visible = false;
    sys.scene.add(this.mesh);

    const mk = (geo, op) => new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color: 0xff2a1a, transparent: true, opacity: op, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
    }));
    this.ring = mk(sys.geo.ring, 0.7);
    this.disc = mk(sys.geo.zone, 0.12);
    this.zone = new THREE.Group();
    this.zone.add(this.ring, this.disc);
    this.zone.visible = false;
    sys.scene.add(this.zone);
  }

  spawn(from, target) {
    const s = this.sys;
    const d = Math.hypot(target.x - from.x, target.z - from.z);
    const T = clamp(d / 13, 0.8, 1.6);
    const a = Math.random() * Math.PI * 2, r = Math.random();
    this.land.set(target.x + s.pvel.x * T * 0.5 + Math.cos(a) * r, 0.26, target.z + s.pvel.z * T * 0.5 + Math.sin(a) * r);
    lobVel(from, this.land, T, this.vel);
    this.pos.copy(from);
    this.mesh.position.copy(from);
    this.mesh.visible = true;
    this.mat.color.setHex(0x222222);
    // blast ka circle pehle se dikhta hai => bachne ka mauka
    this.zone.position.set(this.land.x, 0.06, this.land.z);
    this.zone.scale.setScalar(CRACKER.BOMB_RADIUS);
    this.ring.material.opacity = 0.7;
    this.disc.material.opacity = 0.12;
    this.disc.visible = true;
    this.zone.visible = true;
    this.state = 'fly'; this.t = 0; this.life = 0;
    this.active = true;
  }

  stop() {
    this.active = false;
    this.mesh.visible = false;
    this.zone.visible = false;
    if (this.snd) { this.snd.stop(); this.snd = null; }
  }

  update(dt) {
    const s = this.sys, pos = this.pos;
    this.t += dt;

    if (this.state === 'boom') {
      const u = clamp(this.t / 0.35, 0, 1);
      this.zone.scale.setScalar(CRACKER.BOMB_RADIUS * (0.4 + 0.8 * easeOut(u)));
      this.ring.material.opacity = (1 - u) * 0.8;
      if (u >= 1) this.stop();
      return;
    }

    this.life += dt;
    const total = CRACKER.BOMB_FUSE + 1.0;
    const rate = 6 + (this.life / total) * 22;
    const pulse = 0.5 + 0.5 * Math.sin(this.life * rate);
    this.ring.material.opacity = 0.35 + 0.45 * pulse;
    this.disc.material.opacity = 0.06 + 0.12 * pulse;

    if (this.state === 'fly') {
      this.vel.y -= CRACKER.GRAVITY * dt;
      pos.addScaledVector(this.vel, dt);
      this.mesh.position.copy(pos);
      this.mesh.rotation.x += dt * 5;
      s.sparks.emit(pos.x, pos.y + 0.3, pos.z, rnd(-0.4, 0.4), rnd(0.4, 1), rnd(-0.4, 0.4), 1, 0.5, 0.1, 0.3, 3);
      if (this.vel.y < 0 && pos.y <= 0.26) {
        pos.y = 0.26;
        this.mesh.position.copy(pos);
        this.mesh.rotation.set(0, 0, 0);
        s.sfx.thud(pos, 1);
        this.snd = s.sfx.bombFuse(pos);
        this.state = 'fuse'; this.t = 0;
      }
      return;
    }

    // fuse jal rahi hai, bomb laal blink karta hai
    this.mat.color.setHex(Math.sin(this.t * (8 + this.t * 14)) > 0 ? 0xff2a1a : 0x222222);
    s.sparks.emit(pos.x, pos.y + 0.32, pos.z, rnd(-0.6, 0.6), rnd(1, 2.4), rnd(-0.6, 0.6), 1, 0.7, 0.2, 0.35, 5);
    if (this.snd) this.snd.update(pos, 1, this.t / CRACKER.BOMB_FUSE);
    if (this.t >= CRACKER.BOMB_FUSE) this.explode();
  }

  explode() {
    const s = this.sys, pos = this.pos;
    const p = s.player;
    if (Math.hypot(p.x - pos.x, p.z - pos.z) < CRACKER.BOMB_RADIUS && p.y < 2.6) s.hurt(CRACKER.DMG.bomb, 'bomb');
    s.sparks.burst(pos, 46, 3, 9, 1.0, [0xff5a1f, 0xff2a1a, 0xffa030], 7);
    s.skulls.spawn(pos.x, pos.y + 2.4, pos.z);
    s.addShake(pos, 0.6);
    if (this.snd) { this.snd.stop(); this.snd = null; }
    s.sfx.bombBoom(pos);
    this.mesh.visible = false;
    this.disc.visible = false;
    this.state = 'boom'; this.t = 0;
  }
}

/* ====================== cosmetic pools ====================== */
class StarPool {
  constructor(sys, cap) {
    this.list = [];
    for (let i = 0; i < cap; i++) {
      const mat = new THREE.SpriteMaterial({
        map: sys.tex.star, transparent: true, opacity: 0, blending: THREE.AdditiveBlending,
        depthWrite: false, fog: false, toneMapped: false,
      });
      const sp = new THREE.Sprite(mat);
      sp.visible = false;
      sys.scene.add(sp);
      this.list.push({ sp, mat, v: new THREE.Vector3(), t: 0, life: 0, size: 1, ph: 0 });
    }
  }

  spawn(c) {
    const n = 5 + Math.floor(Math.random() * 3); // 5-7 taare
    let made = 0;
    for (const st of this.list) {
      if (made >= n) break;
      if (st.life > 0) continue;
      _w.set(rnd(-1, 1), rnd(-0.6, 1), rnd(-1, 1)).normalize();
      st.sp.position.copy(c).addScaledVector(_w, rnd(0.3, 1.2));
      st.v.copy(_w).multiplyScalar(rnd(1, 2.2));
      st.size = made % 2 === 0 ? rnd(1.1, 1.6) : rnd(0.45, 0.8); // bade aur chhote
      st.life = rnd(1.5, 2.1);
      st.t = 0;
      st.ph = Math.random() * 6.28;
      st.mat.color.setHex(pick(STAR_COLORS));
      st.sp.visible = true;
      made++;
    }
  }

  clear() { for (const st of this.list) { st.life = 0; st.sp.visible = false; } }

  update(dt) {
    for (const st of this.list) {
      if (st.life <= 0) continue;
      st.t += dt;
      const u = st.t / st.life;
      if (u >= 1) { st.life = 0; st.sp.visible = false; continue; }
      st.sp.position.addScaledVector(st.v, dt);
      st.v.multiplyScalar(Math.max(0, 1 - 1.6 * dt));
      st.mat.opacity = Math.min(1, st.t / 0.15) * clamp((1 - u) / 0.35, 0, 1) * 0.9;
      const pop = u < 0.15 ? easeOut(u / 0.15) : 1;
      st.sp.scale.setScalar(st.size * pop * (1 + 0.1 * Math.sin(st.t * 14 + st.ph)));
    }
  }
}

class EmblemPool {
  constructor(sys, cap) {
    this.list = [];
    for (let i = 0; i < cap; i++) {
      const mat = new THREE.SpriteMaterial({
        map: sys.tex.emblem, transparent: true, opacity: 0, depthWrite: false, fog: false, toneMapped: false,
      });
      const sp = new THREE.Sprite(mat);
      sp.visible = false;
      sys.scene.add(sp);
      this.list.push({ sp, mat, t: 0, on: false, x: 0, z: 0 });
    }
  }

  spawn(x, z) {
    const e = this.list.find((q) => !q.on) || this.list[0];
    e.on = true; e.t = 0; e.x = x; e.z = z;
    e.sp.visible = true;
  }

  clear() { for (const e of this.list) { e.on = false; e.sp.visible = false; } }

  update(dt) {
    const LIFE = 3.4;
    for (const e of this.list) {
      if (!e.on) continue;
      e.t += dt;
      const u = e.t / LIFE;
      if (u >= 1) { e.on = false; e.sp.visible = false; continue; }
      e.sp.position.set(e.x, 2.0 + 24 * Math.pow(u, 1.7), e.z);
      e.sp.scale.set(1.2 * (0.9 + 0.5 * u), 3.6 * (0.9 + 0.5 * u), 1);
      e.mat.opacity = Math.min(1, e.t / 0.3) * clamp((1 - u) / 0.4, 0, 1);
    }
  }
}

class SkullPool {
  constructor(sys, cap) {
    this.sys = sys;
    this.d = skullData();
    this.N = this.d.n;
    const dot = dotTexture();
    this.list = [];
    for (let i = 0; i < cap; i++) {
      const pos = new Float32Array(this.N * 3);
      const col = new Float32Array(this.N * 3);
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      const pts = new THREE.Points(g, new THREE.PointsMaterial({
        size: 0.2, map: dot, vertexColors: true, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, toneMapped: false,
      }));
      pts.frustumCulled = false;
      pts.visible = false;
      sys.scene.add(pts);
      this.list.push({
        pts, pos, col, bv: new Float32Array(this.N * 3),
        c: new THREE.Vector3(), right: new THREE.Vector3(1, 0, 0), nrm: new THREE.Vector3(0, 0, 1), t: 0, on: false,
      });
    }
  }

  spawn(x, y, z) {
    const s = this.list.find((q) => !q.on) || this.list[0];
    s.on = true; s.t = 0;
    s.c.set(x, y, z);
    s.right.copy(this.sys.camRight);
    s.nrm.set(-s.right.z, 0, s.right.x); // camera ki taraf
    for (let i = 0; i < this.N; i++) {
      _v.set(rnd(-1, 1), rnd(-0.3, 1), rnd(-1, 1)).normalize().multiplyScalar(rnd(1.5, 3.4));
      s.bv[i * 3] = _v.x; s.bv[i * 3 + 1] = _v.y; s.bv[i * 3 + 2] = _v.z;
    }
    s.pts.visible = true;
  }

  clear() { for (const s of this.list) { s.on = false; s.pts.visible = false; } }

  update(dt) {
    const SC = 2.8, LIFE = 4.0;
    const { uv, kind, jaw, dz } = this.d;
    for (const s of this.list) {
      if (!s.on) continue;
      s.t += dt;
      const t = s.t;
      if (t >= LIFE) { s.on = false; s.pts.visible = false; continue; }
      const e1 = easeOut(clamp(t / 0.45, 0, 1));      // pehle bikharte hain
      const m = ease(clamp((t - 0.35) / 0.75, 0, 1)); // phir skull mein jud jaate hain
      const fade = clamp((LIFE - t) / 0.9, 0, 1);
      const dis = 1 - fade;                            // aakhir mein bikhar kar upar udta hai
      const pulse = 0.86 + 0.14 * Math.sin(t * 6);
      const yaw = 0.35 * Math.sin(t * 1.3) * m;        // halka ghoomta hai
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const jawOpen = m > 0.95 ? Math.max(0, Math.sin(t * 10)) * 0.1 : 0; // jabda chalta hai (hansta skull)
      const rise = t * 0.15 + dis * dis * 1.2;
      const lit = fade * (0.55 + 0.45 * m) * pulse;
      const eyeOn = clamp((m - 0.5) * 2, 0, 1) * fade;

      for (let i = 0; i < this.N; i++) {
        const j = i * 3;
        const bx = s.c.x + s.bv[j] * e1, by = s.c.y + s.bv[j + 1] * e1, bz = s.c.z + s.bv[j + 2] * e1;
        const X = uv[i * 2] * SC, Z = dz[i] * SC;
        const xr = X * cy + Z * sy, zr = -X * sy + Z * cy;
        const ty = s.c.y + (uv[i * 2 + 1] - (jaw[i] ? jawOpen : 0)) * SC + rise;
        const tx = s.c.x + s.right.x * xr + s.nrm.x * zr;
        const tz = s.c.z + s.right.z * xr + s.nrm.z * zr;
        s.pos[j] = bx + (tx - bx) * m + s.bv[j] * dis * 0.3;
        s.pos[j + 1] = by + (ty - by) * m + s.bv[j + 1] * dis * 0.3;
        s.pos[j + 2] = bz + (tz - bz) * m + s.bv[j + 2] * dis * 0.3;
        const k = kind[i];
        if (k === 1) { s.col[j] = lit; s.col[j + 1] = 0.16 * lit; s.col[j + 2] = 0.08 * lit; }
        else if (k === 0) { s.col[j] = 0.7 * lit; s.col[j + 1] = 0.05 * lit; s.col[j + 2] = 0.04 * lit; }
        else { // aankhon mein jalti chingaari
          const f = eyeOn * (0.75 + 0.25 * Math.sin(t * 20 + i));
          s.col[j] = f; s.col[j + 1] = 0.7 * f; s.col[j + 2] = 0.18 * f;
        }
      }
      s.pts.geometry.attributes.position.needsUpdate = true;
      s.pts.geometry.attributes.color.needsUpdate = true;
    }
  }
}

/* ====================== HEALTH BUBBLES ====================== */
function bubbleTexture() {
  return canvasTex(128, 128, (g) => {
    const grd = g.createRadialGradient(64, 64, 10, 64, 64, 60);
    grd.addColorStop(0, 'rgba(120,255,160,0.35)');
    grd.addColorStop(0.8, 'rgba(60,230,110,0.55)');
    grd.addColorStop(1, 'rgba(200,255,220,0.95)');
    g.fillStyle = grd;
    g.beginPath(); g.arc(64, 64, 60, 0, Math.PI * 2); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.95)';
    g.fillRect(55, 32, 18, 64);
    g.fillRect(32, 55, 64, 18);
    g.fillStyle = 'rgba(255,255,255,0.5)';
    g.beginPath(); g.ellipse(44, 40, 10, 6, -0.6, 0, Math.PI * 2); g.fill();
  });
}

// HP < 50 hone par hawa mein health bubble aata hai: shoot karo ya usme se guzar jao => +10 HP
class BubbleSystem {
  constructor(sys) {
    this.sys = sys;
    this.timer = 0;
    this.low = false;
    this.list = [];
    const tex = bubbleTexture();
    for (let i = 0; i < 2; i++) {
      const mat = new THREE.SpriteMaterial({
        map: tex, transparent: true, opacity: 0, depthWrite: false, fog: false, toneMapped: false,
      });
      const sp = new THREE.Sprite(mat);
      sp.visible = false;
      sys.scene.add(sp);
      this.list.push({ sp, mat, on: false, t: 0, ph: 0, fade: 1, base: new THREE.Vector3() });
    }
  }

  get count() { return this.list.filter((b) => b.on).length; }

  spawn(camera) {
    const b = this.list.find((q) => !q.on);
    if (!b) return;
    const p = this.sys.player;
    camera.getWorldDirection(_w);
    const a = Math.atan2(_w.x, _w.z) + rnd(-1.1, 1.1); // zyadatar saamne ki taraf
    const r = rnd(6, 12);
    // zameen se player ki height ke beech
    b.base.set(p.x + Math.sin(a) * r, rnd(0.3, 1.7), p.z + Math.cos(a) * r);
    b.on = true; b.t = 0; b.fade = 1; b.ph = Math.random() * 6.28;
    b.sp.position.copy(b.base);
    b.sp.visible = true;
  }

  collect(b) {
    this.sys.sparks.burst(b.sp.position, 22, 1.5, 4.5, 0.7, [0x6dff9a, 0xbaffd0, 0xffffff], 2);
    b.on = false;
    b.sp.visible = false;
    this.sys.onHeal(10);
  }

  // rocket ka raasta (a -> bb) bubble se takraya? => point ya null
  hitSegment(a, bb) {
    for (const b of this.list) {
      if (!b.on) continue;
      _v.copy(bb).sub(a);
      const L2 = _v.lengthSq();
      const t = L2 > 1e-8 ? clamp(_w.copy(b.sp.position).sub(a).dot(_v) / L2, 0, 1) : 0;
      _w.copy(a).addScaledVector(_v, t);
      if (_w.distanceToSquared(b.sp.position) < 0.75 * 0.75) {
        const pt = b.sp.position.clone();
        this.collect(b);
        return pt;
      }
    }
    return null;
  }

  clear() {
    for (const b of this.list) { b.on = false; b.sp.visible = false; }
    this.low = false;
  }

  update(dt, hp, camera) {
    const low = hp < 50 && this.sys.enabled;
    if (low && !this.low) this.timer = 2.5;
    this.low = low;
    if (low) {
      this.timer -= dt;
      if (this.timer <= 0) {
        if (this.count < 2 && camera) this.spawn(camera);
        this.timer = rnd(6, 9);
      }
    }
    const pl = this.sys.player;
    for (const b of this.list) {
      if (!b.on) continue;
      b.t += dt;
      b.fade = damp(b.fade, low ? 1 : 0, 6, dt);
      if ((!low && b.fade < 0.03) || b.t > 14) { b.on = false; b.sp.visible = false; continue; }
      const t = b.t, ph = b.ph;
      b.sp.position.set(b.base.x + Math.sin(t * 0.8 + ph) * 0.4, b.base.y + Math.sin(t * 1.7 + ph) * 0.25, b.base.z + Math.cos(t * 0.8 + ph) * 0.4);
      b.sp.scale.setScalar(1.25 * easeOut(Math.min(1, t / 0.4)) * (1 + 0.06 * Math.sin(t * 5 + ph)));
      b.mat.opacity = 0.95 * b.fade * clamp((14 - t) / 1.5, 0, 1) * Math.min(1, t / 0.3);
      // player ke andar se guzre to mil jaata hai
      const y = b.sp.position.y;
      if (Math.hypot(pl.x - b.sp.position.x, pl.z - b.sp.position.z) < 0.9 && y > pl.y - 0.2 && y < pl.y + 2.0) this.collect(b);
    }
  }
}

/* ====================== CRACKER SYSTEM ====================== */
export class CrackerSystem {
  constructor(scene, { onHit, onHeal } = {}) {
    this.scene = scene;
    this.onHit = onHit || (() => {});
    this.onHeal = onHeal || (() => {});
    this.enabled = true;
    this.shake = 0;
    this.gap = 2;
    this.last = '';
    this.time = 0;
    this.player = new THREE.Vector3();
    this.pvel = new THREE.Vector3();
    this._prev = new THREE.Vector3();
    this._init = false;
    this.camRight = new THREE.Vector3(1, 0, 0);

    // shared geometry / material / texture (kam memory, mobile friendly)
    const wing = new THREE.BufferGeometry();
    wing.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
      0, 0, 0, 0.26, 0.2, 0, 0.2, 0, 0,
      0, 0, 0, 0.2, 0, 0, 0.14, -0.15, 0,
    ]), 3));
    this.geo = {
      can: new THREE.CylinderGeometry(0.16, 0.2, 0.4, 8),
      disc: new THREE.CylinderGeometry(0.24, 0.24, 0.06, 10),
      bomb: new THREE.SphereGeometry(0.26, 10, 8),
      rBody: new THREE.CylinderGeometry(0.05, 0.05, 0.34, 6),
      rNose: new THREE.ConeGeometry(0.05, 0.12, 6),
      ring: new THREE.RingGeometry(0.92, 1, 40).rotateX(-Math.PI / 2),
      zone: new THREE.CircleGeometry(1, 32).rotateX(-Math.PI / 2),
      wing,
    };
    this.mat = {
      anar: new THREE.MeshBasicMaterial({ color: 0xd04a2a }),
      chakri: new THREE.MeshBasicMaterial({ color: 0xe0b030 }),
      rocket: new THREE.MeshBasicMaterial({ color: 0xd8342a }),
      rocketTip: new THREE.MeshBasicMaterial({ color: 0xf2d060 }),
    };
    this.tex = { star: starTexture(), emblem: emblemTexture() };

    this.sparks = new Sparks(scene, 420, 0.14);
    this.stars = new StarPool(this, 21);
    this.emblems = new EmblemPool(this, 2);
    this.skulls = new SkullPool(this, 2);
    this.sfx = getSfx();
    this.bubbles = new BubbleSystem(this);

    this.pools = {
      anar: Array.from({ length: 3 }, () => new Anar(this)),
      chakri: Array.from({ length: 2 }, () => new Chakri(this)),
      rocket: Array.from({ length: 3 }, () => new Rocket(this)),
      bomb: Array.from({ length: 2 }, () => new Bomb(this)),
    };
    this.items = [].concat(this.pools.anar, this.pools.chakri, this.pools.rocket, this.pools.bomb);
  }

  get activeCount() {
    let n = 0;
    for (const it of this.items) if (it.active) n++;
    return n;
  }

  canThrow() {
    return this.enabled && this.gap <= 0 && this.activeCount < CRACKER.MAX_ACTIVE;
  }

  // distance ke hisaab se type chunta hai (door = rocket/bomb, paas = chakri/anaar)
  pickType(d) {
    const w = { anar: 3, chakri: d < 18 ? 2.2 : 0.6, rocket: d > 9 ? 2.4 : 0.8, bomb: 1.6 };
    if (w[this.last]) w[this.last] *= 0.3;
    let sum = 0;
    for (const k in w) sum += w[k];
    let r = Math.random() * sum;
    for (const k in w) { r -= w[k]; if (r <= 0) return k; }
    return 'anar';
  }

  throwFrom(type, from, target) {
    if (!this.canThrow()) return false;
    const it = this.pools[type] && this.pools[type].find((x) => !x.active);
    if (!it) return false;
    it.spawn(from, target);
    this.sfx.toss(from, type);
    this.last = type;
    this.gap = CRACKER.GLOBAL_GAP;
    return true;
  }

  hurt(dmg, kind) { this.onHit(dmg, kind); }

  addShake(pos, amp) {
    const d = pos.distanceTo(this.player);
    this.shake = Math.max(this.shake, amp * clamp(1 - d / 30, 0.15, 1));
  }

  clear() {
    for (const it of this.items) it.stop();
    this.stars.clear(); this.emblems.clear(); this.skulls.clear(); this.bubbles.clear();
    this.gap = 2;
  }

  bubbleHit(a, b) { return this.bubbles.hitSegment(a, b); }

  update(dt, time, playerPos, camera, hp = 100) {
    this.time = time;
    if (this._init && dt > 0) {
      _v.copy(playerPos).sub(this._prev).divideScalar(dt);
      if (_v.length() > 14) _v.set(0, 0, 0); // teleport/respawn ka spike
      this.pvel.x = damp(this.pvel.x, _v.x, 10, dt);
      this.pvel.z = damp(this.pvel.z, _v.z, 10, dt);
    }
    this._prev.copy(playerPos);
    this._init = true;
    this.player.copy(playerPos);

    this.gap -= dt;
    this.shake = Math.max(0, this.shake - dt * 3);

    if (camera) {
      _w.set(1, 0, 0).applyQuaternion(camera.quaternion);
      _w.y = 0;
      if (_w.lengthSq() > 1e-4) this.camRight.copy(_w.normalize());
    }
    this.sfx.setListener(playerPos.x, playerPos.y, playerPos.z, this.camRight.x, this.camRight.z);

    for (const it of this.items) if (it.active) it.update(dt, time);
    this.stars.update(dt);
    this.emblems.update(dt);
    this.skulls.update(dt);
    this.bubbles.update(dt, hp, camera);
    this.sparks.update(dt);
  }
}

/* ====================== PLAYER HP + DAMAGE ====================== */
// HP 0 => respawnS second baad full HP ke saath wapas (score zero hone ka kaam main.js / matchHud karta hai).
// Regen nahi hai: HP sirf health bubble se badhti hai (heal()).
export class PlayerHealth {
  constructor({ max = 100, respawnS = 5, onDeath, onRespawn } = {}) {
    this.max = max;
    this.hp = max;
    this.dead = false;
    this.deadT = 0;
    this.respawnS = respawnS;
    this.invul = 0;
    this.vig = 0;
    this.onDeath = onDeath;
    this.onRespawn = onRespawn;

    const css = document.createElement('style');
    css.textContent = `
#hp-hud{position:fixed;top:max(12px,env(safe-area-inset-top));left:max(12px,env(safe-area-inset-left));z-index:30;display:flex;align-items:center;gap:8px;pointer-events:none;
 font:700 14px system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000}
#hp-hud .hp-bar{width:min(30vw,190px);height:12px;background:rgba(0,0,0,.55);border:2px solid rgba(255,255,255,.7);
 border-radius:8px;overflow:hidden}
#hp-hud i{display:block;height:100%;width:100%;transform-origin:left;background:#44ff66}
#hp-vig{position:fixed;inset:0;z-index:25;pointer-events:none;opacity:0;
 background:radial-gradient(ellipse at center,rgba(255,0,0,0) 45%,rgba(190,0,0,.55) 100%)}
#hp-vig.green{background:radial-gradient(ellipse at center,rgba(0,255,120,0) 50%,rgba(40,220,110,.45) 100%)}
#hp-msg{position:fixed;inset:0;z-index:60;display:none;flex-direction:column;gap:10px;align-items:center;justify-content:center;pointer-events:none;
 font:800 clamp(22px,6vw,40px) system-ui,sans-serif;color:#fff;text-shadow:0 2px 8px #000;background:rgba(40,0,0,.5);text-align:center}
#hp-msg small{font:600 clamp(13px,3.4vw,18px) system-ui,sans-serif;opacity:.92}`;
    document.head.appendChild(css);

    this.hud = document.createElement('div');
    this.hud.id = 'hp-hud';
    this.hud.innerHTML = '<span>HP</span><div class="hp-bar"><i></i></div><b></b>';
    this.barEl = this.hud.querySelector('i');
    this.numEl = this.hud.querySelector('b');
    this.vigEl = document.createElement('div');
    this.vigEl.id = 'hp-vig';
    this.msgEl = document.createElement('div');
    this.msgEl.id = 'hp-msg';
    this.msgEl.innerHTML = '<div>Tum out ho gaye!</div><small></small>';
    this.subEl = this.msgEl.querySelector('small');
    document.body.append(this.hud, this.vigEl, this.msgEl);
    this._draw();
  }

  damage(n) {
    if (this.dead || this.invul > 0) return false;
    this.hp = Math.max(0, this.hp - n);
    this.invul = 0.2;
    this.vigEl.className = '';
    this.vig = 1;
    if (this.hp <= 0) {
      this.dead = true;
      this.deadT = this.respawnS;
      this.msgEl.style.display = 'flex';
      if (this.onDeath) this.onDeath();
    }
    this._draw();
    return true;
  }

  heal(n) {
    if (this.dead || this.hp >= this.max) return false;
    this.hp = Math.min(this.max, this.hp + n);
    this.vigEl.className = 'green';
    this.vig = 0.7;
    this._draw();
    return true;
  }

  update(dt) {
    this.invul -= dt;
    this.vig = Math.max(0, this.vig - dt * 2.2);
    this.vigEl.style.opacity = (this.vig * 0.9).toFixed(2);
    if (this.dead) {
      this.deadT -= dt;
      this.subEl.textContent = `Score zero ho gaya \u00b7 Respawn in ${Math.max(1, Math.ceil(this.deadT))}s`;
      if (this.deadT <= 0) this._respawn();
    }
  }

  _respawn() {
    this.hp = this.max;
    this.dead = false;
    this.invul = 2; // respawn ke baad 2 sec surakshit
    this.vig = 0;
    this.msgEl.style.display = 'none';
    this._draw();
    if (this.onRespawn) this.onRespawn();
  }

  _draw() {
    const r = this.hp / this.max;
    this.barEl.style.transform = `scaleX(${Math.max(r, 0.001)})`;
    this.barEl.style.background = r > 0.6 ? '#44ff66' : r > 0.3 ? '#ffcc33' : '#ff3b30';
    this.numEl.textContent = Math.ceil(this.hp);
  }
}