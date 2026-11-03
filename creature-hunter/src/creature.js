import * as THREE from 'three';

const { damp, clamp, lerp } = THREE.MathUtils;
const UP = new THREE.Vector3(0, 1, 0);
const _c = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _m = new THREE.Vector3();

/* ====================== FULJHADI (poonchh ki nok par barood jalta hua) ====================== */
class Sparkler {
  constructor(n = 90) {
    this.n = n;
    this.pos = new Float32Array(n * 3);
    this.col = new Float32Array(n * 3);
    this.vel = new Float32Array(n * 3);
    this.life = new Float32Array(n);
    this.max = new Float32Array(n);
    for (let i = 0; i < n; i++) this.pos[i * 3 + 1] = -999;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    this.points = new THREE.Points(g, new THREE.PointsMaterial({
      size: 0.1, vertexColors: true, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, toneMapped: false,
    }));
    this.points.frustumCulled = false;
    this.cursor = 0;
    this.acc = 0;
  }

  _emit(o) {
    const i = this.cursor;
    this.cursor = (i + 1) % this.n;
    const k = i * 3;
    this.pos[k] = o.x + (Math.random() - 0.5) * 0.04;
    this.pos[k + 1] = o.y + (Math.random() - 0.5) * 0.04;
    this.pos[k + 2] = o.z + (Math.random() - 0.5) * 0.04;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    const sp = 1.2 + Math.random() * Math.random() * 4;
    this.vel[k] = Math.sin(ph) * Math.cos(th) * sp;
    this.vel[k + 1] = Math.cos(ph) * sp;
    this.vel[k + 2] = Math.sin(ph) * Math.sin(th) * sp;
    this.life[i] = this.max[i] = 0.25 + Math.random() * 0.45;
  }

  // origin = null => nayi chingaari nahi, purani bas bujhti rahein
  update(dt, origin) {
    if (origin) {
      this.acc += dt * 140;
      while (this.acc >= 1) { this.acc -= 1; this._emit(origin); }
    }
    for (let i = 0; i < this.n; i++) {
      const k = i * 3;
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        this.col[k] = this.col[k + 1] = this.col[k + 2] = 0;
        this.pos[k + 1] = -999;
        continue;
      }
      this.vel[k + 1] -= 5 * dt;
      this.pos[k] += this.vel[k] * dt;
      this.pos[k + 1] += this.vel[k + 1] * dt;
      this.pos[k + 2] += this.vel[k + 2] * dt;
      const t = this.life[i] / this.max[i];
      this.col[k] = t;
      this.col[k + 1] = 0.25 + 0.75 * t * t;
      this.col[k + 2] = 0.05 + 0.45 * t * t * t;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.color.needsUpdate = true;
  }
}

export const CREATURE = {
  WALK: 1.5,
  RUN: 5,
  SHY: true,        // true = player paas aaye to ye door bhaag jaata hai
  FLEE_DIST: 7,
  SAFE_DIST: 12,
  ATTACK_RANGE: 30,
  ATTACK_STAND: 18,
  THROW_WINDUP: 0.7,
  COOLDOWN_MIN: 3.5,
  COOLDOWN_MAX: 6,
  BASE_Y: 0.82,     // body ki ooncha'i (paer zameen par tikane ke liye)
  HP: 100,
  BODY_DAMAGE: 50,  // body par lagne par
  LAUNCH_TIME: 0.6, // marne ke baad skyshot ki tarah udne ka time
  SCALE: 1.5,
  GLOW: 0xffa040,
  HEAD_PRIORITY: 0.7,
  STALK_SPEED: 2.4,  // chalte hue speed (WALK 1.5 aur RUN 5 ke beech)
  LEG_MIN: 1.4,      // kitni der ek taraf, phir direction badle
  LEG_MAX: 2.6,
  THROW_HOLD: 0.4,   // phenkne ke baad itni der ruka rehta hai
};

const COL = {
  skin: 0xd49a68, skinDark: 0xb27448, fur: 0x8e4a2a, furDark: 0x4a2c26,
  tail: 0xb2602e, tailTip: 0x3f2a3a, hair: 0x4b2a28, leaf: 0x5a5c3d, leafDark: 0x3f4230,
  wrap: 0x4a3426, claw: 0x2e2224, inner: 0xd98a5a, eye: 0xffc233,
};

let _glowTex = null;
function getGlowTex() {
  if (_glowTex) return _glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,0.9)');
  grd.addColorStop(0.4, 'rgba(255,255,255,0.35)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  _glowTex = new THREE.CanvasTexture(c);
  _glowTex.colorSpace = THREE.SRGBColorSpace;
  return _glowTex;
}

