import * as THREE from 'three';
import { colliders } from '../world/colliders.js';
import { blockedAt } from '../world/collision.js';
import { groundY } from '../world/stairs.js';
import { FLOOR_Y, SLAB, ROOF_Y } from '../world/dims.js';
import { input, keys, peekValue } from './input.js';
import { WEAPONS, updateWeapon } from './weapons.js';
import { me } from './self.js';
import { shoot, revive } from '../game/fighters.js';
import { GAME } from '../game/config.js';
import { SCOPES } from '../game/weapondata.js';
import { eco } from '../game/economy.js';
import { createViewGun } from './viewgun.js';
import { roomInfo } from '../game/roomstate.js';
import { fxState } from '../game/fix.js';

const SPEED = 4.2, ACCEL = 12;
const EYE = 1.3, EYE_CROUCH = 0.8;
const TOP = 1.4, TOP_CROUCH = 0.9;
const LEAN = 0.5, CAM_DIST = 2.4, FRONT_DIST = 1.7, CAM_PAD = 0.22;
const BASE_FOV = 75, RUN_FOV = 81, D2R = Math.PI / 180;
const SPAWNS = [[0, 12], [-9, 11], [9, 11], [-15, 10]];
const TOUCH = matchMedia('(pointer: coarse)').matches;
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

