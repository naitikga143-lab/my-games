import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/*
  gun-local axes: +Z = aage (muzzle), +Y = upar.
  Gun ka origin = pakad (grip) ka point. Barrel ki axis y = AXIS_Y par hai.
*/
export const WEAPON = {
  AXIS_Y: 0.07,
  Z_MUZZLE: 0.24,  // barrel ka munh
  LOADED_Z: 0.3,   // loaded rocket ka center
  INSERT_Z: 0.52,  // reload mein rocket yahan se andar dalta hai
  SPEED: 38,       // rocket speed (m/s)
  LIFE: 4,
};

const ZAXIS = new THREE.Vector3(0, 0, 1);
const shadowed = (m) => { m.castShadow = true; return m; };
const rr = (a, b) => a + Math.random() * (b - a);
const PALETTE = [[1, 0.9, 0.4], [1, 0.45, 0.2], [1, 0.3, 0.7], [0.4, 0.9, 1], [0.7, 1, 0.4]];

/* ====================== ROCKET: patla, firecracker (bottle-rocket) jaisa ====================== */
// axis = +Z (nok aage), peeche bans ki patli stick
export function createRocketMesh() {
  const g = new THREE.Group();
  const paper = new THREE.MeshStandardMaterial({ color: 0xd8322b, roughness: 0.6 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xe8b43a, roughness: 0.4, metalness: 0.5 });
  const head = new THREE.MeshStandardMaterial({ color: 0x2b2420, roughness: 0.6 });
  const bamboo = new THREE.MeshStandardMaterial({ color: 0xc9a26a, roughness: 0.8 });
  const add = (geo, m, z) => { const x = shadowed(new THREE.Mesh(geo, m)); x.position.z = z; g.add(x); return x; };

  add(new THREE.CylinderGeometry(0.014, 0.014, 0.12, 12).rotateX(Math.PI / 2), paper, 0);       // body
  add(new THREE.CylinderGeometry(0.0148, 0.0148, 0.012, 12).rotateX(Math.PI / 2), gold, 0.03);  // sunehri patti
  add(new THREE.CylinderGeometry(0.0148, 0.0148, 0.012, 12).rotateX(Math.PI / 2), gold, -0.03);
  add(new THREE.ConeGeometry(0.014, 0.04, 12).rotateX(Math.PI / 2), head, 0.08);                // nok
  add(new THREE.CylinderGeometry(0.01, 0.01, 0.01, 8).rotateX(Math.PI / 2), head, -0.065);      // tail cap
  add(new THREE.CylinderGeometry(0.0035, 0.0035, 0.17, 6).rotateX(Math.PI / 2), bamboo, -0.15); // stick
  return g;
}

