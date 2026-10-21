import * as THREE from 'three';
import { Bot } from './bot.js';
import { BOTS } from './config.js';
import { buildNav, getHideNodes } from './nav.js';
import { on, fighters } from '../game/fighters.js';
import { me } from '../player/self.js';
import { losClear, levelOf } from '../world/collision.js';
import { roomInfo } from '../game/roomstate.js';

const ACTIVE = 4;                 // ek time pe sirf 4 bots ka dimaag chalta hai
const rnd = (a, b) => a + Math.random() * (b - a);
const _a = new THREE.Vector3(), _b = new THREE.Vector3();

export function createBots(scene, camera, total = BOTS.COUNT) {
  buildNav();
  roomInfo.total = total;
  roomInfo.botsLeft = total;

  const names = [...BOTS.NAMES].sort(() => Math.random() - 0.5);
  let nameI = 0, queued = total, now = 0, lastSpawn = -99;
  const slots = [], byF = new Map();

  // har naya bot naya "insaan": naam, skill, tareeka, gun
  function persona(b) {
    b.f.name = names[nameI++ % names.length] + BOTS.TAG;
    b.skill = rnd(BOTS.SKILL_MIN, BOTS.SKILL_MAX);
    b.camper = Math.random() < 0.4;
    b.rusher = !b.camper && Math.random() < 0.35;
    b.weapon = Math.random() < 0.5 ? 0 : 1;
    b.model.setWeapon(b.weapon);
    b.newReact();
  }

  // spawn wahi jahan koi human na dekh sake, cover ke peeche, aur pehle doosri floor
  function pickSpawn() {
    const hs = fighters.filter((f) => f.alive && (f.isPlayer || f.remote));
    const alive = slots.filter((s) => s.active && s.bot.f.alive).map((s) => s.bot.f.pos);
    const ok = [];
    for (const n of getHideNodes()) {
      if (alive.some((p) => Math.hypot(p.x - n.x, p.z - n.z) < 3 && Math.abs(p.y - n.y) < 2)) continue;
      let good = true;
      for (const h of hs) {
        const sameFloor = levelOf(h.pos.y) === n.level;
        const d = Math.hypot(n.x - h.pos.x, n.z - h.pos.z);
        if (sameFloor) {
          _a.set(h.pos.x, h.pos.y + (h.crouch ? 0.8 : 1.3), h.pos.z);
          _b.set(n.x, n.y + 1.0, n.z);
          if (d < 9 || losClear(_a, _b, n.level)) { good = false; break; }
        } else if (d < 4) { good = false; break; }
      }
      if (good) ok.push(n);
    }
    if (!ok.length) return null;
    const myLvl = levelOf(me.pos.y);
    const other = ok.filter((n) => n.level !== myLvl);
    if (other.length) return other[Math.floor(Math.random() * other.length)];
    ok.sort((p, q) =>
      Math.hypot(q.x - me.pos.x, q.z - me.pos.z) - Math.hypot(p.x - me.pos.x, p.z - me.pos.z));
    return ok[Math.floor(Math.random() * Math.min(5, ok.length))];
  }

  function spawnInto(s, node) {
    persona(s.bot);
    s.bot.spawn(me.pos, node);
    s.active = true;
    queued--;
    lastSpawn = now;
  }

  for (let i = 0; i < ACTIVE; i++) {
    const bot = new Bot(i, scene);
    const s = { bot, active: false, nextAt: 0, off: i >= total };
    slots.push(s);
    byF.set(bot.f, s);
    if (s.off) { bot.f.alive = false; bot.model.group.visible = false; }
    else spawnInto(s, pickSpawn() || undefined);
  }

  on('shot', (shooter, origin) => slots.forEach((s) => !s.off && s.bot.hear(shooter, origin)));
  on('damage', (victim, attacker) => byF.get(victim)?.bot.hurt(attacker));
  on('kill', (victim) => {
    const s = byF.get(victim);
    if (!s) return;
    s.bot.die();
    s.active = false;
    roomInfo.botsLeft = Math.max(0, roomInfo.botsLeft - 1);
    s.nextAt = now + rnd(3, 6);   // agla bot thodi der baad kahin se "nikalta" hai
  });

  const ctx = { now: 0, pressure: 0, player: me, camPos: camera.position };

  return {
    update(dt) {
      now += dt;
      ctx.now = now;
      ctx.pressure = Math.min(1, now / 120);
      for (const s of slots) {
        if (s.off) continue;
        s.bot.update(dt, ctx);
        if (!s.active && queued > 0 && now >= s.nextAt && now - lastSpawn > 2) {
          const node = pickSpawn();
          if (node) spawnInto(s, node);
          else s.nextAt = now + 1;   // abhi koi safe jagah nahi, 1s baad dobara
        }
      }
    },
  };
}