export function createControls(camera, dom, avatar, spawnIdx = 0, net = false) {
  let yaw = 0, pitch = 0, bodyYaw = 0, feetY = 0, eye = EYE, lean = 0, bobPhase = 0, deadT = 0;
  let adsK = 0, kickLeft = 0, breath = 0;
  const S0 = SPAWNS[spawnIdx % SPAWNS.length];
  const pos = new THREE.Vector3(S0[0], 0, S0[1]);
  me.pos.copy(pos);
  const vel = new THREE.Vector2();
  const st = { speed: 0, side: 0, dir: 1, crouch: false, run: false, lean: 0, pitch: 0, twist: 0 };
  const camBox = new THREE.Box3();
  const pad = new THREE.Vector3(CAM_PAD, CAM_PAD, CAM_PAD);
  const from = new THREE.Vector3(), to = new THREE.Vector3(), pt = new THREE.Vector3();
  const aimO = new THREE.Vector3(), aimD = new THREE.Vector3();
  const viewGun = createViewGun(camera);
  camera.rotation.order = 'YXZ';

  if (!TOUCH) {
    dom.addEventListener('click', () => dom.requestPointerLock());
    document.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement !== dom) return;
      input.lookX += e.movementX * 0.002;
      input.lookY += e.movementY * 0.002;
    });
  }

  function respawn() {
    const [x, z] = SPAWNS[Math.floor(Math.random() * SPAWNS.length)];
    const y = roomInfo.level ? FLOOR_Y : 0;
    pos.set(x, 0, z);
    feetY = y; lean = 0;
    vel.set(0, 0);
    revive(me, x, y, z);
  }

  function camHits(p) {
    camBox.min.copy(p).sub(pad);
    camBox.max.copy(p).add(pad);
    return colliders.some((c) => c.intersectsBox(camBox));
  }

  function thirdPerson(hx, hy, hz, rx, rz, ceil, front, fx, fy, fz) {
    if (!front) {
      to.set(hx - fx * CAM_DIST + rx * 0.4, hy + 0.15 - fy * CAM_DIST, hz - fz * CAM_DIST + rz * 0.4);
    } else {
      to.set(hx + fx * FRONT_DIST, hy + 0.05 + fy * FRONT_DIST, hz + fz * FRONT_DIST);
    }
    to.y = Math.min(ceil, Math.max(feetY + 0.2, to.y));
    from.set(hx, hy, hz);
    let good = 0;
    for (let i = 1; i <= 16; i++) {
      pt.lerpVectors(from, to, i / 16);
      if (i > 5 && camHits(pt)) break;
      good = i / 16;
    }
    camera.position.lerpVectors(from, to, good);
    if (!front) camera.rotation.set(pitch, yaw, 0);
    else camera.rotation.set(-pitch, yaw + Math.PI, 0);
  }

  function update(dt) {
    const alive = me.alive;
    const zoom = SCOPES[eco.scope].zoom;
    const sens = 1 - (1 - Math.pow(zoom, -0.9)) * adsK;          // scope me dheere ghoomta hai

    yaw -= input.lookX * sens;
    pitch = Math.max(-1.4, Math.min(1.4, pitch - input.lookY * sens));
    input.lookX = 0; input.lookY = 0;

    // smooth recoil: kick dheere dheere lagti hai
    const kk = kickLeft * Math.min(1, dt * 22);
    pitch = Math.min(1.4, pitch + kk);
    kickLeft -= kk;

    const wantAds = alive && input.ads && input.view === 2;
    adsK += ((wantAds ? 1 : 0) - adsK) * Math.min(1, dt * 12);

    if (alive) deadT = 0;
    else {
      deadT += dt;
      if (GAME.RESPAWN && !net && deadT > GAME.RESPAWN_DELAY) respawn();
    }
    avatar.setWeapon(input.weapon);

    const crouch = alive && input.crouch;
    const run = alive && !wantAds && !!(input.run || keys.ShiftLeft);
    const top = crouch ? TOP_CROUCH : TOP;
    const deadK = alive ? 0 : Math.min(1, deadT * 2.5);
    eye += ((crouch ? EYE_CROUCH : EYE) - eye) * Math.min(1, dt * 10);

    let f = 0, s = 0;
    if (alive) {
      f = (keys.KeyW ? 1 : 0) - (keys.KeyS ? 1 : 0) + input.moveY;
      s = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0) + input.moveX;
    }
    const len = Math.hypot(f, s);
    if (len > 1) { f /= len; s /= len; }
    if (len < 0.1) { f = 0; s = 0; }
    const mul = (crouch ? 0.8 : run ? 1.55 : 1) * (1 - 0.12 * adsK) * fxState.slowK;
    const dirX = -Math.sin(yaw) * f + Math.cos(yaw) * s;
    const dirZ = -Math.cos(yaw) * f - Math.sin(yaw) * s;
    const k = Math.min(1, dt * ACCEL);
    vel.x += (dirX * SPEED * mul - vel.x) * k;
    vel.y += (dirZ * SPEED * mul - vel.y) * k;

    if (!blockedAt(pos.x + vel.x * dt, pos.z, feetY, top)) pos.x += vel.x * dt; else vel.x = 0;
    if (!blockedAt(pos.x, pos.z + vel.y * dt, feetY, top)) pos.z += vel.y * dt; else vel.y = 0;

    const rx = Math.cos(yaw), rz = -Math.sin(yaw);
    const hfx = -Math.sin(yaw), hfz = -Math.cos(yaw);
    const speedNow = vel.length() / SPEED;
    const fwdV = (vel.x * hfx + vel.y * hfz) / SPEED;
    const sideV = (vel.x * rx + vel.y * rz) / SPEED;

    const g = groundY(pos.x, pos.z, feetY);
    feetY += (g - feetY) * Math.min(1, dt * 12);
    me.pos.set(pos.x, feetY, pos.z);
    me.crouch = crouch;
    me.yaw = yaw;

    let target = alive ? peekValue() : 0;
    if (target && blockedAt(pos.x + rx * LEAN * target, pos.z + rz * LEAN * target, feetY, top)) target = 0;
    lean += (target - lean) * Math.min(1, dt * 10);

    const hx = pos.x + rx * lean * LEAN;
    const hz = pos.z + rz * lean * LEAN;
    const hy = feetY + eye * (1 - deadK) + 0.25 * deadK;

    // FOV: run me thoda badhta hai, scope me zoom
    const baseFov = run && speedNow > 0.8 ? RUN_FOV : BASE_FOV;
    const adsFov = (2 * Math.atan(Math.tan((BASE_FOV * D2R) / 2) / zoom)) / D2R;
    const wantFov = baseFov + (adsFov - baseFov) * adsK;
    if (Math.abs(wantFov - camera.fov) > 0.01) { camera.fov = wantFov; camera.updateProjectionMatrix(); }

    const cp = Math.cos(pitch);
    const fx = -Math.sin(yaw) * cp, fy = Math.sin(pitch), fz = -Math.cos(yaw) * cp;
    bobPhase += dt * speedNow * 9;
    breath += dt;
    if (input.view === 2) {
      const amt = Math.min(1, speedNow) * (1 - adsK);
      const sway = Math.cos(bobPhase) * 0.012 * amt;
      const bobY = -Math.abs(Math.sin(bobPhase)) * 0.035 * amt;
      const br = adsK * (zoom >= 2 ? 0.0003 * zoom : 0);       // scope me halka sans ka hilna
      camera.position.set(hx + rx * sway, hy + bobY, hz + rz * sway);
      camera.rotation.set(
        pitch + Math.sin(breath * 1.7) * br,
        yaw + Math.cos(breath * 1.1) * br,
        -lean * 0.25 + deadK * 0.9
      );
    } else {
      const ceil = (feetY > FLOOR_Y / 2 ? ROOF_Y : FLOOR_Y - SLAB) - 0.2;
      thirdPerson(hx, hy, hz, rx, rz, ceil, input.view === 3, fx, fy, fz);
    }

    if (alive && updateWeapon(dt)) {
      const w = WEAPONS[input.weapon];
      if (input.view === 1) {
        aimO.copy(camera.position);
        camera.getWorldDirection(aimD);
      } else {
        aimO.set(hx, hy, hz);
        aimD.set(fx, fy, fz);
      }
      const sp = w.spread * (1 + speedNow * 1.5) * (crouch ? 0.6 : 1) * (1 - 0.6 * adsK);
      aimD.x += (Math.random() - 0.5) * 2 * sp;
      aimD.y += (Math.random() - 0.5) * 2 * sp;
      aimD.z += (Math.random() - 0.5) * 2 * sp;
      aimD.normalize();
      shoot(me, aimO, aimD, w);
      kickLeft += w.kick * (1 - 0.6 * adsK);
      yaw -= (Math.random() - 0.5) * w.kick * 0.5 * (1 - adsK);
      avatar.kick();
      viewGun.kick();
    }
    viewGun.update(dt, input.view === 2 && alive, input.weapon, speedNow, run, adsK);

    bodyYaw += wrap(yaw - bodyYaw) * Math.min(1, dt * 9);
    let tw = wrap(yaw - bodyYaw);
    if (Math.abs(tw) > 1.2) { bodyYaw = yaw - Math.sign(tw) * 1.2; tw = Math.sign(tw) * 1.2; }

    avatar.group.visible = input.view !== 2;
    if (input.view !== 2) {
      avatar.group.position.set(pos.x, feetY, pos.z);
      avatar.group.rotation.y = bodyYaw + Math.PI;
      st.speed = speedNow; st.side = sideV; st.dir = fwdV < -0.3 ? -1 : 1;
      st.crouch = crouch; st.run = run; st.lean = lean; st.pitch = pitch; st.twist = tw;
      avatar.update(dt, st);
      avatar.setDead(deadK);
    }
  }

  function teleport(x, y, z) {
    pos.set(x, 0, z);
    feetY = y;
    vel.set(0, 0);
    lean = 0;
    deadT = 0;
  }

  return { update, teleport, aim: () => ({ yaw, pitch, lean }), ads: () => adsK };
}