function raySphere(o, d, c, r ) {
  const ox = o.x - c.x, oy = o.y - c.y, oz = o.z - c.z;
  const b = ox * d.x + oy * d.y + oz * d.z;
  const cc = ox * ox + oy * oy + oz * oz - r * r;
  const disc = b * b - cc;
  if (disc < 0) return null;
  const sq = Math.sqrt(disc);
  let t = -b - sq;
  if (t < 0) t = -b + sq;
  return t >= 0 ? (-b - sq < 0 ? 0 : t) : null;
}

/* ====================== ek Forest Crawler ====================== */
export class Creature {
  constructor({ home = new THREE.Vector3(), area = 200 } = {}) {
    this.root = new THREE.Group();
    this.home = home.clone();
    this.area = area;
    this.root.position.copy(home);
    this.facing = Math.random() * Math.PI * 2;
    this.root.rotation.y = this.facing;
    this.root.scale.setScalar(CREATURE.SCALE);

    this.state = 'idle'; // idle | walk | flee | launch | gone
    this.timer = 1 + Math.random() * 3;
    this.speed = 0;
    this.phase = Math.random() * 6.28;
    this.seed = Math.random() * 100;
    this.target = new THREE.Vector3();
    this.headYaw = 0;
    this.pose = {};

    this.maxHp = CREATURE.HP;
    this.hp = this.maxHp;
    this.flash = 0;
    this._flashOn = false;
    this.barT = 0;
    this.launchT = 0;
    this.launchFrom = new THREE.Vector3();
    this.launchTo = new THREE.Vector3();
    this.plan = null;
    this.burstDone = false;
    this.respawnT = 0;
    this.crackers = null;
    this.attackCD = 2 + Math.random() * 3;
    this.windup = 0;
    this.pendingType = null;
    this.mouthOpen = 0;
    this.hold = 0;
    this.legT = 0;
    this.strafeDir = Math.random() < 0.5 ? 1 : -1;
    this._build();
  }

  get alive() {
    return this.state === 'idle' || this.state === 'walk' || this.state === 'flee' || this.state === 'attack';
  }

