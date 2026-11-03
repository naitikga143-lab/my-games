import * as THREE from 'three';
import { Player } from './player.js';

const { damp } = THREE.MathUtils;
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const _o = new THREE.Vector3();
const _d = new THREE.Vector3();

/*
  Dusre player ka character. Server se ~20 baar/sec position + aim aata hai ('opp' message),
  yahan Player ka wahi model aur animation chalta hai (chalna, kudna, gun, reload).
  Fire hone par onFire(origin, dir) bulata hai => main.js sirf dikhane wala rocket chhodta hai.
*/
export class RemotePlayer {
  constructor(scene, color, onFire) {
    this.p = new Player();
    this.p.rockets = null; // reload "click" par chingaari nahi (sirf local player ke liye)
    this.p.root.visible = false;
    scene.add(this.p.root);
    this.onFire = onFire;
    this.have = false;
    this.snap = true;
    this.am = 'ready';
    this.t = { x: 0, y: 0, z: 0, f: 0, cy: 0, ax: 0, ay: 1.5, az: 30, vy: 0, hs: 0, am: 'ready' };

    // naam ka tag (laal/neela)
    const c = document.createElement('canvas');
    c.width = 128; c.height = 48;
    const g = c.getContext('2d');
    g.font = '800 34px system-ui, sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineWidth = 6; g.strokeStyle = 'rgba(0,0,0,.75)';
    const label = color === 'blue' ? 'BLUE' : 'RED';
    g.strokeText(label, 64, 26);
    g.fillStyle = color === 'blue' ? '#4da3ff' : '#ff4d5e';
    g.fillText(label, 64, 26);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    this.tag = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, fog: false, toneMapped: false }));
    this.tag.scale.set(1.3, 0.49, 1);
    this.tag.position.set(0, 2.5, 0);
    this.p.root.add(this.tag);
  }

  setVisible(v) {
    this.p.root.visible = !!v && this.have;
    this.wantVisible = !!v;
  }

  // server ka 'opp' message
  setState(m) {
    const t = this.t;
    for (const k of ['x', 'y', 'z', 'f', 'cy', 'ax', 'ay', 'az', 'vy', 'hs']) {
      if (Number.isFinite(m[k])) t[k] = m[k];
    }
    t.am = m.am === 'empty' || m.am === 'reload' ? m.am : 'ready';
    if (!this.have) {
      this.have = true;
      this.snap = true;
      this.p.root.visible = this.wantVisible !== false;
    }
  }

  update(dt, time) {
    if (!this.have || !this.p.root.visible) return;
    const p = this.p, t = this.t, pos = p.root.position;
    const k = 1 - Math.exp(-14 * dt);

    if (this.snap || Math.hypot(t.x - pos.x, t.z - pos.z) > 8) {
      pos.set(t.x, t.y, t.z); // pehli baar ya respawn (door kood gaya) => seedha wahin
      this.snap = false;
    } else {
      pos.x += (t.x - pos.x) * k;
      pos.y += (t.y - pos.y) * k;
      pos.z += (t.z - pos.z) * k;
    }
    p.facing += wrap(t.f - p.facing) * k;
    p.root.rotation.y = p.facing;

    p.velocity.set(0, t.vy, 0);
    p.onGround = pos.y < 0.08 && Math.abs(t.vy) < 1;
    p.hSpeed += (t.hs - p.hSpeed) * k;
    p.camDelta = wrap(t.cy + Math.PI - p.facing);
    p.aimPoint.set(t.ax, t.ay, t.az);

    // gun ki halat (ready / empty / reload)
    if (t.am !== this.am) {
      if (t.am === 'empty') { p.recoil = 1; p.glow = 2.5; this._fire(); }
      if (t.am === 'reload') { p.reloadT = 0; p._clunked = false; }
      this.am = t.am;
    }
    p.ammo = this.am;
    if (p.ammo === 'reload') p.reloadT = Math.min(p.reloadT + dt, 2.55);
    p.recoil = damp(p.recoil, 0, 11, dt);
    p.glow = damp(p.glow, 0, 4, dt);

    p._animateBody(dt, time);
    p._animateWeapon(dt, time);
  }

  _fire() {
    const p = this.p;
    p.root.updateMatrixWorld(true);
    p.launcher.rocketSpawn.getWorldPosition(_o);
    _d.copy(p.aimPoint).sub(_o);
    if (_d.lengthSq() < 1) return;
    _d.normalize();
    if (this.onFire) this.onFire(_o.clone(), _d.clone());
  }
}