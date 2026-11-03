import * as THREE from 'three';

const { clamp, damp } = THREE.MathUtils;

/*
  2 camera modes:
   'third' = player ke peeche (paas, kandhe ke upar se)
   'first' = as player (aankhon se)
  Crosshair HAMESHA screen ke center mein dikhta hai. Rocket usi point par jaata hai jahan
  crosshair point kar raha hai (player kisi bhi taraf chal raha ho).
  Har frame `player.aimPoint` set hota hai.
  Creature crosshair ke aage aaye to main.js rig.setTargeting(true) karta hai => crosshair laal.
*/
export class CameraRig {
  constructor(camera, { mode = 'third', dist = 4.3, minDist = 2.2, maxDist = 9, shoulder = 0.35 } = {}) {
    this.camera = camera;
    this.mode = mode;
    this.yaw = Math.PI;
    this.pitch = 0.3;
    this.dist = dist;
    this.minDist = minDist;
    this.maxDist = maxDist;
    this.shoulder = shoulder;
    this.eyeHeight = 1.74;
    this.fovOffset = 0;
    this.target = new THREE.Vector3(0, 1.7, 0);
    this.dir = new THREE.Vector3(); // camera kis taraf dekh raha hai (crosshair ray)
    this._tmp = new THREE.Vector3();
    this._right = new THREE.Vector3();
    this._look = new THREE.Vector3();
    this._fwd = new THREE.Vector3();
    this._targeting = false;
    this._crosshair = this._makeCrosshair();
    this.setMode(mode);
  }

  get isFirst() {
    return this.mode === 'first';
  }

  toggle() {
    this.setMode(this.isFirst ? 'third' : 'first');
  }

  setMode(m) {
    this.mode = m;
    const first = m === 'first';
    this.pitch = clamp(this.pitch, first ? -1.3 : -0.2, first ? 1.3 : 1.25);
  }

  // dx = daayein (radians), dy = neeche (radians)
  addLook(dx, dy) {
    this.yaw -= dx;
    const first = this.isFirst;
    this.pitch = clamp(this.pitch + dy, first ? -1.3 : -0.2, first ? 1.3 : 1.25);
  }

  zoom(delta) {
    if (!this.isFirst) this.dist = clamp(this.dist + delta, this.minDist, this.maxDist);
  }

  // false | 'body' | 'head'  => safed / laal / peela
  setTargeting(mode) {
    const m = mode === true ? 'body' : mode || false;
    if (m === this._targeting) return;
    this._targeting = m;
    this._crosshair.style.color = m === 'head' ? '#ffd23a' : m ? '#ff3b30' : '#ffffff';
    this._crosshair.style.transform = m === 'head' ? 'scale(1.25)' : 'scale(1)';
  }

  // hit hone par chhota pulse
  pulse() {
    this._crosshair.animate(
      [{ transform: 'scale(1.7)' }, { transform: 'scale(1)' }],
      { duration: 160, easing: 'ease-out' }
    );
  }

  update(dt, player) {
    const cam = this.camera;
    const p = player.root.position;
    const first = this.isFirst;
    const sinY = Math.sin(this.yaw), cosY = Math.cos(this.yaw);
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);

    if (player.firstPerson !== first) player.setFirstPerson(first);

    if (first) {
      this._fwd.set(-sinY, 0, -cosY);
      this.target.set(p.x + this._fwd.x * 0.12, p.y + this.eyeHeight - player.landCrouch * 0.2, p.z + this._fwd.z * 0.12);
      cam.position.copy(this.target);
      this._look.set(-sinY * cp, -sp, -cosY * cp).add(cam.position);
      cam.lookAt(this._look);
    } else {
      this.target.x = damp(this.target.x, p.x, 25, dt);
      this.target.z = damp(this.target.z, p.z, 25, dt);
      this.target.y = damp(this.target.y, p.y + 1.7 - player.landCrouch * 0.12, 7, dt);

      this._right.set(cosY, 0, -sinY).multiplyScalar(this.shoulder);
      this._tmp.set(sinY * cp, sp, cosY * cp).multiplyScalar(this.dist);
      cam.position.copy(this.target).add(this._tmp).add(this._right);
      cam.position.y = Math.max(cam.position.y, 0.5);
      this._look.copy(this.target).add(this._right);
      cam.lookAt(this._look);
    }

    // crosshair kahan point kar raha hai (rocket ka target)
    cam.updateMatrixWorld();
    cam.getWorldDirection(this.dir);
    let t = 80;
    if (this.dir.y < -0.001) t = Math.min(t, -cam.position.y / this.dir.y);
    t = Math.max(t, first ? 6 : this.dist + 6);
    player.aimPoint.copy(cam.position).addScaledVector(this.dir, t);

    // sprint mein FOV thoda badhta hai
    const base = first ? 75 : 70 + this.fovOffset;
    cam.fov = damp(cam.fov, player.hSpeed > 6 ? base + 8 : base, 6, dt);
    cam.updateProjectionMatrix();
  }

  _makeCrosshair() {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed; left: 50%; top: 50%; width: 30px; height: 30px; margin: -15px 0 0 -15px;
      pointer-events: none; z-index: 40; color: #ffffff; transition: color .08s;
      filter: drop-shadow(0 0 2px rgba(0,0,0,.8));
    `;
    el.innerHTML = `
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="1.7" fill="currentColor"/>
        <circle cx="15" cy="15" r="9" stroke="currentColor" stroke-opacity=".55" stroke-width="1.2"/>
        <path d="M15 2v7M15 21v7M2 15h7M21 15h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`;
    document.body.appendChild(el);
    return el;
  }
}