  /* ---------------- MODEL ---------------- */
  _build() {
    const flat = (color, extra = {}) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, flatShading: true, ...extra });
    const mat = {};
    for (const k of Object.keys(COL)) mat[k] = flat(COL[k]);
    mat.eye = flat(COL.eye, { emissive: 0xffb020, emissiveIntensity: 2.2, roughness: 0.3 });
    // damage flash ke liye (aankhein chhod kar)
    this.mats = Object.keys(mat).filter((k) => k !== 'eye').map((k) => mat[k]);

    // halki apni roshni (body khud thodi chamakti hai)
    const GLOW_BODY = {
      skin: 0x4a2208, skinDark: 0x3a1a06, fur: 0x3a1608, furDark: 0x1c0c0a, tail: 0x4a2208,
      tailTip: 0x201020, hair: 0x2a1008, leaf: 0x12180a, leafDark: 0x0a1006, wrap: 0x1a1008,
      claw: 0x000000, inner: 0x502010,
    };
    for (const k of Object.keys(mat)) {
      if (k === 'eye') continue;
      mat[k].emissive.setHex(GLOW_BODY[k] || 0);
      mat[k].userData.glow = new THREE.Color(GLOW_BODY[k] || 0);
    }

    const add = (parent, geo, m, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1) => {
      const mesh = new THREE.Mesh(geo, m);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      mesh.castShadow = true;
      parent.add(mesh);
      return mesh;
    };
    const ico = (r, d = 1) => new THREE.IcosahedronGeometry(r, d);
    const cone = (r, h, seg = 4) => new THREE.ConeGeometry(r, h, seg);
    const cap = (r, l) => new THREE.CapsuleGeometry(r, l, 3, 8);
    const spike = (parent, m, pos, dir, r, h) => {
      const mesh = add(parent, cone(r, h, 4), m, pos[0], pos[1], pos[2]);
      mesh.quaternion.setFromUnitVectors(UP, new THREE.Vector3(...dir).normalize());
      mesh.translateY(h / 2);
      return mesh;
    };
    const claws = (parent, m, y, z, n = 3, spread = 0.045) => {
      for (let i = 0; i < n; i++) {
        const x = (i - (n - 1) / 2) * spread * 2;
        spike(parent, m, [x, y, z], [x * 2, -0.35, 1], 0.02, 0.11);
      }
    };

    this.body = new THREE.Group();
    this.body.position.y = CREATURE.BASE_Y;
    this.root.add(this.body);
    this.front = new THREE.Group();
    this.rear = new THREE.Group();
    this.body.add(this.front, this.rear);

    /* ----- torso ----- */
    add(this.front, ico(0.34), mat.skin, 0, 0.08, 0.38, 1, 0.95, 1.15);
    add(this.front, ico(0.27), mat.skinDark, 0, 0, -0.1);
    add(this.rear, ico(0.3), mat.fur, 0, -0.02, -0.55, 1, 1, 1.1);
    add(this.front, ico(0.16), mat.skin, 0, 0.2, 0.68);

    const leaves = [
      [0, 0.38, 0.5, 1], [0.15, 0.36, 0.28, 1.1], [-0.15, 0.36, 0.28, 1.1], [0, 0.32, 0.05, 1.2],
      [0.16, 0.28, -0.12, 1.1], [-0.16, 0.28, -0.12, 1.1], [0, 0.26, -0.28, 1.3],
    ];
    leaves.forEach(([x, y, z, k], i) => {
      const m = add(this.front, cone(0.17, 0.5 * k, 4), i % 2 ? mat.leaf : mat.leafDark, x, y - 0.04, z - 0.2, 1.4, 1, 0.3);
      m.rotation.x = -Math.PI / 2 - 0.4;
    });

    /* ----- head ----- */
    this.head = new THREE.Group();
    this.head.position.set(0, 0.3, 0.86);
    this.front.add(this.head);

    add(this.head, ico(0.19), mat.skin, 0, 0, 0, 0.95, 1, 1.05);
    this.mouth = add(this.head, ico(0.09), mat.skinDark, 0, -0.07, 0.13, 1, 0.7, 0.9);
    this.mouthObj = new THREE.Object3D(); // cracker yahin se niklega
    this.mouthObj.position.set(0, -0.08, 0.24);
    this.head.add(this.mouthObj);
    this.mouthGlow = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.05, 1),
      new THREE.MeshBasicMaterial({ color: 0xffa040, toneMapped: false })
    );
    this.mouthGlow.position.set(0, -0.09, 0.2);
    this.mouthGlow.visible = false;
    this.head.add(this.mouthGlow);
    const nose = add(this.head, cone(0.025, 0.07, 4), mat.furDark, 0, -0.03, 0.2);
    nose.rotation.x = Math.PI / 2;

    for (const side of [1, -1]) {
      add(this.head, ico(0.028), mat.eye, side * 0.075, 0.035, 0.165, 1, 0.8, 0.6);
      const brow = add(this.head, new THREE.BoxGeometry(0.1, 0.022, 0.03), mat.hair, side * 0.075, 0.085, 0.172);
      brow.rotation.z = side * 0.35;
    }

    add(this.head, ico(0.205), mat.hair, 0, 0.09, -0.045, 1.02, 0.75, 1.05);
    const spikes = [
      [[0, 0.17, 0.1], [0, 1, 0.5]], [[0.1, 0.16, 0.06], [0.6, 1, 0.3]], [[-0.1, 0.16, 0.06], [-0.6, 1, 0.3]],
      [[0, 0.22, -0.05], [0, 1, -0.4]], [[0.12, 0.18, -0.08], [0.7, 0.8, -0.6]], [[-0.12, 0.18, -0.08], [-0.7, 0.8, -0.6]],
      [[0, 0.12, -0.2], [0, 0.5, -1]], [[0.1, 0.1, -0.17], [0.6, 0.3, -1]], [[-0.1, 0.1, -0.17], [-0.6, 0.3, -1]],
      [[0.17, 0.03, 0.02], [0.5, -1, 0.2]], [[-0.17, 0.03, 0.02], [-0.5, -1, 0.2]],
    ];
    spikes.forEach(([p, d]) => spike(this.head, mat.hair, p, d, 0.06, 0.22));

    this.ears = [];
    for (const side of [1, -1]) {
      const ear = new THREE.Group();
      ear.position.set(side * 0.13, 0.2, -0.03);
      ear.rotation.z = -side * 0.4;
      ear.rotation.x = -0.15;
      const outer = add(ear, cone(0.08, 0.3, 4), mat.hair, 0, 0.13, 0);
      outer.scale.z = 0.7;
      add(ear, cone(0.05, 0.22, 4), mat.inner, 0, 0.11, 0.03, 1, 1, 0.5);
      this.head.add(ear);
      this.ears.push(ear);
    }

    /* ----- arms ----- */
    const makeArm = (side) => {
      const shoulder = new THREE.Group();
      shoulder.position.set(side * 0.34, 0.08, 0.42);
      add(shoulder, ico(0.13), mat.skin, 0, 0, 0);
      add(shoulder, cap(0.08, 0.3), mat.skin, 0, -0.23, 0);
      const elbow = new THREE.Group();
      elbow.position.y = -0.46;
      shoulder.add(elbow);
      add(elbow, cap(0.07, 0.3), mat.skin, 0, -0.22, 0);
      add(elbow, new THREE.CylinderGeometry(0.088, 0.092, 0.16, 6), mat.wrap, 0, -0.3, 0);
      const wrist = new THREE.Group();
      wrist.position.y = -0.45;
      elbow.add(wrist);
      add(wrist, ico(0.09), mat.skin, 0, -0.03, 0.05, 1, 0.55, 1.3);
      claws(wrist, mat.claw, -0.05, 0.15, 4, 0.035);
      this.front.add(shoulder);
      return { shoulder, elbow, wrist };
    };
    const AL = makeArm(1), AR = makeArm(-1);
    this.lArm = AL.shoulder; this.lElbow = AL.elbow; this.lWrist = AL.wrist;
    this.rArm = AR.shoulder; this.rElbow = AR.elbow; this.rWrist = AR.wrist;

    /* ----- legs ----- */
    const makeLeg = (side) => {
      const thigh = new THREE.Group();
      thigh.position.set(side * 0.26, -0.02, -0.55);
      add(thigh, cap(0.13, 0.16), mat.fur, 0, -0.21, 0);
      const knee = new THREE.Group();
      knee.position.y = -0.42;
      thigh.add(knee);
      add(knee, cap(0.09, 0.29), mat.furDark, 0, -0.235, 0);
      const ankle = new THREE.Group();
      ankle.position.y = -0.47;
      knee.add(ankle);
      add(ankle, ico(0.1), mat.furDark, 0, -0.04, 0.09, 1, 0.5, 1.5);
      claws(ankle, mat.claw, -0.05, 0.22, 3, 0.04);
      this.rear.add(thigh);
      return { thigh, knee, ankle };
    };
    const LL = makeLeg(1), LR = makeLeg(-1);
    this.lThigh = LL.thigh; this.lKnee = LL.knee; this.lAnkle = LL.ankle;
    this.rThigh = LR.thigh; this.rKnee = LR.knee; this.rAnkle = LR.ankle;

    /* ----- tail ----- */
    this.tail = new THREE.Group();
    this.tail.position.set(0, 0.05, -0.82);
    this.rear.add(this.tail);
    const seg = (parent, len, buildMesh) => {
      const g = new THREE.Group();
      buildMesh(g, len);
      parent.add(g);
      return g;
    };
    const tipMesh = (r, m) => (g, len) => {
      const mesh = add(g, cone(r, len, 6), m, 0, 0, -len / 2);
      mesh.rotation.x = -Math.PI / 2;
    };
    this.tailSegs = [];
    const s1 = seg(this.tail, 0.5, tipMesh(0.13, mat.tail));
    const s2 = seg(s1, 0.5, (g) => add(g, ico(0.17), mat.tail, 0, 0, -0.25, 1, 1, 1.7));
    s2.position.z = -0.5;
    const s3 = seg(s2, 0.45, tipMesh(0.15, mat.tailTip));
    s3.position.z = -0.5;
    this.tailSegs.push(s1, s2, s3);

    // fuljhadi
    this.tipObj = new THREE.Object3D();
    this.tipObj.position.z = -0.46;
    s3.add(this.tipObj);
    this.tipGlow = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.07, 1),
      new THREE.MeshBasicMaterial({ color: 0xffe08a, toneMapped: false })
    );
    this.tipGlow.position.z = -0.46;
    s3.add(this.tipGlow);
    this.sparks = new Sparkler(90);
    this._tipPos = new THREE.Vector3();

    /* ----- hit spheres: head = instant kill, baaki body = 50 damage ----- */
    const marker = (parent, x, y, z, r, part) => {
      const o = new THREE.Object3D();
      o.position.set(x, y, z);
      parent.add(o);
      return { obj: o, r, part };
    };
    this.hitSpheres = [
      marker(this.head, 0, 0.08, -0.02, 0.3, 'head'),   // sar (hair/spikes samet)
      marker(this.front, 0, 0.05, 0.3, 0.42, 'body'),   // seena (sar se door, overlap kam)
      marker(this.front, 0, 0, -0.1, 0.38, 'body'),
      marker(this.rear, 0, -0.02, -0.55, 0.4, 'body'),
      marker(this.root, 0, 0.45, 0, 0.5, 'body'),   // pair/neeche ka hissa
    ];

    /* ----- HP bar ----- */
    this.bar = new THREE.Group();
    this.bar.position.set(0, 1.95, 0);
    this.bar.visible = false;
    const bgM = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.65, depthWrite: false, fog: false });
    this.barFgM = new THREE.MeshBasicMaterial({ color: 0x44ff66, depthWrite: false, fog: false });
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.1), bgM);
    this.barFg = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 0.055), this.barFgM);
    this.barFg.position.z = 0.002;
    bg.renderOrder = 10; this.barFg.renderOrder = 11;
    this.bar.add(bg, this.barFg);
    this.root.add(this.bar);

    // glow: peeche halo + zameen par roshni ka ghera
    const gt = getGlowTex();
    this.halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: gt, color: CREATURE.GLOW, transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false,
    }));
    this.halo.scale.set(3.2, 3.2, 1);
    this.halo.position.set(0, 1.0, 0);
    this.root.add(this.halo);
    this.pool = new THREE.Mesh(
      new THREE.CircleGeometry(1.8, 24).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({
        map: gt, color: CREATURE.GLOW, transparent: true, opacity: 0.35,
        blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false,
      })
    );
    this.pool.position.y = 0.04;
    this.root.add(this.pool);
  }

  /* ---------------- HIT / DAMAGE ---------------- */
  // ray (o, d normalized) => { creature, part, t, point } ya null
  intersectRay(o, d, maxD = 120) {
    if (!this.alive) return null;
    let headT = null, bodyT = null;
    const near = clamp(1 - o.distanceTo(this.root.position) / 16, 0, 1) * 0.55; // paas ho to body area thoda bada
    for (const s of this.hitSpheres) {
      s.obj.getWorldPosition(_c);
      const t = raySphere(o, d, _c, s.r * CREATURE.SCALE + (s.part === 'body' ? near : 0));
      if (t === null || t > maxD) continue;
      if (s.part === 'head') headT = headT === null ? t : Math.min(headT, t);
      else bodyT = bodyT === null ? t : Math.min(bodyT, t);
    }
    if (headT === null && bodyT === null) return null;
    const isHead = headT !== null && (bodyT === null || headT <= bodyT + CREATURE.HEAD_PRIORITY);
    const t = isHead ? headT : bodyT;
    return { creature: this, part: isHead ? 'head' : 'body', t, point: new THREE.Vector3().copy(o).addScaledVector(d, t) };
  }

  // rocket ka raasta (a -> b)
  intersectSegment(a, b) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const L = dir.length();
    if (L < 1e-6) return null;
    dir.multiplyScalar(1 / L);
    return this.intersectRay(a, dir, L);
  }

  // chalne ki speed (lead aim ke liye)
  getVelocity(out) {
    return out.set(Math.sin(this.facing) * this.speed, 0, Math.cos(this.facing) * this.speed);
  }

  damage(amount) {
    if (!this.alive) return false;
    this.hp = Math.max(0, this.hp - amount);
    this.flash = 1;
    this.barT = 3;
    this._setBar();
    return this.hp <= 0;
  }

  _setBar() {
    const r = this.hp / this.maxHp;
    this.barFg.scale.x = Math.max(r, 0.001);
    this.barFg.position.x = -(1 - r) * 0.42;
    this.barFgM.color.setHex(r > 0.6 ? 0x44ff66 : r > 0.3 ? 0xffcc33 : 0xff3b30);
  }

  startLaunch(to) {
    this.state = 'launch';
    this.launchT = 0;
    this.launchFrom.copy(this.root.position);
    this.launchTo.copy(to);
    this.bar.visible = false;
    this.windup = 0;
    this.hold = 0;
  }

  respawn(pos) {
    this.state = 'idle';
    this.timer = 1 + Math.random() * 2;
    this.hp = this.maxHp;
    this.flash = 0;
    this.barT = 0;
    this.speed = 0;
    this.burstDone = false;
    this.plan = null;
    this.root.visible = true;
    this.root.scale.setScalar(CREATURE.SCALE);
    this.root.position.copy(pos);
    this.home.copy(pos);
    this._setBar();
    this.windup = 0;
    this.hold = 0;
  }

  /* ---------------- AI ---------------- */
  update(dt, time, playerPos, collide, camera) {
    // damage flash (laal chamak)
    if (this.flash > 0.01 || this._flashOn) {
      this.flash = Math.max(0, this.flash - dt * 4);
      const f = this.flash;
      for (const m of this.mats) {
        const g = m.userData.glow;
        m.emissive.setRGB(g.r + f * 0.9, g.g + f * 0.1, g.b + f * 0.05);
      }
      this._flashOn = this.flash > 0.01;
    }

    // HP bar (camera ki taraf muh karke)
    this.barT -= dt;
    this.bar.visible = this.barT > 0 && this.alive;
    if (this.bar.visible && camera) {
      _q.copy(this.root.quaternion).invert().multiply(camera.quaternion);
      this.bar.quaternion.copy(_q);
    }

    if (this.state === 'gone') {
      this.sparks.update(dt, null);
      return;
    }

    if (this.state === 'launch') {
      // skyshot ki tarah upar udta hai
      this.launchT += dt;
      const u = Math.min(1, this.launchT / CREATURE.LAUNCH_TIME);
      this.root.position.lerpVectors(this.launchFrom, this.launchTo, u * u);
      this.root.scale.setScalar(lerp(CREATURE.SCALE, CREATURE.SCALE * 0.4, u));
      this.facing += dt * 14;
      this.root.rotation.y = this.facing;
      this.speed = 3;
      this._animate(dt, time);
      this._afterAnimate(dt, true);
      if (u >= 1) {
        this.state = 'gone';
        this.root.visible = false;
      }
      return;
    }

    const C = CREATURE;
    const pos = this.root.position;
    const dx = playerPos.x - pos.x;
    const dz = playerPos.z - pos.z;
    const pd = Math.hypot(dx, dz);

    if (C.SHY && pd < C.FLEE_DIST && this.state !== 'flee') this.state = 'flee';
    if (this.crackers) {
      if (this.state === 'attack' && pd > C.ATTACK_RANGE + 4) this.state = 'idle';
      else if ((this.state === 'idle' || this.state === 'walk') && pd < C.ATTACK_RANGE) this.state = 'attack';
    }

    let desired = this.facing;
    let targetSpeed = 0;

    if (this.state === 'idle') {
      this.timer -= dt;
      if (this.timer <= 0) {
        const a = Math.random() * Math.PI * 2;
        const r = 5 + Math.random() * 10;
        this.target.set(
          clamp(this.home.x + Math.cos(a) * r, -this.area, this.area), 0,
          clamp(this.home.z + Math.sin(a) * r, -this.area, this.area)
        );
        this.state = 'walk';
      }
    } else if (this.state === 'walk') {
      const tx = this.target.x - pos.x, tz = this.target.z - pos.z;
      if (Math.hypot(tx, tz) < 0.8) {
        this.state = 'idle';
        this.timer = 2 + Math.random() * 4;
      } else {
        desired = Math.atan2(tx, tz);
        targetSpeed = C.WALK;
      }
    } else if (this.state === 'attack') {
      const toP = Math.atan2(dx, dz); // player ki disha
      if (this.windup > 0) {
        // ruk kar phenkna (body wahi, sar player ki taraf)
        desired = this.facing;
        targetSpeed = 0;
        this.windup -= dt;
        if (this.windup <= 0) {
          this.mouthObj.getWorldPosition(_m);
          const ok = this.crackers.throwFrom(this.pendingType, _m, playerPos);
          this.attackCD = ok ? C.COOLDOWN_MIN + Math.random() * (C.COOLDOWN_MAX - C.COOLDOWN_MIN) : 1;
          this.hold = ok ? C.THROW_HOLD : 0;
        }
      } else if (this.hold > 0) {
        desired = this.facing;
        targetSpeed = 0;
        this.hold -= dt;
      } else {
        // chalte raho: player ke aas-paas tirchhe (diagonal)
        this.legT -= dt;
        if (this.legT <= 0) {
          if (Math.random() < 0.6) this.strafeDir *= -1;
          this.legT = C.LEG_MIN + Math.random() * (C.LEG_MAX - C.LEG_MIN);
        }
        // door => player ki taraf badho (chhota angle), paas => side/peeche (bada angle)
        const k = clamp((20 - pd) / 10, 0, 1);
        desired = toP + this.strafeDir * lerp(0.6, 1.75, k);
        targetSpeed = C.STALK_SPEED;

        this.attackCD -= dt;
        if (this.attackCD <= 0 && this.crackers.canThrow()) {
          this.pendingType = this.crackers.pickType(pd);
          this.windup = C.THROW_WINDUP;
        }
      }
    } else {
      desired = Math.atan2(-dx, -dz);
      targetSpeed = C.RUN;
      if (pd > C.SAFE_DIST) {
        this.state = 'idle';
        this.timer = 1 + Math.random() * 2;
        this.home.copy(pos);
      }
    }

    let diff = desired - this.facing;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    this.facing += diff * (1 - Math.exp(-(this.state === 'flee' ? 10 : 5) * dt));
    if (Math.abs(diff) > 1) targetSpeed *= 0.3;

    this.speed = damp(this.speed, targetSpeed, targetSpeed < this.speed ? 7 : 4, dt);
    pos.x += Math.sin(this.facing) * this.speed * dt;
    pos.z += Math.cos(this.facing) * this.speed * dt;
    pos.x = clamp(pos.x, -this.area, this.area);
    pos.z = clamp(pos.z, -this.area, this.area);
    if (collide) collide(pos, 0.8 * C.SCALE);
    this.root.rotation.y = this.facing;

    let headT = 0;
    if (pd < 32) {
      let a = Math.atan2(dx, dz) - this.facing;
      a = Math.atan2(Math.sin(a), Math.cos(a));
      headT = clamp(a, -1.75, 1.75);
    }
    this.headYaw = damp(this.headYaw, headT, 6, dt);

    if (this.state !== 'attack') { this.windup = 0; this.hold = 0; }

    this._animate(dt, time);
    this._afterAnimate(dt, true);
  }

  _afterAnimate(dt, emit) {
    this.root.updateMatrixWorld(true);
    this.tipObj.getWorldPosition(this._tipPos);
    this.tipGlow.scale.setScalar(0.8 + Math.random() * 0.6);
    this.sparks.update(dt, emit ? this._tipPos : null);
  }

  /* ---------------- ANIMATION (diagonal trot) ---------------- */
  _animate(dt, time) {
    const C = CREATURE;
    const sp = this.speed;
    const moveW = clamp(sp / 0.8, 0, 1);
    const run = clamp((sp - C.WALK) / (C.RUN - C.WALK), 0, 1);

    if (sp > 0.03) this.phase += dt * sp * lerp(3.2, 1.5, run);
    const s = Math.sin(this.phase);
    const c = Math.cos(this.phase);

    const aAmp = lerp(0.5, 0.85, run) * moveW;
    const lAmp = lerp(0.45, 0.8, run) * moveW;

    const t = {
      lArm: -0.35 - s * aAmp, rArm: -0.35 + s * aAmp,
      lElbow: 0.5 + Math.max(0, c) * 0.6 * moveW, rElbow: 0.5 + Math.max(0, -c) * 0.6 * moveW,
      rThigh: -0.6 - s * lAmp, lThigh: -0.6 + s * lAmp,
      rKnee: 1.1 + Math.max(0, c) * 0.7 * moveW, lKnee: 1.1 + Math.max(0, -c) * 0.7 * moveW,
      bodyY: C.BASE_Y - Math.abs(s) * 0.035 * moveW * (1 + run) + Math.sin(time * 2.1 + this.seed) * 0.008 * (1 - moveW),
      pitch: 0.03 + run * 0.08,
      spine: s * 0.07 * moveW,
      roll: c * 0.035 * moveW,
      headX: -0.05 + run * 0.1,
      tailUp: 0.25 - run * 0.15,
    };

    const p = this.pose;
    for (const key in t) p[key] = damp(p[key] ?? t[key], t[key], 18, dt);

    this.body.position.y = p.bodyY;
    this.body.rotation.x = p.pitch;
    this.body.rotation.z = p.roll;
    this.front.rotation.y = p.spine;
    this.rear.rotation.y = -p.spine;

    this.lArm.rotation.x = p.lArm;
    this.rArm.rotation.x = p.rArm;
    this.lElbow.rotation.x = p.lElbow;
    this.rElbow.rotation.x = p.rElbow;
    this.lWrist.rotation.x = -(p.lArm + p.lElbow) * 0.85;
    this.rWrist.rotation.x = -(p.rArm + p.rElbow) * 0.85;

    this.lThigh.rotation.x = p.lThigh;
    this.rThigh.rotation.x = p.rThigh;
    this.lKnee.rotation.x = p.lKnee;
    this.rKnee.rotation.x = p.rKnee;
    this.lAnkle.rotation.x = -(p.lThigh + p.lKnee) * 0.85;
    this.rAnkle.rotation.x = -(p.rThigh + p.rKnee) * 0.85;

    this.head.rotation.y = this.headYaw - p.spine;
    this.mouthOpen = damp(this.mouthOpen, this.windup > 0 ? 1 : 0, 14, dt);
    const mo = this.mouthOpen;
    this.head.rotation.x = p.headX - 0.3 * mo;
    this.mouth.scale.set(1, 0.7 + 0.9 * mo, 0.9 + 0.5 * mo);
    this.mouth.position.y = -0.07 - 0.04 * mo;
    this.mouthGlow.visible = mo > 0.05;
    this.mouthGlow.scale.setScalar(mo * (0.7 + Math.random() * 0.5) + 0.001);
    this.halo.material.opacity = 0.32 + 0.07 * Math.sin(time * 2.2 + this.seed) + 0.3 * mo;
    this.halo.scale.setScalar(3.2 + 0.7 * mo);
    this.pool.material.opacity = 0.3 + 0.2 * mo;

    const twitch = Math.max(0, Math.sin(time * 1.3 + this.seed * 3) - 0.88) * 6;
    this.ears[0].rotation.x = -0.15 - twitch;
    this.ears[1].rotation.x = -0.15 - Math.max(0, Math.sin(time * 1.1 + this.seed * 5) - 0.9) * 6;

    this.tail.rotation.x = p.tailUp;
    const sway = Math.sin(time * 1.6 + this.seed) * 0.22 * (1 - moveW) + Math.sin(this.phase) * 0.25 * moveW;
    this.tailSegs.forEach((sg, i) => { sg.rotation.y = sway * (0.7 + i * 0.5); });
  }
}

