import * as THREE from 'three';
import { on } from './fighters.js';

const N = 900, GRAV = 5.5;
const rnd = (a, b) => a + Math.random() * (b - a);
const PAL = [[1, 0.78, 0.25], [1, 0.45, 0.1], [1, 0.25, 0.5], [0.35, 1, 0.45], [0.45, 0.75, 1], [1, 0.95, 0.75]];
const _v = new THREE.Vector3();

export function initFwVfx(scene, camera) {
  // ---------- chingaari (flash kam, aag zyada) ----------
  const pos = new Float32Array(N * 3).fill(-999);
  const c0 = new Float32Array(N * 3), col = new Float32Array(N * 3);
  const vel = new Float32Array(N * 3), life = new Float32Array(N), flr = new Float32Array(N);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3).setUsage(THREE.DynamicDrawUsage));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.17, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  pts.frustumCulled = false;
  scene.add(pts);
  let pi = 0;

  // mode 0 = fountain (upar), 1 = poora gola, 2 = zameen par flat
  function spark(x, y, z, n, speed, up, mode = 0, l0 = 0.5, l1 = 1.1, warm = false) {
    const fy = y > 2.2 ? 4 : 0;
    for (let i = 0; i < n; i++) {
      const k = pi++ % N, j = k * 3;
      pos[j] = x; pos[j + 1] = y; pos[j + 2] = z;
      let vx = rnd(-1, 1), vz = rnd(-1, 1), vy;
      if (mode === 1) {
        vy = rnd(-1, 1);
        const m = Math.hypot(vx, vy, vz) || 1, s = speed * rnd(0.5, 1);
        vx = (vx / m) * s; vy = (vy / m) * s + up; vz = (vz / m) * s;
      } else if (mode === 2) {
        const m = Math.hypot(vx, vz) || 1, s = speed * rnd(0.5, 1);
        vx = (vx / m) * s; vz = (vz / m) * s; vy = up * rnd(0.3, 1);
      } else { vx *= speed; vz *= speed; vy = up + rnd(0, speed * 0.5); }
      vel[j] = vx; vel[j + 1] = vy; vel[j + 2] = vz;
      const c = PAL[warm ? (Math.random() < 0.5 ? 0 : 1) : (Math.random() * PAL.length) | 0], b = rnd(0.7, 1.15);
      c0[j] = c[0] * b; c0[j + 1] = c[1] * b; c0[j + 2] = c[2] * b;
      life[k] = rnd(l0, l1);
      flr[k] = fy;
    }
  }

  // ---------- halki roshni ----------
  const lights = [0, 1, 2].map(() => {
    const l = new THREE.PointLight(0xffa040, 0, 12, 2);
    scene.add(l);
    return { l, t: 0 };
  });
  let li = 0;
  function glow(x, y, z, I, dur, color = 0xffa040) {
    const L = lights[li++ % 3];
    L.l.color.setHex(color);
    L.l.position.set(x, y, z);
    L.l.intensity = I;
    L.t = dur;
  }

  // ---------- awaaz (WebAudio) ----------
  let ac = null, nb = null;
  const unlock = () => {
    if (ac) return;
    ac = new (window.AudioContext || window.webkitAudioContext)();
    nb = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const d = nb.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  };
  addEventListener('pointerdown', unlock);
  addEventListener('keydown', unlock);
  const vol = (x, y, z) => 1 / (1 + camera.position.distanceTo(_v.set(x, y, z)) * 0.12);

  function noise(v, dur, type, f0, f1) {
    if (!ac || v < 0.02) return;
    if (ac.state === 'suspended') ac.resume();
    const t = ac.currentTime;
    const src = ac.createBufferSource(); src.buffer = nb; src.loop = true;
    const fl = ac.createBiquadFilter(); fl.type = type;
    fl.frequency.setValueAtTime(f0, t);
    fl.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(v, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(fl); fl.connect(g); g.connect(ac.destination);
    src.start(t); src.stop(t + dur + 0.02);
  }
  function thump(v, f0, f1, dur) {
    if (!ac || v < 0.02) return;
    const t = ac.currentTime;
    const o = ac.createOscillator(), g = ac.createGain();
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(v, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function bang(v, big) {
    thump(v * (big ? 1 : 0.8), big ? 110 : 90, 28, big ? 0.55 : 0.4);
    noise(v, big ? 0.7 : 0.5, 'lowpass', big ? 1800 : 1200, 200);
    for (let i = 0; i < 5; i++) setTimeout(() => noise(v * 0.22, 0.06, 'highpass', 4000, 3000), 90 + i * 70 + Math.random() * 40);
  }

  // ---------- patakhe ke objects ----------
  const M = {
    red: new THREE.MeshLambertMaterial({ color: 0xc02a20, emissive: 0x300805 }),
    gold: new THREE.MeshLambertMaterial({ color: 0xe0b030, emissive: 0x403000 }),
    dark: new THREE.MeshLambertMaterial({ color: 0x1a1210 }),
    mat: new THREE.MeshLambertMaterial({ color: 0xb8843a, emissive: 0x302008 }),
    blink: new THREE.MeshBasicMaterial({ color: 0xff2a1a }),
  };
  const gS = new THREE.SphereGeometry(1, 10, 8), gC = new THREE.CylinderGeometry(1, 1, 1, 8), gK = new THREE.ConeGeometry(1, 1, 8);
  const part = (g, geo, m, sx, sy, sz, x = 0, y = 0, z = 0, rx = 0) => {
    const o = new THREE.Mesh(geo, m);
    o.scale.set(sx, sy, sz); o.position.set(x, y, z); o.rotation.x = rx;
    g.add(o);
    return o;
  };
  function makeMesh(ty) {
    const g = new THREE.Group(), H = Math.PI / 2;
    if (ty === 0) {                                  // rocket
      part(g, gC, M.red, 0.04, 0.4, 0.04, 0, 0, 0, H);
      part(g, gK, M.gold, 0.05, 0.12, 0.05, 0, 0, 0.26, H);
      part(g, gC, M.mat, 0.01, 0.3, 0.01, 0, 0, -0.3, H);
    } else if (ty === 1) {                           // anaar bomb
      part(g, gS, M.red, 0.12, 0.12, 0.12);
      part(g, gC, M.gold, 0.125, 0.03, 0.125);
      part(g, gC, M.dark, 0.012, 0.08, 0.012, 0, 0.14, 0);
    } else if (ty === 2) {                           // chatai bomb
      part(g, gC, M.mat, 0.17, 0.03, 0.17);
      part(g, gC, M.red, 0.175, 0.012, 0.175, 0, 0.02, 0);
      g.userData.blink = part(g, gS, M.blink, 0.03, 0.03, 0.03, 0, 0.06, 0);
    } else if (ty === 3) {                           // seedha bomb
      part(g, gS, M.dark, 0.13, 0.13, 0.13);
      part(g, gC, M.gold, 0.02, 0.05, 0.02, 0, 0.14, 0);
      part(g, gC, M.red, 0.01, 0.07, 0.01, 0, 0.19, 0);
    } else {                                         // chutt-putt
      for (const x of [-0.05, 0, 0.05]) part(g, gC, M.red, 0.025, 0.14, 0.025, x, 0.03, 0, H);
      part(g, gC, M.dark, 0.06, 0.008, 0.06, 0, 0.03, 0, H);
    }
    scene.add(g);
    return g;
  }

  const objs = new Map();
  const fountains = [];

  function removeObj(id) {
    const o = objs.get(id);
    if (!o) return;
    scene.remove(o.mesh);
    objs.delete(id);
  }

  on('fw', (e) => {
    const v = vol(e.x ?? 0, e.y ?? 0, e.z ?? 0);
    if (e.k === 's') {
      const mesh = makeMesh(e.ty);
      mesh.position.set(e.x, e.y, e.z);
      objs.set(e.id, { mesh, ty: e.ty, vel: new THREE.Vector3(e.vx, e.vy, e.vz), g: e.g, st: 'fly', t: 0, dur: 0, popT: 0, fy: e.y > 2.2 ? 4 : 0 });
      if (e.ty === 0) noise(v * 0.6, 0.55, 'bandpass', 700, 3500);
      else if (e.ty === 3) noise(v * 0.5, 0.35, 'bandpass', 500, 2500);
      else noise(v * 0.2, 0.2, 'bandpass', 600, 1500);
    } else if (e.k === 'l') {
      let o = objs.get(e.id);
      if (!o) { o = { mesh: makeMesh(e.ty), ty: e.ty, vel: new THREE.Vector3(), g: 0, st: 'fly', t: 0, popT: 0, fy: e.y > 2.2 ? 4 : 0 }; objs.set(e.id, o); }
      o.mesh.position.set(e.x, e.y, e.z);
      o.mesh.rotation.set(0, 0, 0);
      o.st = 'ground'; o.t = 0; o.dur = e.dur; o.vel.set(0, 0, 0);
      if (e.ty === 1) noise(v * 0.4, e.dur, 'bandpass', 3500, 2500);       // fuse ki sss
    } else if (e.k === 'b') {
      if (e.ty === 1) {                                                     // anaar fountain shuru
        const o = objs.get(e.id);
        if (o) o.mesh.visible = false;
        fountains.push({ x: e.x, y: e.y + 0.1, z: e.z, t: 0, dur: e.dur || 2.6, acc: 0, id: e.id });
        spark(e.x, e.y + 0.2, e.z, 40, 3, 4, 1, 0.5, 1.0);
        thump(v * 0.6, 100, 40, 0.3);
        noise(v * 0.45, e.dur || 2.6, 'bandpass', 2600, 1800);
        glow(e.x, e.y + 1, e.z, 3, 0.15);
      } else {
        removeObj(e.id);
        if (e.ty === 2) {                                                   // chatai: tez karaara + zameen pe flat ring
          spark(e.x, e.y + 0.1, e.z, 80, 6.5, 1.2, 2, 0.4, 0.9);
          spark(e.x, e.y + 0.2, e.z, 60, 5, 2.5, 1, 0.5, 1.0, true);
          glow(e.x, e.y + 0.4, e.z, 5, 0.08, 0xff7030);
          noise(v, 0.12, 'highpass', 5000, 3500);
          bang(v, false);
        } else {                                                            // rocket / bomb
          const big = e.ty === 3;
          spark(e.x, e.y, e.z, big ? 170 : 150, big ? 7.5 : 6.5, 1.5, 1, 0.6, 1.3);
          spark(e.x, e.y, e.z, 60, 3, 1, 1, 0.9, 1.6, true);
          glow(e.x, e.y + 0.3, e.z, big ? 7 : 6, 0.09);
          bang(v, true);
        }
      }
    } else if (e.k === 'x') removeObj(e.id);
  });

  let cr = 0;
  return {
    update(dt) {
      // chingaari
      for (let k = 0; k < N; k++) {
        if (life[k] <= 0) continue;
        const j = k * 3;
        life[k] -= dt;
        vel[j + 1] -= GRAV * dt;
        pos[j] += vel[j] * dt; pos[j + 1] += vel[j + 1] * dt; pos[j + 2] += vel[j + 2] * dt;
        if (pos[j + 1] < flr[k] + 0.02) {
          pos[j + 1] = flr[k] + 0.02;
          vel[j] *= 0.2; vel[j + 1] = 0; vel[j + 2] *= 0.2;
          life[k] -= dt * 3;
        }
        const a = Math.min(1, life[k] * 1.8);
        col[j] = c0[j] * a; col[j + 1] = c0[j + 1] * a; col[j + 2] = c0[j + 2] * a;
        if (life[k] <= 0) { pos[j + 1] = -999; col[j] = col[j + 1] = col[j + 2] = 0; }
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;

      for (const L of lights) if (L.t > 0 && (L.t -= dt) <= 0) L.l.intensity = 0;

      // udte/rakhe hue patakhe
      for (const [id, o] of objs) {
        const m = o.mesh, p = m.position;
        o.t += dt;
        if (o.st === 'fly') {
          o.vel.y -= o.g * dt;
          p.addScaledVector(o.vel, dt);
          if (o.ty === 0) {
            m.lookAt(p.x + o.vel.x, p.y + o.vel.y, p.z + o.vel.z);
            spark(p.x - o.vel.x * 0.03, p.y - o.vel.y * 0.03, p.z - o.vel.z * 0.03, 3, 0.8, 0.3, 1, 0.3, 0.6, true);
          } else {
            m.rotation.x += dt * 9; m.rotation.z += dt * 5;
            if (o.ty !== 2 && o.ty !== 4) spark(p.x, p.y + 0.15, p.z, 1, 0.6, 0.5, 1, 0.2, 0.5, true);
          }
        } else if (o.ty === 1) {
          spark(p.x, p.y + 0.16, p.z, 1, 0.5, 1.2, 1, 0.2, 0.5, true);      // fuse ki chingaari
        } else if (o.ty === 2) {
          if (m.userData.blink) m.userData.blink.visible = Math.sin(o.t * 9) > -0.2;
        } else if (o.ty === 4) {
          m.position.y = o.fy + 0.03 + Math.abs(Math.sin(o.t * 22)) * 0.1;
          o.popT -= dt;
          if (o.popT <= 0) {                                                 // chhutt-putt: chhote chhote dhamaake
            o.popT = rnd(0.05, 0.16);
            const px = p.x + rnd(-1.5, 1.5), pz = p.z + rnd(-1.5, 1.5);
            spark(px, o.fy + 0.06, pz, 12, 2.2, 3, 1, 0.25, 0.55);
            noise(vol(px, o.fy, pz) * 0.45, 0.04, 'highpass', 3200, 2600);
          }
          if (o.t > o.dur) removeObj(id);
        }
      }

      // anaar fountain
      for (let i = fountains.length - 1; i >= 0; i--) {
        const f = fountains[i];
        f.t += dt;
        f.acc += dt * 260;
        const n = Math.floor(f.acc); f.acc -= n;
        if (n > 0) spark(f.x, f.y, f.z, n, 1.4, 6.5, 0, 0.7, 1.4);
        if ((cr += dt) > 0.12) { cr = 0; glow(f.x, f.y + 1, f.z, 2.5 + Math.random(), 0.12, 0xff9a40); }
        if (f.t > f.dur) { removeObj(f.id); fountains.splice(i, 1); }
      }
    },
  };
}