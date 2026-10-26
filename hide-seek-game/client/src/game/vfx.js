import * as THREE from 'three';
import { on } from './fighters.js';
import { me } from '../player/self.js';
import { WEAPONS, BOT_GUN } from './weapondata.js';
import { dotTex } from './dot.js';

const N = 320;
const rand = (a, b) => a + Math.random() * (b - a);

export function initVfx(scene, camera) {
  // ---------- particles (khoon + spark) ----------
  const pos = new Float32Array(N * 3).fill(-999);
  const col = new Float32Array(N * 3);
  const vel = new Float32Array(N * 3);
  const life = new Float32Array(N);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3).setUsage(THREE.DynamicDrawUsage));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.11, vertexColors: true, transparent: true, depthWrite: false, map: dotTex, alphaTest: 0.05,
  }));
  pts.frustumCulled = false;
  scene.add(pts);
  let pi = 0;

  function burst(x, y, z, n, speed, r, g, b, up = 1.5) {
    for (let i = 0; i < n; i++) {
      const k = pi++ % N, j = k * 3;
      pos[j] = x; pos[j + 1] = y; pos[j + 2] = z;
      vel[j] = rand(-1, 1) * speed; vel[j + 1] = rand(0, 1) * speed + up; vel[j + 2] = rand(-1, 1) * speed;
      const s = rand(0.6, 1.1);
      col[j] = r * s; col[j + 1] = g * s; col[j + 2] = b * s;
      life[k] = rand(0.45, 1.1);
    }
  }

  // ---------- zameen pe khoon ke daag ----------
  const dgeo = new THREE.CircleGeometry(0.5, 10);
  dgeo.rotateX(-Math.PI / 2);
  const decals = [];
  for (let i = 0; i < 24; i++) {
    const m = new THREE.Mesh(dgeo, new THREE.MeshBasicMaterial({
      color: 0x6a0a0a, transparent: true, opacity: 0, depthWrite: false,
      polygonOffset: true, polygonOffsetFactor: -2,
    }));
    m.visible = false;
    scene.add(m);
    decals.push({ m, t: 0 });
  }
  let di = 0;
  function decal(x, y, z, s) {
    const d = decals[di++ % decals.length];
    d.m.position.set(x, y + 0.02, z);
    d.m.scale.setScalar(s);
    d.m.rotation.y = rand(0, 6.28);
    d.t = 25;
    d.m.visible = true;
  }

  // ---------- muzzle flash: light + sprite ----------
  const lights = [0, 1].map(() => {
    const l = new THREE.PointLight(0xffa640, 0, 14, 2);
    scene.add(l);
    return { l, t: 0 };
  });
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const cx = c.getContext('2d');
  const gr = cx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,230,1)');
  gr.addColorStop(0.35, 'rgba(255,190,80,.8)');
  gr.addColorStop(1, 'rgba(255,120,0,0)');
  cx.fillStyle = gr; cx.fillRect(0, 0, 64, 64);
  const ftex = new THREE.CanvasTexture(c);
  const sprites = [0, 1, 2, 3].map(() => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: ftex, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    s.visible = false;
    scene.add(s);
    return { s, t: 0 };
  });
  let li = 0, si = 0;
  function flash(x, y, z, big) {
    const L = lights[li++ % lights.length];
    L.l.position.set(x, y, z);
    L.l.intensity = 9;
    L.t = 0.045;
    const S = sprites[si++ % sprites.length];
    S.s.position.set(x, y, z);
    S.s.scale.setScalar(big ? 0.5 : 0.28);
    S.s.visible = true;
    S.t = 0.04;
  }

  // ---------- gunshot awaaz (WebAudio, koi file nahi) ----------
  let ac = null, noise = null;
  const unlock = () => {
    if (ac) return;
    ac = new (window.AudioContext || window.webkitAudioContext)();
    noise = ac.createBuffer(1, ac.sampleRate * 0.5, ac.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  };
  addEventListener('pointerdown', unlock);
  addEventListener('keydown', unlock);

  function sound(vol, kind) {
    if (!ac || vol < 0.03) return;
    if (ac.state === 'suspended') ac.resume();
    const t = ac.currentTime, dur = kind === 2 ? 0.4 : 0.2;
    const src = ac.createBufferSource();
    src.buffer = noise;
    const f = ac.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = [2600, 2200, 900, 1800][kind] || 2000;
    const g = ac.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f); f.connect(g); g.connect(ac.destination);
    src.start(t); src.stop(t + dur);
    const o = ac.createOscillator(), og = ac.createGain();
    o.frequency.setValueAtTime(130, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
    og.gain.setValueAtTime(vol * 0.8, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    o.connect(og); og.connect(ac.destination);
    o.start(t); o.stop(t + 0.15);
  }

  // ---------- events ----------
  let shake = 0;
  let shakeT = 0;

  on('shot', (s, o, d, w) => {
    const k = w === BOT_GUN ? 3 : Math.max(0, WEAPONS.indexOf(w));
    const x = o.x + (d ? d.x * 0.6 : 0);
    const y = o.y + (d ? d.y * 0.6 : 0) - (s === me ? 0.05 : 0);
    const z = o.z + (d ? d.z * 0.6 : 0);
    flash(x, y, z, k === 2);
    const dist = Math.hypot(camera.position.x - o.x, camera.position.y - o.y, camera.position.z - o.z);
    sound(s === me ? 0.55 : 0.55 / (1 + dist * 0.25), k);
    if (s === me) {
      shake = Math.max(shake, k === 2 ? 0.02 : 0.007);
      burst(o.x + 0.12, o.y - 0.12, o.z, 1, 0.9, 0.95, 0.75, 0.25, 1.4);   // khali casing
    }
    if (d) burst(x, y, z, 2, 0.35, 0.55, 0.55, 0.55, 0.6);                 // halka dhuaan
  });

  on('impact', (s, p, victim, head) => {
    if (victim) {
      if (victim.isBot) burst(p.x, p.y, p.z, 16, 2.4, 1, 0.7, 0.1, 1.2);
      else burst(p.x, p.y, p.z, head ? 26 : 14, 2.2, 0.7, 0.02, 0.02, 1.2);
    }
  });

  on('kill', (v, a, head) => {
    if (v.isBot) {
      const { x, y, z } = v.pos;
      burst(x, y + 1, z, 60, 3.2, 1, 0.55, 0.15, 2);
      burst(x, y + 1, z, 40, 3, 0.3, 1, 0.5, 2.2);
      return;
    }
    const { x, y, z } = v.pos;
    burst(x, y + 1.0, z, 45, 3, 0.65, 0.02, 0.02, 2);
    if (head) burst(x, y + 1.3, z, 30, 3.5, 0.8, 0.03, 0.03, 2.5);
    decal(x, y, z, rand(0.9, 1.5));
    decal(x + rand(-0.6, 0.6), y, z + rand(-0.6, 0.6), rand(0.4, 0.8));
  });

  return {
    update(dt) {
      for (let k = 0; k < N; k++) {
        if (life[k] <= 0) continue;
        const j = k * 3;
        life[k] -= dt;
        vel[j + 1] -= 9.8 * dt;
        pos[j] += vel[j] * dt; pos[j + 1] += vel[j + 1] * dt; pos[j + 2] += vel[j + 2] * dt;
        const fy = pos[j + 1] > 2.2 ? 4 : 0;
        if (pos[j + 1] < fy + 0.03) { pos[j + 1] = fy + 0.03; vel[j] = vel[j + 1] = vel[j + 2] = 0; }
        if (life[k] <= 0) pos[j + 1] = -999;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;

      for (const d of decals) {
        if (d.t <= 0) continue;
        d.t -= dt;
        d.m.material.opacity = Math.min(0.85, d.t / 6);
        if (d.t <= 0) d.m.visible = false;
      }
      for (const L of lights) {
        if (L.t > 0) { L.t -= dt; if (L.t <= 0) L.l.intensity = 0; }
      }
      for (const S of sprites) {
        if (S.t > 0) { S.t -= dt; if (S.t <= 0) S.s.visible = false; }
      }
      if (shake > 0.0005) {
        shakeT += dt * 70;
        camera.rotation.x += Math.sin(shakeT) * shake;
        camera.rotation.y += Math.cos(shakeT * 1.3) * shake;
        shake *= Math.exp(-dt * 14);
      }
    },
  };
}