/* ====================== kai creatures ek saath ====================== */
/*
  hit(info, playerPos): rocket creature se takraya
     head  => seedha maut
     body  => 50 damage
  maut par creature skyshot ki tarah udta hai aur fireworks "HAPPY DIWALI" likhte hain.
*/
export function createCreatures({
  count = 5, area = 200, clearRadius = 12, maxRadius = 38, fireworks = null, respawnTime = 8, crackers = null,
} = {}) {
  const group = new THREE.Group();
  const creatures = [];
  const spawnPos = (center, out) => {
    const a = Math.random() * Math.PI * 2;
    const r = clearRadius + Math.random() * (maxRadius - clearRadius);
    return out.set(center.x + Math.cos(a) * r, 0, center.z + Math.sin(a) * r);
  };
  const origin = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    const c = new Creature({ home: spawnPos(origin, new THREE.Vector3()), area });
    c.crackers = crackers;
    creatures.push(c);
    group.add(c.root, c.sparks.points);
  }

  return {
    group,
    creatures,

    update(dt, time, playerPos, collide, camera) {
      for (const c of creatures) {
        c.update(dt, time, playerPos, collide, camera);
        if (c.state === 'gone') {
          if (!c.burstDone) {
            c.burstDone = true;
            if (fireworks && c.plan) fireworks.show(c.plan);
            c.respawnT = respawnTime;
          }
          c.respawnT -= dt;
          if (c.respawnT <= 0) c.respawn(spawnPos(playerPos, new THREE.Vector3()));
        }
      }
    },

    // crosshair ka ray: sabse paas ka creature
    raycast(o, d, maxD = 120) {
      let best = null;
      for (const c of creatures) {
        const h = c.intersectRay(o, d, maxD);
        if (h && (!best || h.t < best.t)) best = h;
      }
      return best;
    },

    // rocket ka raasta
    hitSegment(a, b) {
      let best = null;
      for (const c of creatures) {
        const h = c.intersectSegment(a, b);
        if (h && (!best || h.t < best.t)) best = h;
      }
      return best;
    },

    hit(info, playerPos) {
      const c = info.creature;
      if (!c.alive) return null;
      const dmg = info.part === 'head' ? c.maxHp * 10 : CREATURE.BODY_DAMAGE;
      const killed = c.damage(dmg);
      if (killed) {
        c.plan = fireworks ? fireworks.plan(playerPos, c.root.position) : null;
        const to = c.plan ? c.plan.center : new THREE.Vector3(c.root.position.x, 8, c.root.position.z);
        c.startLaunch(to);
        return info.part; // 'head' ya 'body'
      }
      return null;
    },
  };
}