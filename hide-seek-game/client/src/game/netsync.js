import * as THREE from 'three';
import { socket, req } from '../ui/lobby/net.js';
import { toast } from '../ui/dom.js';
import { fighters, createFighter, revive, on, emit } from './fighters.js';
import { createCharacter } from '../player/model.js';
import { me } from '../player/self.js';
import { input, setWeapon, setScope } from '../player/input.js';
import { eco } from './economy.js';
import { tracer } from './tracers.js';
import { roomInfo } from './roomstate.js';
import { WEAPONS, BOT_GUN } from './weapondata.js';

const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const r2 = (v) => Math.round(v * 100) / 100;
const r3 = (v) => Math.round(v * 1000) / 1000;
const remotes = new Map();
const st = { speed: 0, side: 0, dir: 1, crouch: false, run: false, lean: 0, pitch: 0, twist: 0 };
const A = new THREE.Vector3(), B = new THREE.Vector3(), _p = new THREE.Vector3();

export function initNet(scene, controls) {
  function ensure(e) {
    let r = remotes.get(e.i);
    if (r) return r;
    const f = createFighter({ id: e.i, name: e.n });
    f.remote = true; f.alive = false;
    const model = createCharacter();
    model.group.visible = false;
    scene.add(model.group);
    r = { f, model, tp: new THREE.Vector3(), yaw: 0, tyaw: 0, pitch: 0, lean: 0, run: false, speed: 0, seen: false, weapon: 0, deadFor: e.a ? 0 : 99 };
    remotes.set(e.i, r);
    return r;
  }

  function drop(pid) {
    const r = remotes.get(pid);
    if (!r) return;
    scene.remove(r.model.group);
    const i = fighters.indexOf(r.f);
    if (i >= 0) fighters.splice(i, 1);
    remotes.delete(pid);
  }

  const who = (id) => (id === me.id ? me : remotes.get(id)?.f);

  socket.on('g:snap', ({ l, bl }) => {
    roomInfo.botsLeft = bl;
    for (const e of l) {
      if (e.i === me.id) continue;
      const r = ensure(e);
      r.f.name = e.n; r.f.team = e.t;
      r.tp.set(e.x, e.y, e.z);
      r.tyaw = e.yw; r.pitch = e.p || 0; r.lean = e.l || 0; r.run = !!e.r;
      r.f.crouch = !!e.c; r.f.hp = e.hp;
      if (!r.seen) { r.f.pos.copy(r.tp); r.yaw = e.yw; r.seen = true; }
      const was = r.f.alive;
      r.f.alive = !!e.a;
      if (r.f.alive && !was) { r.f.pos.copy(r.tp); r.yaw = e.yw; emit('spawn', r.f); }
      if (r.weapon !== e.w) { r.weapon = e.w; r.model.setWeapon(e.w); }
    }
  });
  socket.on('g:left', ({ pid }) => drop(pid));

  socket.on('g:tr', (d) => {
    if (d.s === me.id) return;                 // meri apni goli ka effect local ban chuka hai
    A.set(d.a[0], d.a[1], d.a[2]);
    B.set(d.b[0], d.b[1], d.b[2]);
    tracer(A, B);
    const r = remotes.get(d.s);
    if (r) r.model.kick();
    if (d.f) emit('shot', r ? r.f : null, A, null, d.w === 3 ? BOT_GUN : WEAPONS[d.w] || WEAPONS[0]);
    emit('impact', r ? r.f : null, B, d.h > 0 ? r?.f : null, d.h === 2);
  });

  socket.on('g:kill', (k) => {
    if (k.victim === me.id) return;
    const v = remotes.get(k.victim);
    if (!v) return;
    v.f.alive = false;
    emit('kill', v.f, who(k.killer) || { name: k.kn || '-' }, k.head);
  });

  socket.on('g:me', (d) => {
    me.kills = d.kills; me.headshots = d.hs; me.points = d.pts; me.coins = d.coins; me.hp = d.hp;
    roomInfo.respawn = !!d.rs;
    const old = eco.owned.slice();
    eco.owned = d.owned.slice();
    d.owned.forEach((o, i) => { if (o && !old[i]) setWeapon(i); });   // nayi gun turant haath me
    if (d.scopes) {
      const os = eco.scopes.slice();
      eco.scopes = d.scopes.slice();
      d.scopes.forEach((o, i) => { if (o && !os[i]) setScope(i); });
    }
  });

  socket.on('g:dmg', (d) => {
    me.hp = d.hp;
    const a = who(d.from) || { name: d.name || '-' };
    emit('damage', me, a, d.dmg, d.head);
    if (d.dead && me.alive) {
      me.alive = false;
      me.deaths++;
      emit('kill', me, a, d.head);
    }
  });

  socket.on('g:respawn', (d) => {
    controls.teleport(d.x, d.y, d.z);
    revive(me, d.x, d.y, d.z);
  });
  socket.on('g:corr', (d) => controls.teleport(d.x, d.y, d.z));
  socket.on('g:msg', (d) => toast(d.text));
  socket.on('g:clear', () => {
    roomInfo.banner = 'ROOM CLEAR!';
    setTimeout(() => { roomInfo.banner = ''; }, 6000);
  });

  // meri taraf ki goli server ko bhejo (damage server tay karega)
  on('shot', (s, o, d) => {
    if (s !== me || !d) return;
    socket.emit('g:shoot', { o: [r3(o.x), r3(o.y), r3(o.z)], d: [r3(d.x), r3(d.y), r3(d.z)], w: input.weapon });
  });

  req('g:join');

  let acc = 0;
  return {
    update(dt) {
      acc += dt;
      if (acc >= 1 / 15) {
        acc = 0;
        if (me.alive) {
          const a = controls.aim();
          socket.volatile.emit('g:state', {
            x: r2(me.pos.x), y: r2(me.pos.y), z: r2(me.pos.z), yaw: r2(a.yaw), pitch: r2(a.pitch),
            c: me.crouch ? 1 : 0, r: input.run ? 1 : 0, w: input.weapon, l: r2(a.lean),
          });
        }
      }
      const k = Math.min(1, dt * 12);
      for (const r of remotes.values()) {
        _p.copy(r.f.pos);
        r.f.pos.lerp(r.tp, k);
        const sp = _p.distanceTo(r.f.pos) / Math.max(dt, 1e-3) / 4.2;
        r.speed += (sp - r.speed) * Math.min(1, dt * 8);
        r.yaw += wrap(r.tyaw - r.yaw) * k;
        r.deadFor = r.f.alive ? 0 : r.deadFor + dt;
        const g = r.model.group;
        g.visible = r.seen && (r.f.alive || r.deadFor < 4);
        g.position.copy(r.f.pos);
        g.rotation.y = r.yaw + Math.PI;
        st.speed = r.speed; st.crouch = r.f.crouch; st.run = r.run;
        st.lean = r.lean; st.pitch = r.pitch; st.side = 0; st.dir = 1; st.twist = 0;
        r.model.update(dt, st);
        r.model.setDead(r.f.alive ? 0 : 1);
      }
    },
  };
}