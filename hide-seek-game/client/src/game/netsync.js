import * as THREE from 'three';
import { socket, req } from '../ui/lobby/net.js';
import { fighters, createFighter, applyDamage, on, emit } from './fighters.js';
import { createCharacter } from '../player/model.js';
import { me } from '../player/self.js';
import { input } from '../player/input.js';

const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const r2 = (v) => Math.round(v * 100) / 100;
const remotes = new Map();
const st = { speed: 0, side: 0, dir: 1, crouch: false, run: false, lean: 0, pitch: 0, twist: 0 };
const _p = new THREE.Vector3(), _o = new THREE.Vector3();

export function initNet(scene, controls) {
  function add(i) {
    if (remotes.has(i.pid) || i.pid === me.id) return;
    const f = createFighter({ id: i.pid, name: i.name });
    f.remote = true; f.team = i.team; f.alive = false;
    const model = createCharacter();
    model.group.visible = false;
    scene.add(model.group);
    remotes.set(i.pid, { f, model, tp: new THREE.Vector3(), yaw: 0, tyaw: 0, pitch: 0, lean: 0, run: false, speed: 0, seen: false, weapon: 0 });
  }

  function drop(pid) {
    const r = remotes.get(pid);
    if (!r) return;
    scene.remove(r.model.group);
    const i = fighters.indexOf(r.f);
    if (i >= 0) fighters.splice(i, 1);
    remotes.delete(pid);
  }

  const who = (pid) => (pid === me.id ? me : remotes.get(pid)?.f);

  socket.on('g:roster', (list) => list.forEach(add));
  socket.on('g:joined', add);
  socket.on('g:left', ({ pid }) => drop(pid));

  socket.on('g:state', (s) => {
    const r = remotes.get(s.pid);
    if (!r) return;
    r.tp.set(s.x, s.y, s.z);
    r.tyaw = s.yaw; r.pitch = s.pitch; r.lean = s.l; r.run = !!s.r;
    r.f.crouch = !!s.c; r.f.hp = s.hp;
    if (!r.seen) { r.f.pos.copy(r.tp); r.yaw = s.yaw; r.seen = true; }
    const wasDead = !r.f.alive;
    r.f.alive = !!s.a;
    if (r.f.alive && wasDead) emit('spawn', r.f);
    if (r.weapon !== s.w) { r.weapon = s.w; r.model.setWeapon(s.w); }
  });

  socket.on('g:shot', (d) => {
    const r = remotes.get(d.pid);
    if (!r) return;
    r.model.kick();
    emit('shot', r.f, _o.set(r.f.pos.x, r.f.pos.y + 1.3, r.f.pos.z));   // bots awaaz sunte hain
  });

  socket.on('g:damage', (d) => applyDamage(me, who(d.from) || null, d.dmg, d.head));

  socket.on('g:kill', (k) => {
    if (k.victim === me.id) return;
    const v = remotes.get(k.victim);
    if (!v) return;
    v.f.alive = false;
    const killer = who(k.killer) || { name: k.killerName || '-' };
    if (k.killer === me.id) {
      me.kills++;
      me.points += k.head ? 150 : 100;
      if (k.head) me.headshots++;
    }
    emit('kill', v.f, killer, k.head);
  });

  // meri taraf ki events
  on('shot', (s) => { if (s === me) socket.emit('g:shot', { w: input.weapon }); });
  on('remoteHit', (s, v, head) => {
    if (s === me) socket.emit('g:hit', { victim: v.id, head: !!head, w: input.weapon });
  });
  on('kill', (v, a, head) => {
    if (v === me) socket.emit('g:dead', { killer: a && a.remote ? a.id : null, killerName: a ? a.name : '', head: !!head });
  });

  req('g:join');

  let acc = 0;
  return {
    update(dt) {
      acc += dt;
      if (acc >= 1 / 15) {
        acc = 0;
        const a = controls.aim();
        socket.volatile.emit('g:state', {
          x: r2(me.pos.x), y: r2(me.pos.y), z: r2(me.pos.z), yaw: r2(a.yaw), pitch: r2(a.pitch),
          c: me.crouch ? 1 : 0, r: input.run ? 1 : 0, w: input.weapon, l: r2(a.lean),
          hp: me.hp, a: me.alive ? 1 : 0,
        });
      }
      const k = Math.min(1, dt * 12);
      for (const r of remotes.values()) {
        _p.copy(r.f.pos);
        r.f.pos.lerp(r.tp, k);
        const sp = _p.distanceTo(r.f.pos) / Math.max(dt, 1e-3) / 4.2;
        r.speed += (sp - r.speed) * Math.min(1, dt * 8);
        r.yaw += wrap(r.tyaw - r.yaw) * k;
        const g = r.model.group;
        g.visible = r.seen;
        g.position.copy(r.f.pos);
        g.rotation.y = r.yaw + Math.PI;
        st.speed = r.speed; st.crouch = r.f.crouch; st.run = r.run;
        st.lean = r.lean; st.pitch = r.pitch;
        r.model.update(dt, st);
        r.model.setDead(r.f.alive ? 0 : 1);
      }
    },
  };
}