/* ====================== GUN: halki, smooth, ek haath wali ====================== */
export function createGun() {
  const g = new THREE.Group();
  const AY = WEAPON.AXIS_Y;
  const pearl = new THREE.MeshStandardMaterial({ color: 0xe9edf3, roughness: 0.22, metalness: 0.35 });
  const graphite = new THREE.MeshStandardMaterial({ color: 0x262a33, roughness: 0.4, metalness: 0.6 });
  const accent = new THREE.MeshStandardMaterial({ color: 0xd0782c, roughness: 0.4, metalness: 0.3 });
  const glowMats = [];
  const mkGlow = (hex) => {
    const m = new THREE.MeshStandardMaterial({ color: 0x103840, emissive: hex, emissiveIntensity: 1.4, roughness: 0.3 });
    glowMats.push(m);
    return m;
  };
  const add = (geo, m, x = 0, y = 0, z = 0) => {
    const mesh = shadowed(new THREE.Mesh(geo, m));
    mesh.position.set(x, y, z);
    g.add(mesh);
    return mesh;
  };
  const rbox = (w, h, d, r) => new RoundedBoxGeometry(w, h, d, 3, r);

  // smooth capsule body
  const body = add(new THREE.CapsuleGeometry(0.03, 0.2, 6, 16).rotateX(Math.PI / 2), pearl, 0, AY, 0.03);
  body.scale.y = 1.1;
  add(rbox(0.012, 0.012, 0.2, 0.005), graphite, 0, AY + 0.036, 0.03); // top rail
  add(new THREE.CylinderGeometry(0.014, 0.014, 0.2, 14).rotateX(Math.PI / 2), graphite, 0, AY, 0.14); // barrel
  add(new THREE.TorusGeometry(0.02, 0.004, 8, 18), mkGlow(0x35e6ff), 0, AY, 0.245); // muzzle ring (cyan)
  add(new THREE.TorusGeometry(0.021, 0.0035, 8, 18), accent, 0, AY, 0.2);

  // grip + trigger
  const grip = add(rbox(0.036, 0.115, 0.045, 0.016), graphite, 0, -0.005, -0.012);
  grip.rotation.x = -0.18;
  add(rbox(0.008, 0.008, 0.07, 0.003), graphite, 0, 0.005, 0.04);
  const trig = add(rbox(0.008, 0.03, 0.01, 0.003), accent, 0, 0.025, 0.025);
  trig.rotation.x = 0.3;

  // side glow strips + sight
  for (const sx of [-1, 1]) add(rbox(0.004, 0.008, 0.12, 0.002), mkGlow(0x35e6ff), sx * 0.031, AY, 0.04);
  add(new THREE.SphereGeometry(0.006, 8, 8), mkGlow(0xff9a3a), 0, AY + 0.046, 0.13);
  add(rbox(0.014, 0.012, 0.01, 0.003), graphite, 0, AY + 0.04, -0.07);

  // loaded rocket (nok barrel se bahar)
  const rocketInGun = createRocketMesh();
  rocketInGun.position.set(0, AY, WEAPON.LOADED_Z);
  g.add(rocketInGun);

  const rocketSpawn = new THREE.Object3D();
  rocketSpawn.position.set(0, AY, WEAPON.LOADED_Z);
  g.add(rocketSpawn);
  const backPoint = new THREE.Object3D();
  backPoint.position.set(0, AY, -0.1);
  g.add(backPoint);

  return { group: g, rocketInGun, rocketSpawn, backPoint, glowMats };
}

