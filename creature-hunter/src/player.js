import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { createGun, createRocketMesh, WEAPON } from './weapon.js';

const { damp, clamp, lerp } = THREE.MathUtils;

// body ki lambaai (metres)
const THIGH = 0.5;
const SHIN = 0.48;
const ARM1 = 0.33; // kandha -> kohni
const ARM2 = 0.34; // kohni -> haath ka center

export const PLAYER = {
  WALK: 4.2,
  RUN: 8.5,
  JUMP: 9.5,
  GRAVITY: 26,
  HIP_Y: THIGH + SHIN + 0.11,
  HEIGHT: 1.9,
  LIMIT: 220,
  SQUAT: 0.06,     // jump se pehle jhukne ka time
  TERMINAL: 24,    // girne ki max speed
  FALL_G: 1.2,     // girte waqt gravity multiplier
};

/*
  Reload (hamesha DAAYEIN haath se):
   0.00-0.30  gun baayein haath mein chali jaati hai (chest ke saamne), daayein haath free
   0.30-0.60  daayein haath peeche daayein bag ki taraf (body thodi ghoomti hai)
   0.72       rocket pakda
   0.78-1.20  rocket ko ghumate hue bahar kheenchta hai
   1.10-1.55  rocket gun ke munh ke saamne
   1.55-1.85  andar daalta hai -> "click"
   1.95-2.45  gun wapas daayein haath mein (stylish spin) -> ready
*/
const RL = { total: 2.6, grab: 0.72, insert: 1.85, restock: 2.1 };

// torso-space ke fixed points
const AIM_POS = new THREE.Vector3(-0.2, 0.42, 0.34);    // daayein haath mein gun
const CRADLE_POS = new THREE.Vector3(0.0, 0.3, 0.26);   // reload mein gun yahan
const CRADLE_ELEV = 1.0;
const LEFT_REST = new THREE.Vector3(0.22, 0.22, 0.12);  // baayein haath aaram se
const BAG_GRAB = new THREE.Vector3(-0.2, 0.58, -0.27);  // daayein bag mein rocket
const BAG_PULL = new THREE.Vector3(-0.2, 0.8, -0.24);

const DOWN = new THREE.Vector3(0, -1, 0);
const ZAXIS = new THREE.Vector3(0, 0, 1);
const YAXIS = new THREE.Vector3(0, 1, 0);
const Q_UP = new THREE.Quaternion().setFromUnitVectors(ZAXIS, YAXIS); // rocket nok upar

const ease = (t) => t * t * (3 - 2 * t);
const seg = (t, a, b) => ease(clamp((t - a) / (b - a), 0, 1));
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

const _d = new THREE.Vector3(), _pole = new THREE.Vector3(), _up = new THREE.Vector3();
const _fore = new THREE.Vector3(), _qi = new THREE.Quaternion(), _qr = new THREE.Quaternion();
const _gp = new THREE.Vector3(), _tl = new THREE.Vector3(), _ad = new THREE.Vector3();
const _R = new THREE.Vector3(), _Lt = new THREE.Vector3(), _ka = new THREE.Vector3(), _ki = new THREE.Vector3();
const _handL = new THREE.Vector3(), _handR = new THREE.Vector3();
const _sp = new THREE.Vector3(), _dir = new THREE.Vector3(), _w = new THREE.Vector3();

/* ---------- smooth tapered limb (Lathe): top y=0, bottom y=-length ---------- */
function taperGeo(rTop, rBot, length, bulge = 0, seg = 16) {
  const len = Math.max(0.001, length - rTop - rBot);
  const h = len / 2;
  const pts = [];
  for (let i = 0; i <= 5; i++) {
    const a = (i / 5) * Math.PI / 2;
    pts.push(new THREE.Vector2(rBot * Math.sin(a), -h - rBot * Math.cos(a)));
  }
  for (let i = 1; i <= 6; i++) {
    const t = i / 6;
    pts.push(new THREE.Vector2(lerp(rBot, rTop, t) * (1 + bulge * Math.sin(Math.PI * t)), -h + len * t));
  }
  for (let i = 1; i <= 5; i++) {
    const a = (i / 5) * Math.PI / 2;
    pts.push(new THREE.Vector2(rTop * Math.cos(a), h + rTop * Math.sin(a)));
  }
  const g = new THREE.LatheGeometry(pts, seg);
  g.translate(0, -(h + rTop), 0);
  return g;
}