/* ====================== PARTICLES (shader points) ====================== */
const VS = /* glsl */ `
  attribute float aSize; attribute float aAlpha; attribute vec3 aColor;
  uniform float uScale; varying float vAlpha; varying vec3 vColor;
  void main() {
    vAlpha = aAlpha; vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = min(aSize * uScale / max(-mv.z, 0.1), 256.0);
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

export class Particles {
  constructor(max, additive) {
    this.max = max;
    this.cursor = 0;
    const f = (n) => new Float32Array(max * n);
    this.pos = f(3); this.vel = f(3); this.c0 = f(3); this.c1 = f(3);
    this.life = f(1); this.maxLife = f(1); this.size0 = f(1); this.grow = f(1);
    this.alpha0 = f(1); this.drag = f(1); this.grav = f(1);
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
      transparent: true, depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    }));
    this.points.frustumCulled = false;
  }

  emit(p, v, life, size, grow, c0, c1, alpha = 1, drag = 0, grav = 0) {
    const i = this.cursor;
    this.cursor = (i + 1) % this.max;
    const k = i * 3;
    this.pos[k] = p.x; this.pos[k + 1] = p.y; this.pos[k + 2] = p.z;
    this.vel[k] = v.x; this.vel[k + 1] = v.y; this.vel[k + 2] = v.z;
    this.c0[k] = c0[0]; this.c0[k + 1] = c0[1]; this.c0[k + 2] = c0[2];
    this.c1[k] = c1[0]; this.c1[k + 1] = c1[1]; this.c1[k + 2] = c1[2];
    this.life[i] = this.maxLife[i] = life;
    this.size0[i] = size; this.grow[i] = grow; this.alpha0[i] = alpha;
    this.drag[i] = drag; this.grav[i] = grav;
  }

  update(dt) {
    for (let i = 0; i < this.max; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      const k = i * 3;
      if (this.life[i] <= 0) {
        this.aAlpha[i] = 0; this.aSize[i] = 0; this.pos[k + 1] = -999;
        continue;
      }
      const t = 1 - this.life[i] / this.maxLife[i];
      const dr = Math.exp(-this.drag[i] * dt);
      this.vel[k] *= dr; this.vel[k + 1] = this.vel[k + 1] * dr - this.grav[i] * dt; this.vel[k + 2] *= dr;
      this.pos[k] += this.vel[k] * dt;
      this.pos[k + 1] += this.vel[k + 1] * dt;
      this.pos[k + 2] += this.vel[k + 2] * dt;
      for (let c = 0; c < 3; c++) this.aColor[k + c] = this.c0[k + c] + (this.c1[k + c] - this.c0[k + c]) * t;
      this.aSize[i] = this.size0[i] * (1 + this.grow[i] * t);
      this.aAlpha[i] = this.alpha0[i] * Math.min(1, t * 10) * (1 - t);
    }
    const a = this.points.geometry.attributes;
    a.position.needsUpdate = a.aColor.needsUpdate = a.aSize.needsUpdate = a.aAlpha.needsUpdate = true;
  }
}

/* ====================== ROCKET SYSTEM ====================== */
const _v = new THREE.Vector3();
const _p = new THREE.Vector3();
const _w = new THREE.Vector3();
const _t = new THREE.Vector3();
const _u = new THREE.Vector3();
const _s = new THREE.Vector3();
const _tail = new THREE.Vector3();
const _prev = new THREE.Vector3();

const GOLD = [1, 0.85, 0.4];
const ORANGE = [1, 0.35, 0.05];
const FLAME0 = [1, 0.95, 0.7];   // garam core: safed-peela
const FLAME1 = [1, 0.35, 0.05];  // thanda hote hote orange
const CYAN0 = [0.6, 1, 1];
const CYAN1 = [0.1, 0.55, 1];

// d (normalized) ke perpendicular do axes (u, v)
function basis(d, u, v) {
  if (Math.abs(d.y) < 0.9) _t.set(0, 1, 0); else _t.set(1, 0, 0);
  u.crossVectors(d, _t).normalize();
  v.crossVectors(d, u);
}

export class RocketSystem {
  /*
    hit(pos)          => tree/pillar se takraya?
    creatureHit(a, b) => segment a->b creature se takraya? (info ya null)
    onCreatureHit(info)
    bubbleHit(a, b)   => health bubble se takraya? (point ya null)
  */
  constructor(scene, { hit = null, creatureHit = null, onCreatureHit = null, bubbleHit = null } = {}) {
    this.scene = scene;
    this.hit = hit;
    this.creatureHit = creatureHit;
    this.onCreatureHit = onCreatureHit;
    this.bubbleHit = bubbleHit;
    this.rockets = [];
    this.fx = new Particles(900, true);
    this.smoke = new Particles(520, false);
    scene.add(this.fx.points, this.smoke.points);

    // hamesha scene mein (intensity 0) => beech mein shader recompile nahi hota
    this.flash = new THREE.PointLight(0xffa550, 0, 40, 2);
    scene.add(this.flash);
    this.shake = 0;
  }

  launch(origin, dir) {
    const mesh = createRocketMesh();
    mesh.scale.setScalar(1.8); // udte waqt thoda dikhne layak
    mesh.position.copy(origin);
    mesh.quaternion.setFromUnitVectors(ZAXIS, dir);
    this.scene.add(mesh);
    const r = {
      mesh, pos: origin.clone(), dir: dir.clone(),
      vel: dir.clone().multiplyScalar(WEAPON.SPEED), life: WEAPON.LIFE,
      fa: 0, sa: 0, ma: 0, ph: Math.random() * 6.28,
      u: new THREE.Vector3(), v: new THREE.Vector3(),
    };
    basis(r.dir, r.u, r.v);
    this.rockets.push(r);
  }

  /* ---------- gun ka munh: fire karte waqt ---------- */
  blast(muzzle, dir) {
    basis(dir, _u, _s);

    // 1. teevra core flash (chhota, jaldi bujhta hai)
    _v.copy(dir).multiplyScalar(2);
    this.fx.emit(muzzle, _v, 0.09, 0.55, 1.2, FLAME0, FLAME1, 0.9, 0, 0);

    // 2. aage ki taraf chingaariyon ka cone
    for (let i = 0; i < 20; i++) {
      _v.copy(dir).multiplyScalar(rr(6, 16))
        .addScaledVector(_u, rr(-1, 1) * rr(0.8, 2.2))
        .addScaledVector(_s, rr(-1, 1) * rr(0.8, 2.2));
      this.fx.emit(muzzle, _v, rr(0.15, 0.4), rr(0.08, 0.16), -0.3, GOLD, ORANGE, 1, 2, 0);
    }

    // 3. cyan shock ring (gun ke cyan glow se match)
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      _v.copy(_u).multiplyScalar(Math.cos(a)).addScaledVector(_s, Math.sin(a)).multiplyScalar(rr(3, 4.5)).addScaledVector(dir, 1.5);
      this.fx.emit(muzzle, _v, 0.25, 0.1, -0.2, CYAN0, CYAN1, 0.9, 3, 0);
    }

    // 4. aage dhuan ka gubbaara
    for (let i = 0; i < 6; i++) {
      _v.set(rr(-0.4, 0.4), rr(0, 0.6), rr(-0.4, 0.4)).addScaledVector(dir, rr(2, 5));
      this.smoke.emit(muzzle, _v, rr(0.7, 1.2), rr(0.1, 0.2), 3.5, [0.82, 0.79, 0.75], [0.3, 0.3, 0.32], 0.4, 1.8, -0.2);
    }

    // 5. peeche/upar exhaust vent (halka, camera ke saamne na aaye)
    _p.copy(muzzle).addScaledVector(dir, -0.5);
    for (let i = 0; i < 6; i++) {
      _v.set(rr(-0.6, 0.6), rr(1.2, 2.6), rr(-0.6, 0.6)).addScaledVector(dir, -rr(0.5, 1.6));
      this.fx.emit(_p, _v, rr(0.15, 0.3), rr(0.05, 0.1), -0.3, GOLD, ORANGE, 0.7, 2, 3);
    }
    for (let i = 0; i < 4; i++) {
      _v.set(rr(-0.3, 0.3), rr(0.6, 1.4), rr(-0.3, 0.3)).addScaledVector(dir, -rr(0.3, 1));
      this.smoke.emit(_p, _v, rr(0.6, 1.0), rr(0.08, 0.14), 3, [0.78, 0.75, 0.72], [0.3, 0.3, 0.32], 0.3, 1.5, -0.3);
    }

    this.flash.position.copy(muzzle);
    this.flash.intensity = 9;
  }

  // reload ke "click" par chhoti chingaari + cyan ring
  sparkle(pos) {
    for (let i = 0; i < 14; i++) {
      _v.set(rr(-1, 1), rr(-0.2, 1), rr(-1, 1)).multiplyScalar(rr(1, 3));
      this.fx.emit(pos, _v, rr(0.25, 0.5), rr(0.05, 0.1), -0.2, GOLD, ORANGE, 1, 1, 6);
    }
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      _v.set(Math.cos(a), 0.15, Math.sin(a)).multiplyScalar(rr(1.5, 2.2));
      this.fx.emit(pos, _v, 0.25, 0.07, -0.2, CYAN0, CYAN1, 0.9, 3, 0);
    }
  }

  /* ---------- dhamaka ---------- */
  // s = size (creature par chhota pop, ground/tree par thoda bada)
  _explode(p, camera, s = 1) {
    if (p.y < 0.05) p.y = 0.05;
    const n = (k) => Math.max(2, Math.round(k * s));

    // 1. core flash (alpha kam rakha hai taaki aankhein na chaundhiyayein)
    this.fx.emit(p, _v.set(0, 0, 0), 0.14, 1.5 * s, 0.6, [1, 0.95, 0.7], [1, 0.5, 0.1], 0.85, 0, 0);

    // 2. fireball: bade, naram, orange -> gehra laal
    for (let i = 0; i < n(6); i++) {
      _v.set(rr(-1, 1), rr(-0.3, 1), rr(-1, 1)).normalize().multiplyScalar(rr(0.6, 2.2));
      this.fx.emit(p, _v, rr(0.3, 0.55), rr(1.0, 1.7) * s, 1.0, [1, 0.8, 0.35], [0.6, 0.08, 0.02], 0.75, 3, -0.8);
    }

    // 3. zameen par phailti shockwave ring
    const R = n(26);
    for (let i = 0; i < R; i++) {
      const a = (i / R) * Math.PI * 2;
      _v.set(Math.cos(a), 0.04, Math.sin(a)).multiplyScalar(rr(7, 10));
      this.fx.emit(p, _v, rr(0.25, 0.4), rr(0.18, 0.3) * s, 0.5, [1, 0.9, 0.6], [1, 0.4, 0.1], 0.8, 5, 0);
    }

    // 4. garam malba (orange chingaariyan)
    for (let i = 0; i < n(22); i++) {
      _v.set(rr(-1, 1), rr(-0.2, 1.2), rr(-1, 1)).normalize().multiplyScalar(rr(2, 8));
      this.fx.emit(p, _v, rr(0.3, 0.7), rr(0.25, 0.6) * s, 1, [1, 0.75, 0.3], [0.8, 0.12, 0.02], 0.9, 2.2, -1.5);
    }

    // 5. rangeen chingaariyan (tez, gravity se girti)
    for (let i = 0; i < n(40); i++) {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      _v.set(rr(-1, 1), rr(0.1, 1.4), rr(-1, 1)).normalize().multiplyScalar(rr(5, 14));
      this.fx.emit(p, _v, rr(0.5, 1.1), rr(0.08, 0.14), -0.3, c, [c[0], c[1] * 0.4, 0.05], 1, 0.6, 12);
    }

    // 6. glitter: dheere tairti, jhilmilati chingaariyan
    for (let i = 0; i < n(22); i++) {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      _v.set(rr(-1, 1), rr(-0.2, 1), rr(-1, 1)).normalize().multiplyScalar(rr(1.5, 5));
      this.fx.emit(p, _v, rr(1.1, 1.8), rr(0.06, 0.1), -0.2, c, [c[0] * 0.6, c[1] * 0.4, 0.1], 1, 0.8, 2.5);
    }

    // 7. dhuan: bade billows + zameen par ring
    for (let i = 0; i < n(12); i++) {
      _v.set(rr(-1, 1), rr(0.2, 1.2), rr(-1, 1)).normalize().multiplyScalar(rr(1, 3));
      _p.copy(p).addScaledVector(_v, 0.2);
      this.smoke.emit(_p, _v, rr(1, 2.2), rr(0.5, 1.0) * s, 2.2, [0.32, 0.28, 0.25], [0.12, 0.12, 0.12], 0.55, 1.2, -0.5);
    }
    for (let i = 0; i < n(10); i++) {
      const a = (i / n(10)) * Math.PI * 2;
      _v.set(Math.cos(a), 0.05, Math.sin(a)).multiplyScalar(rr(4, 8));
      this.smoke.emit(p, _v, rr(0.7, 1.3), rr(0.5, 0.8), 3, [0.45, 0.4, 0.33], [0.25, 0.23, 0.2], 0.4, 3, 0);
    }

    this.flash.position.set(p.x, p.y + 1, p.z);
    this.flash.intensity = 40 * s;
    const dist = camera ? camera.position.distanceTo(p) : 999;
    this.shake = Math.max(this.shake, THREE.MathUtils.clamp(1 - dist / 40, 0, 1) * 0.6 * s);
  }

  update(dt, _time, camera) {
    const h = window.innerHeight * Math.min(window.devicePixelRatio || 1, 1.5);
    const scale = h / (2 * Math.tan((camera.fov * Math.PI) / 360));
    this.fx.uniforms.uScale.value = scale;
    this.smoke.uniforms.uScale.value = scale;

    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      _prev.copy(r.pos);
      r.pos.addScaledVector(r.vel, dt);
      r.mesh.position.copy(r.pos);
      r.life -= dt;

      /* ---- exhaust: flame core + spiral sparks + dhuan ---- */
      r.ph += dt * 45;
      r.fa += dt * 150;
      r.sa += dt * 70;
      r.ma += dt * 55;
      _tail.copy(r.dir).multiplyScalar(-0.28);

      // peeche ek garam chamakta core
      _p.copy(r.pos).add(_tail);
      this.fx.emit(_p, _v.set(0, 0, 0), 0.07, 0.5, -0.4, FLAME0, FLAME1, 0.7, 0, 0);

      // lau (flame): rocket ke raaste mein barabar failaayi hui
      while (r.fa >= 1) {
        r.fa -= 1;
        _p.lerpVectors(_prev, r.pos, Math.random()).add(_tail);
        _v.set(rr(-0.3, 0.3), rr(-0.3, 0.3), rr(-0.3, 0.3)).addScaledVector(r.dir, -rr(2, 5));
        this.fx.emit(_p, _v, rr(0.1, 0.2), rr(0.13, 0.22), -0.6, FLAME0, FLAME1, 1, 1.5, 0);
      }

      // spiral (corkscrew) chingaariyan
      while (r.sa >= 1) {
        r.sa -= 1;
        const a = r.ph + Math.random() * 0.8;
        _w.copy(r.u).multiplyScalar(Math.cos(a)).addScaledVector(r.v, Math.sin(a));
        _p.lerpVectors(_prev, r.pos, Math.random()).add(_tail).addScaledVector(_w, 0.06);
        _v.copy(_w).multiplyScalar(rr(0.6, 1.6)).addScaledVector(r.dir, -rr(1, 3));
        this.fx.emit(_p, _v, rr(0.35, 0.7), rr(0.06, 0.1), -0.3, GOLD, ORANGE, 1, 0.6, 5);
      }

      // lamba, ghana dhuan
      while (r.ma >= 1) {
        r.ma -= 1;
        _p.lerpVectors(_prev, r.pos, Math.random()).add(_tail);
        _v.set(rr(-0.3, 0.3), rr(0.1, 0.4), rr(-0.3, 0.3));
        this.smoke.emit(_p, _v, rr(1.0, 1.8), rr(0.1, 0.16), 5, [0.8, 0.77, 0.72], [0.35, 0.35, 0.37], 0.38, 0.9, -0.25);
      }

      // udta rocket aas-paas ki cheezon ko halki roshni deta hai
      this.flash.position.copy(r.pos);
      this.flash.intensity = Math.max(this.flash.intensity, 5);

      // creature se takraya?
      const info = this.creatureHit ? this.creatureHit(_prev, r.pos) : null;
      if (info) {
        if (this.onCreatureHit) this.onCreatureHit(info);
        this._explode(info.point.clone(), camera, 0.55);
        this.scene.remove(r.mesh);
        this.rockets.splice(i, 1);
        continue;
      }

      // health bubble se takraya?
      const bp = this.bubbleHit ? this.bubbleHit(_prev, r.pos) : null;
      if (bp) {
        this._explode(bp, camera, 0.3);
        this.scene.remove(r.mesh);
        this.rockets.splice(i, 1);
        continue;
      }

      if (r.pos.y <= 0.05 || r.life <= 0 || (this.hit && this.hit(r.pos))) {
        this._explode(r.pos.clone(), camera, 0.8);
        this.scene.remove(r.mesh);
        this.rockets.splice(i, 1);
      }
    }

    this.flash.intensity = THREE.MathUtils.damp(this.flash.intensity, 0, 14, dt);
    this.shake = Math.max(0, this.shake - dt * 2.2);
    this.fx.update(dt);
    this.smoke.update(dt);
  }
}