export class Player {
  constructor() {
    this.root = new THREE.Group();
    this.velocity = new THREE.Vector3();
    this.onGround = true;
    this.facing = 0;
    this.phase = 0;
    this.hSpeed = 0;
    this.coyote = 0;
    this.jumpBuffer = 0;
    this.jumpHeld = false;
    this.landCrouch = 0;
    this.squat = 0;
    this.turn = 0;
    this.flat = 1;
    this.backward = false;
    this.pose = {};
    this.hurt = 0;

    // ---- weapon (main.js / cameraRig set karte hain) ----
    this.rockets = null;                            // RocketSystem
    this.aimPoint = new THREE.Vector3(0, 1.5, 30);  // crosshair kahan point kar raha hai
    this.firstPerson = false;
    this.camDelta = 0;   // camera aur body ke beech ka angle
    this.twist = 0;      // upper body camera ki taraf kitna ghoomi
    this.ammo = 'ready'; // 'ready' | 'empty' | 'reload'
    this.emptyT = 0;
    this.reloadT = 0;
    this.recoil = 0;
    this.glow = 0;
    this.fireHeld = false;
    this.pendingFire = false;
    this._clunked = false;

    this._build();
  }

  setFirstPerson(v) {
    this.firstPerson = v;
    this.head.visible = !v;
    this.hoodBunch.visible = !v;
  }

  /* ---------------- MODEL ---------------- */
  _build() {
    const M = (color, extra = {}) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0.0, ...extra });
    const mat = {
      hoodie: M(0x17171b, { roughness: 0.95 }),
      hoodieLight: M(0x25252b, { roughness: 0.95 }),
      pants: M(0x23211c),
      pantsDark: M(0x1a1916),
      skin: M(0xd9a98a, { roughness: 0.6 }),
      shade: M(0x6a4a3a, { roughness: 0.8 }),
      shoe: M(0x26262d, { roughness: 0.7 }),
      sole: M(0xe4e4e4, { roughness: 0.6 }),
      cap: M(0x0d0d10),
      hood: M(0x141418, { roughness: 0.95, side: THREE.DoubleSide }),
      string: M(0x9a9a9a),
      bag: M(0x2e332b),
      bagDark: M(0x15171a),
      accent: M(0xd0782c, { roughness: 0.6 }),
      strap: M(0x101114),
      metal: M(0x8a8f98, { metalness: 0.8, roughness: 0.35 }),
      eye: M(0x15110f, { roughness: 0.3 }),
    };

    const S = (m) => { m.castShadow = true; return m; };
    const mesh = (geo, m) => S(new THREE.Mesh(geo, m));
    const rbox = (w, h, d, r, m) => S(new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, r), m));
    const ball = (r, m, sx = 1, sy = 1, sz = 1) => {
      const x = mesh(new THREE.SphereGeometry(r, 20, 14), m);
      x.scale.set(sx, sy, sz);
      return x;
    };
    const tube = (rTop, rBot, len, bulge, m) => mesh(taperGeo(rTop, rBot, len, bulge), m);
    const cyl = (rt, rb, h, m, seg = 16) => mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m);

    this.hips = new THREE.Group();
    this.hips.position.y = PLAYER.HIP_Y;
    this.root.add(this.hips);
    this.hips.add(ball(0.17, mat.pants, 1.1, 0.78, 0.86));

    // ----- legs -----
    const makeLeg = (side) => {
      const thigh = new THREE.Group();
      thigh.position.set(side * 0.125, 0, 0);
      thigh.add(tube(0.125, 0.095, THIGH, 0.04, mat.pants));

      const pocket = rbox(0.05, 0.17, 0.14, 0.02, mat.pantsDark);
      pocket.position.set(side * 0.118, -0.27, 0);
      thigh.add(pocket);
      const flap = rbox(0.054, 0.04, 0.15, 0.015, mat.pants);
      flap.position.set(side * 0.12, -0.19, 0);
      thigh.add(flap);

      const knee = new THREE.Group();
      knee.position.y = -THIGH;
      thigh.add(knee);
      knee.add(ball(0.098, mat.pants));
      knee.add(tube(0.098, 0.085, SHIN, 0.05, mat.pants));
      const cuff = cyl(0.1, 0.108, 0.08, mat.pants);
      cuff.position.y = -SHIN + 0.03;
      knee.add(cuff);

      const ankle = new THREE.Group();
      ankle.position.y = -SHIN;
      knee.add(ankle);
      const shoeBody = ball(0.07, mat.shoe, 1, 0.75, 2.1);
      shoeBody.position.set(0, -0.045, 0.07);
      const toe = ball(0.062, mat.shoe, 1, 0.7, 1);
      toe.position.set(0, -0.055, 0.2);
      const heel = ball(0.06, mat.shoe, 1, 0.9, 1);
      heel.position.set(0, -0.045, -0.07);
      const tongue = rbox(0.07, 0.02, 0.1, 0.01, mat.hoodieLight);
      tongue.position.set(0, 0.0, 0.07);
      tongue.rotation.x = -0.4;
      const sole = rbox(0.15, 0.035, 0.33, 0.015, mat.sole);
      sole.position.set(0, -0.095, 0.065);
      ankle.add(shoeBody, toe, heel, tongue, sole);

      this.hips.add(thigh);
      return { thigh, knee, ankle };
    };
    const L = makeLeg(1);  // left = +X (player +Z dekhta hai)
    const R = makeLeg(-1); // right = -X
    this.lThigh = L.thigh; this.lKnee = L.knee; this.lAnkle = L.ankle;
    this.rThigh = R.thigh; this.rKnee = R.knee; this.rAnkle = R.ankle;

    // ----- torso: hoodie -----
    this.torso = new THREE.Group();
    this.hips.add(this.torso);

    const prof = new THREE.SplineCurve([
      [0.0, 0.0], [0.19, 0.0], [0.205, 0.06], [0.2, 0.17], [0.205, 0.28],
      [0.225, 0.38], [0.235, 0.46], [0.2, 0.54], [0.12, 0.6], [0.085, 0.64], [0.0, 0.65],
    ].map(([x, y]) => new THREE.Vector2(x, y))).getPoints(32);
    const body = mesh(new THREE.LatheGeometry(prof, 32), mat.hoodie);
    body.scale.z = 0.72;
    this.torso.add(body);

    const hem = mesh(new THREE.TorusGeometry(0.2, 0.022, 8, 32), mat.hoodieLight);
    hem.rotation.x = Math.PI / 2;
    hem.scale.set(1, 0.72, 1);
    hem.position.y = 0.03;
    this.torso.add(hem);

    const kanga = rbox(0.3, 0.13, 0.04, 0.02, mat.hoodieLight);
    kanga.position.set(0, 0.14, 0.14);
    this.torso.add(kanga);

    for (const sx of [-1, 1]) {
      const str = rbox(0.012, 0.13, 0.012, 0.004, mat.string);
      str.position.set(sx * 0.05, 0.44, 0.15);
      this.torso.add(str);
    }

    this.hoodBunch = new THREE.Group();
    this.hoodBunch.position.set(0, 0.6, -0.1);
    const bunch = ball(0.14, mat.hood, 1.15, 0.85, 0.8);
    bunch.position.y = -0.04;
    this.hoodBunch.add(bunch);
    this.torso.add(this.hoodBunch);

    // ----- arms (IK se chalte hain) -----
    const makeHand = (side) => {
      const h = new THREE.Group();
      h.add(ball(0.048, mat.skin, 1, 1.1, 0.8));
      for (let i = 0; i < 4; i++) {
        const f = mesh(new THREE.CapsuleGeometry(0.011, 0.03, 2, 6), mat.skin);
        f.position.set((i - 1.5) * 0.02, -0.035, 0.03);
        f.rotation.x = -0.9;
        h.add(f);
      }
      const th = mesh(new THREE.CapsuleGeometry(0.013, 0.03, 2, 6), mat.skin);
      th.position.set(-side * 0.04, -0.01, 0.025);
      th.rotation.set(-0.6, 0, -side * 0.5);
      h.add(th);
      return h;
    };
    const makeArm = (side) => {
      const sh = new THREE.Group();
      sh.position.set(side * 0.27, 0.5, 0);
      sh.add(ball(0.088, mat.hoodie));
      sh.add(tube(0.077, 0.063, ARM1, 0.03, mat.hoodie));
      const el = new THREE.Group();
      el.position.y = -ARM1;
      sh.add(el);
      el.add(ball(0.064, mat.hoodie));
      el.add(tube(0.063, 0.053, ARM2 - 0.04, 0.02, mat.hoodie));
      const cuff = cyl(0.056, 0.062, 0.05, mat.hoodieLight);
      cuff.position.y = -ARM2 + 0.07;
      el.add(cuff);
      const hand = makeHand(side);
      hand.position.y = -ARM2;
      el.add(hand);
      this.torso.add(sh);
      return { sh, el };
    };
    const AL = makeArm(1), AR = makeArm(-1);
    this.lArm = AL.sh; this.lElbow = AL.el;
    this.rArm = AR.sh; this.rElbow = AR.el;

    // ----- head -----
    this.head = new THREE.Group();
    this.head.position.y = 0.6;
    this.torso.add(this.head);
    const neck = cyl(0.05, 0.058, 0.1, mat.skin, 12);
    this.head.add(neck);
    const face = ball(0.113, mat.skin, 0.93, 1.08, 1);
    face.position.set(0, 0.15, 0.015);
    this.head.add(face);
    const shade = ball(0.116, mat.shade, 0.92, 0.5, 0.95);
    shade.position.set(0, 0.21, 0.02);
    this.head.add(shade);
    const nose = ball(0.022, mat.skin, 0.9, 1.1, 1.3);
    nose.position.set(0, 0.14, 0.125);
    this.head.add(nose);
    for (const sx of [-1, 1]) {
      const eye = ball(0.014, mat.eye, 1, 0.8, 0.6);
      eye.position.set(sx * 0.04, 0.165, 0.105);
      const brow = rbox(0.045, 0.01, 0.015, 0.004, mat.hoodie);
      brow.position.set(sx * 0.04, 0.188, 0.108);
      brow.rotation.z = sx * 0.15;
      const ear = ball(0.025, mat.skin, 0.5, 1, 0.8);
      ear.position.set(sx * 0.105, 0.15, 0);
      this.head.add(eye, brow, ear);
    }
    const hoodG = new THREE.Group();
    hoodG.position.set(0, 0.16, -0.015);
    hoodG.rotation.x = -0.5;
    hoodG.add(mesh(new THREE.SphereGeometry(0.165, 28, 16, 0, Math.PI * 2, 0, Math.PI * 0.68), mat.hood));
    const rim = mesh(new THREE.TorusGeometry(0.165 * Math.sin(Math.PI * 0.68), 0.013, 8, 28), mat.hoodieLight);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.165 * Math.cos(Math.PI * 0.68);
    hoodG.add(rim);
    this.head.add(hoodG);
    const brim = rbox(0.2, 0.014, 0.11, 0.006, mat.cap);
    brim.position.set(0, 0.235, 0.13);
    brim.rotation.x = 0.14;
    brim.castShadow = false;
    this.head.add(brim);

    // ----- BAG: DAAYEIN (right) side, kamar ke peeche + tirchhi strap -----
    this.bag = new THREE.Group();
    this.torso.add(this.bag);
    const bagBody = rbox(0.3, 0.3, 0.17, 0.045, mat.bag);
    bagBody.position.set(-0.18, 0.2, -0.26);
    const flap = rbox(0.28, 0.06, 0.19, 0.025, mat.bagDark);
    flap.position.set(-0.18, 0.34, -0.26);
    const stripe = rbox(0.31, 0.04, 0.175, 0.015, mat.accent);
    stripe.position.set(-0.18, 0.13, -0.26);
    const buckle = rbox(0.045, 0.03, 0.02, 0.008, mat.metal);
    buckle.position.set(-0.18, 0.31, -0.355);
    const quiver = cyl(0.08, 0.075, 0.13, mat.bagDark, 16); // rockets ki nali
    quiver.position.set(-0.19, 0.4, -0.26);
    this.bag.add(bagBody, flap, stripe, buckle, quiver);

    const strap = rbox(0.045, 0.52, 0.02, 0.01, mat.strap); // baayein kandhe se daayein bag tak
    strap.position.set(-0.02, 0.38, -0.178);
    strap.rotation.z = -0.72;
    this.bag.add(strap);
    for (const sx of [-1, 1]) {
      const back = rbox(0.05, 0.05, 0.12, 0.01, mat.strap);
      back.position.set(sx * 0.13, 0.6, -0.04);
      this.bag.add(back);
    }

    // rockets (nok upar), aage waala [0] reload mein nikalta hai
    this.bagRockets = [];
    const rk = [
      [-0.2, 0.58, -0.27], [-0.15, 0.56, -0.26], [-0.23, 0.56, -0.235], [-0.19, 0.55, -0.3],
    ];
    rk.forEach(([x, y, z], i) => {
      const r = createRocketMesh();
      r.rotation.x = -Math.PI / 2;
      if (i > 0) r.rotation.z = (i - 2) * 0.08;
      r.position.set(x, y, z);
      this.bag.add(r);
      this.bagRockets.push(r);
    });

    // ----- GUN (daayein haath mein) -----
    this.launcher = createGun();
    this.gun = this.launcher.group;
    this.gun.rotation.order = 'YXZ'; // pehle yaw, phir pitch, phir roll (spin)
    this.torso.add(this.gun);
    this.handRocket = createRocketMesh();
    this.handRocket.visible = false;
    this.torso.add(this.handRocket);
  }

  /* ---------------- UPDATE ---------------- */
  update(dt, input, camYaw, time) {
    const P = PLAYER;
    const pos = this.root.position;

    // camera ke hisaab se direction
    const fx = -Math.sin(camYaw), fz = -Math.cos(camYaw);
    const rx = Math.cos(camYaw), rz = -Math.sin(camYaw);
    let mx = fx * input.forward + rx * input.right;
    let mz = fz * input.forward + rz * input.right;
    const len = Math.hypot(mx, mz);
    const moving = len > 0.01;
    const analog = clamp(len, 0, 1);
    if (moving) { mx /= len; mz /= len; }

    const maxSpeed = (input.sprint ? P.RUN : P.WALK) * (moving ? Math.max(analog, 0.35) : 0) * (1 - 0.35 * this.landCrouch);
    const lambda = this.onGround ? 12 : 3;
    this.velocity.x = damp(this.velocity.x, moving ? mx * maxSpeed : 0, lambda, dt);
    this.velocity.z = damp(this.velocity.z, moving ? mz * maxSpeed : 0, lambda, dt);

    // facing: first-person mein camera ki taraf; third-person mein chalne ki taraf
    this.turn = damp(this.turn, 0, 8, dt);
    if (this.firstPerson) {
      const d = wrap(camYaw + Math.PI - this.facing);
      this.facing += d * (1 - Math.exp(-20 * dt));
      this.turn = 0;
    } else if (moving) {
      const diff = wrap(Math.atan2(mx, mz) - this.facing);
      this.facing += diff * (1 - Math.exp(-14 * dt));
      this.turn = lerp(this.turn, diff, 0.3);
    } else {
      // khade hain aur bahut side dekh rahe hain => body bhi ghoome
      const d = wrap(camYaw + Math.PI - this.facing);
      if (Math.abs(d) > 0.9) this.facing += (d - Math.sign(d) * 0.9) * (1 - Math.exp(-8 * dt));
    }
    this.camDelta = wrap(camYaw + Math.PI - this.facing);

    // peeche chal rahe ho? (first-person strafe mein legs ulte)
    const hs0 = Math.hypot(this.velocity.x, this.velocity.z);
    const fwdSpeed = this.velocity.x * Math.sin(this.facing) + this.velocity.z * Math.cos(this.facing);
    this.backward = this.firstPerson && hs0 > 0.5 && fwdSpeed < -0.5 * hs0;

    // jump
    if (input.jump && !this.jumpHeld) this.jumpBuffer = 0.12;
    this.jumpHeld = input.jump;
    this.jumpBuffer = Math.max(0, this.jumpBuffer - dt);
    this.coyote = this.onGround ? 0.1 : this.coyote - dt;

    // jump: pehle halka jhukna, phir launch
    if (this.jumpBuffer > 0 && this.coyote > 0 && this.squat <= 0) {
      this.squat = P.SQUAT;
      this.jumpBuffer = 0;
    }
    if (this.squat > 0) {
      this.squat -= dt;
      if (this.squat <= 0) {
        this.velocity.y = P.JUMP;
        this.onGround = false;
        this.coyote = 0;
      }
    }

    let g = P.GRAVITY;
    if (this.velocity.y > 0) {
      if (!input.jump) g *= 2.2;   // button chhoda => chhota hop
    } else {
      g *= P.FALL_G;               // girte waqt thoda bhaari
    }
    this.velocity.y = Math.max(this.velocity.y - g * dt, -P.TERMINAL);

    const wasAir = !this.onGround;
    pos.addScaledVector(this.velocity, dt);
    pos.x = clamp(pos.x, -P.LIMIT, P.LIMIT);
    pos.z = clamp(pos.z, -P.LIMIT, P.LIMIT);

    if (pos.y <= 0) {
      if (wasAir) this.landCrouch = clamp(-this.velocity.y / 14, 0.25, 1);
      pos.y = 0;
      this.velocity.y = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }

    this.hSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    this.root.rotation.y = this.facing;

    // ---- weapon state ----
    this.recoil = damp(this.recoil, 0, 11, dt);
    this.glow = damp(this.glow, 0, 4, dt);
    if (input.fire && !this.fireHeld && this.ammo === 'ready') this._fire();
    this.fireHeld = !!input.fire;

    if (this.ammo === 'empty') {
      if (input.reload) this.emptyT = 0;
      this.emptyT -= dt;
      if (this.emptyT <= 0) { this.ammo = 'reload'; this.reloadT = 0; this._clunked = false; }
    }
    if (this.ammo === 'reload') {
      this.reloadT += dt;
      if (this.reloadT >= RL.total) { this.ammo = 'ready'; this.reloadT = 0; }
    }

    this._animateBody(dt, time);
    this._animateWeapon(dt, time);

    if (this.pendingFire) {
      this.pendingFire = false;
      this._spawnRocket();
    }
  }

  _fire() {
    this.ammo = 'empty';
    this.emptyT = 0.45;
    this.recoil = 1;
    this.glow = 2.5;
    this.pendingFire = true;
  }

  // rocket hamesha crosshair (aimPoint) ki taraf jaata hai, body kisi bhi taraf ho
  _spawnRocket() {
    if (!this.rockets) return;
    this.root.updateMatrixWorld(true);
    this.launcher.rocketSpawn.getWorldPosition(_sp);
    _dir.copy(this.aimPoint).sub(_sp);
    if (_dir.lengthSq() < 1) _dir.set(0, 0, 1).transformDirection(this.gun.matrixWorld);
    _dir.normalize();
    this.rockets.launch(_sp, _dir);
    this.rockets.blast(_sp, _dir);
  }

  /* ---------------- LEGS / TORSO ANIMATION ---------------- */
  _animateBody(dt, time) {
    const P = PLAYER;
    const hs = this.hSpeed;
    const run = clamp((hs - P.WALK) / (P.RUN - P.WALK), 0, 1);
    const moveW = clamp(hs / 1.2, 0, 1);
    const speedN = clamp(hs / P.RUN, 0, 1);

    if (this.onGround) this.phase += dt * hs * lerp(2.5, 1.75, run) * (this.backward ? -1 : 1);
    const s = Math.sin(this.phase);
    const c = Math.cos(this.phase);

    this.landCrouch = damp(this.landCrouch, 0, 9, dt);
    this.hurt = damp(this.hurt, 0, 6, dt);

    const t = {
      lThigh: 0.02, rThigh: -0.02, lKnee: 0.04, rKnee: 0.04,
      torsoX: 0.03, torsoY: 0, torsoZ: 0, pelvisY: 0, hipsY: P.HIP_Y, headX: 0, hood: 0.05,
    };

    if (this.onGround) {
      const amp = lerp(0.5, 0.9, run) * moveW;
      t.lThigh = -s * amp;
      t.rThigh = s * amp;
      const kb = lerp(0.85, 1.75, run) * moveW;
      t.lKnee = 0.06 + Math.max(0, c) * kb + moveW * 0.08;
      t.rKnee = 0.06 + Math.max(0, -c) * kb + moveW * 0.08;

      t.pelvisY = -s * (0.1 + run * 0.08) * moveW;
      t.torsoY = s * (0.2 + run * 0.1) * moveW * 0.25; // gun pakda hai, twist kam
      t.torsoX = (0.03 + (0.05 + run * 0.3) * moveW) * 0.6;
      t.hipsY = P.HIP_Y - Math.abs(s) * (0.045 + run * 0.04) * moveW;
      t.headX = -t.torsoX * 0.75;
      t.torsoZ = clamp(-this.turn, -1, 1) * 0.12 * speedN;
      t.hood = 0.05 + speedN * 0.35 + Math.abs(s) * 0.12 * moveW;

      t.torsoX += Math.sin(time * 2.2) * (1 - moveW) * 0.012;

      const lc = this.landCrouch;
      t.hipsY -= lc * 0.26;
      t.lThigh -= lc * 0.8;
      t.rThigh -= lc * 0.8;
      t.lKnee += lc * 1.5;
      t.rKnee += lc * 1.5;
      t.torsoX += lc * 0.4;
    } else {
      // chadhte -> apex -> girte: pose smoothly badalta hai
      const up = clamp(this.velocity.y / P.JUMP, -1, 1);
      const w = Math.abs(up);
      const A = { lT: -0.8, rT: -0.3, lK: 1.1, rK: 1.0, tx: 0.05, hx: -0.05, hd: -0.1 }; // apex: ghutne sameete
      const K = up >= 0
        ? { lT: -1.1, rT: 0.35, lK: 1.45, rK: 0.95, tx: -0.02, hx: -0.12, hd: -0.3 }    // chadhte
        : { lT: -0.4, rT: 0.1, lK: 0.35, rK: 0.55, tx: 0.12, hx: -0.1, hd: -0.6 };      // girte
      t.lThigh = lerp(A.lT, K.lT, w); t.rThigh = lerp(A.rT, K.rT, w);
      t.lKnee = lerp(A.lK, K.lK, w); t.rKnee = lerp(A.rK, K.rK, w);
      t.torsoX = lerp(A.tx, K.tx, w); t.headX = lerp(A.hx, K.hx, w);
      t.hood = lerp(A.hd, K.hd, w) + (up < 0 ? 0.12 * Math.sin(time * 16) : 0);
      t.pelvisY = -0.08 * Math.max(up, 0);

      // zameen ke paas aate hi landing ke liye pair neeche, ghutne halke mude
      const prep = this.velocity.y < -1 ? clamp(1 - this.root.position.y / 0.9, 0, 1) : 0;
      if (prep > 0) {
        t.lThigh = lerp(t.lThigh, -0.35, prep); t.rThigh = lerp(t.rThigh, -0.15, prep);
        t.lKnee = lerp(t.lKnee, 0.5, prep); t.rKnee = lerp(t.rKnee, 0.5, prep);
      }
    }

    if (this.squat > 0) { // jump se pehle jhukna
      t.hipsY -= 0.14;
      t.lThigh -= 0.55; t.rThigh -= 0.55;
      t.lKnee += 1.0; t.rKnee += 1.0;
      t.torsoX += 0.18;
    }

    const k = this.onGround ? 22 : 12;
    t.torsoX += this.hurt * 0.45;
    t.headX += this.hurt * 0.3;
    const p = this.pose;
    for (const key in t) p[key] = damp(p[key] ?? t[key], t[key], k, dt);

    this.flat = damp(this.flat, this.onGround ? 0.85 : 0.3, 10, dt);

    this.hips.position.y = p.hipsY;
    this.hips.rotation.y = p.pelvisY;
    this.lThigh.rotation.x = p.lThigh;
    this.rThigh.rotation.x = p.rThigh;
    this.lKnee.rotation.x = p.lKnee;
    this.rKnee.rotation.x = p.rKnee;
    this.lAnkle.rotation.x = -(p.lThigh + p.lKnee) * this.flat;
    this.rAnkle.rotation.x = -(p.rThigh + p.rKnee) * this.flat;

    this.torso.rotation.x = p.torsoX;
    this.torso.rotation.z = p.torsoZ;
    this.hoodBunch.rotation.x = p.hood;
  }

  /* ---------------- 2-bone IK: haath ko target tak pahunchao ---------------- */
  _ik(sh, el, target, side, out) {
    const S = sh.position;
    _d.copy(target).sub(S);
    let dist = _d.length();
    dist = clamp(dist, 0.12, (ARM1 + ARM2) * 0.998);
    _d.normalize();
    const cosA = clamp((ARM1 * ARM1 + dist * dist - ARM2 * ARM2) / (2 * ARM1 * dist), -1, 1);
    const sinA = Math.sqrt(1 - cosA * cosA);
    _pole.set(side * 0.55, -1, -0.35); // kohni bahar-neeche-peeche
    _pole.addScaledVector(_d, -_pole.dot(_d)).normalize();
    _up.copy(_d).multiplyScalar(cosA).addScaledVector(_pole, sinA);
    sh.quaternion.setFromUnitVectors(DOWN, _up);
    out.copy(_d).multiplyScalar(dist).add(S);
    _fore.copy(out).sub(S).addScaledVector(_up, -ARM1).normalize();
    _fore.applyQuaternion(_qi.copy(sh.quaternion).invert());
    el.quaternion.setFromUnitVectors(DOWN, _fore);
    return out;
  }

  /* ---------------- GUN + ARMS + RELOAD ---------------- */
  _animateWeapon(dt, time) {
    const Lr = this.launcher;
    const AY = WEAPON.AXIS_Y;
    const reloading = this.ammo === 'reload';
    const rt = reloading ? this.reloadT : 0;
    const p = this.pose;
    const moveW = clamp(this.hSpeed / 1.2, 0, 1);

    // gun baayein haath mein kab hai / daayein haath bag ki taraf kab
    const leftW = reloading ? seg(rt, 0, 0.3) * (1 - seg(rt, 1.95, 2.2)) : 0;
    const reachW = reloading ? seg(rt, 0.3, 0.6) * (1 - seg(rt, 1.9, 2.3)) : 0;

    // upper body camera ki taraf ghoomti hai (legs chalne ki taraf), reload mein daayein peeche
    this.twist = damp(this.twist, clamp(this.camDelta, -1.1, 1.1) * 0.85, 12, dt);
    this.torso.rotation.y = p.torsoY + this.twist - 0.35 * reachW;
    this.torso.rotation.x = p.torsoX + 0.12 * reachW;

    // crosshair ka point torso-space mein
    this.torso.updateWorldMatrix(true, false);
    _tl.copy(this.aimPoint);
    this.torso.worldToLocal(_tl);

    // gun: daayein haath mein, hamesha crosshair ki taraf
    _gp.copy(AIM_POS);
    _gp.y += Math.sin(this.phase * 2) * 0.008 * moveW;
    _gp.x += Math.sin(this.phase) * 0.01 * moveW;
    _ad.copy(_tl).sub(_gp);
    let yaw = 0, elev = 0;
    if (_ad.lengthSq() > 0.36) {
      yaw = clamp(Math.atan2(_ad.x, _ad.z), -1.7, 1.7);
      elev = clamp(Math.atan2(_ad.y, Math.hypot(_ad.x, _ad.z)), -1.2, 1.3);
    }
    const aimElev = elev;

    // reload: gun baayein haath ke saath chest ke saamne
    if (leftW > 0) {
      _gp.lerp(CRADLE_POS, leftW);
      elev = lerp(elev, CRADLE_ELEV, leftW);
      yaw = lerp(yaw, 0, leftW);
    }
    _gp.z -= this.recoil * 0.07;
    elev += this.recoil * 0.22;
    const spin = reloading ? seg(rt, 1.95, 2.45) : 0; // gun spin
    this.gun.position.copy(_gp);
    this.gun.rotation.set(-elev, yaw, spin * Math.PI * 2);
    this.gun.updateMatrix();
    const m = this.gun.matrix;

    // daayein haath ka target
    _R.copy(_gp);
    if (reloading) {
      _ka.set(0, AY, WEAPON.INSERT_Z).applyMatrix4(m);
      _ki.set(0, AY, WEAPON.LOADED_Z).applyMatrix4(m);
      if (rt < 0.22) _R.copy(_gp);
      else if (rt < 0.6) _R.copy(_gp).lerp(BAG_GRAB, seg(rt, 0.22, 0.6));
      else if (rt < 0.75) _R.copy(BAG_GRAB);
      else if (rt < 1.1) _R.copy(BAG_GRAB).lerp(BAG_PULL, seg(rt, 0.75, 1.1));
      else if (rt < 1.55) _R.copy(BAG_PULL).lerp(_ka, seg(rt, 1.1, 1.55));
      else if (rt < 1.85) _R.copy(_ka).lerp(_ki, seg(rt, 1.55, 1.85));
      else if (rt < 1.95) _R.copy(_ki);
      else _R.copy(_ki).lerp(_gp, seg(rt, 1.95, 2.3));
    }

    // baayein haath ka target: aaram se (daudte waqt halka hilta), reload mein gun pakadta hai
    _Lt.copy(LEFT_REST);
    _Lt.z += Math.sin(this.phase) * 0.1 * moveW;
    _Lt.y += Math.cos(this.phase * 2) * 0.02 * moveW;
    if (leftW > 0) _Lt.lerp(_gp, leftW);

    this._ik(this.rArm, this.rElbow, _R, -1, _handR);
    this._ik(this.lArm, this.lElbow, _Lt, 1, _handL);

    // haath mein rocket (ghumata hua)
    const hr = this.handRocket;
    if (reloading && rt >= RL.grab && rt < RL.insert) {
      hr.visible = true;
      hr.position.copy(_handR);
      hr.quaternion.copy(Q_UP).slerp(this.gun.quaternion, seg(rt, 1.1, 1.55));
      const roll = seg(rt, 0.78, 1.2) * Math.PI * 2;
      hr.quaternion.multiply(_qr.setFromAxisAngle(ZAXIS, roll));
    } else {
      hr.visible = false;
    }

    // gun mein loaded rocket + "click"
    Lr.rocketInGun.visible = this.ammo === 'ready' || (reloading && rt >= RL.insert);
    if (reloading && rt >= RL.insert && !this._clunked) {
      this._clunked = true;
      this.recoil = Math.max(this.recoil, 0.25);
      this.glow = 3;
      if (this.rockets) {
        this.root.updateMatrixWorld(true);
        Lr.rocketSpawn.getWorldPosition(_w);
        this.rockets.sparkle(_w);
      }
    }

    // bag se rocket nikalna / wapas aana
    const br = this.bagRockets[0];
    br.visible = !(reloading && rt >= RL.grab && rt < RL.restock);
    br.scale.setScalar(reloading && rt >= RL.restock ? Math.max(0.01, seg(rt, RL.restock, RL.total)) : 1);

    // cyan chamak
    const base = this.ammo === 'ready' ? 1.2 : 0.5;
    Lr.glowMats.forEach((mm, i) => {
      mm.emissiveIntensity = base + 0.35 * Math.sin(time * 3 + i * 1.3) + this.glow;
    });

    // sar: crosshair ki taraf dekhe, reload mein bag/gun ki taraf neeche
    this.head.rotation.x = (p.headX || 0) - clamp(aimElev, -0.6, 0.6) * 0.5 + 0.35 * reachW;
    this.head.rotation.y = clamp(this.camDelta - this.twist, -0.8, 0.8) * 0.7 - p.torsoY * 0.6;
  }
}