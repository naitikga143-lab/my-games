import * as THREE from 'three';
import { Bot } from '../bots/bot.js';
import { BOTS } from '../bots/config.js';
import { buildNav, getHideNodes } from '../bots/nav.js';
import { on, fighters } from '../game/fighters.js';
import { losClear, levelOf } from '../world/collision.js';

const ACTIVE = 4;
const rnd = (a, b) => a + Math.random() * (b - a);
const _a = new THREE.Vector3(), _b = new THREE.Vector3();

export function createDirector(scene, total) {
  buildNav();
  const names = [...BOTS.NAMES].sort(() => Math.random() - 0.5);
  let nameI = 0, left = total, queued = total, now = 0, lastSpawn = -99, started = false;
  const slots = [], byF = new Map();
  const ctx = { now: 0, pressure: 0, player: null, camPos: { x: 0, y: 0, z: 0 } };
  const humansAlive = () => fighters.filter((f) => f.human && f.alive);

  // har naya bot naya "insaan": naam, skill, tareeka
  function persona(b) {
    b.f.name = names[nameI++ % names.length] + BOTS.TAG;
    b.skill = rnd(BOTS.SKILL_MIN, BOTS.SKILL_MAX);
    b.camper = Math.random() < 0.4;
    b.rusher = !b.camper && Math.random() < 0.35;
    b.weapon = 3;
    b.newReact();
  }

  // cover ke peeche, kisi human ko dikhe nahi, pehle doosri floor
  function pickSpawn(hs) {
    const busy = slots.filter((s) => s.active && s.bot.f.alive).map((s) => s.bot.f.pos);
    const ok = [];
    for (const n of getHideNodes()) {
      if (busy.some((p) => Math.hypot(p.x - n.x, p.z - n.z) < 3 && Math.abs(p.y - n.y) < 2)) continue;
      let good = true;
      for (const h of hs) {
        const d = Math.hypot(n.x - h.pos.x, n.z - h.pos.z);
        if (levelOf(h.pos.y) === n.level) {
          _a.set(h.pos.x, h.pos.y + (h.crouch ? 0.8 : 1.3), h.pos.z);
          _b.set(n.x, n.y + 1.0, n.z);
          if (d < 9 || losClear(_a, _b, n.level)) { good = false; break; }
        } else if (d < 4) { good = false; break; }
      }
      if (good) ok.push(n);
    }
    if (!ok.length) return null;
    const ref = hs[Math.floor(Math.random() * hs.length)];
    const other = ok.filter((n) => n.level !== levelOf(ref.pos.y));
    if (other.length) return other[Math.floor(Math.random() * other.length)];
    ok.sort((p, q) =>
      Math.hypot(q.x - ref.pos.x, q.z - ref.pos.z) - Math.hypot(p.x - ref.pos.x, p.z - ref.pos.z));
    return ok[Math.floor(Math.random() * Math.min(5, ok.length))];
  }

  function spawnInto(s, node, ref) {
    persona(s.bot);
    s.bot.spawn(ref ? ref.pos : null, node);
    s.active = true;
    queued--;
    lastSpawn = now;
  }

  // ek bot ladai shuru kare to paas ke bots ko awaaz sunai deti hai
  function alert(b, target) {
    for (const s of slots) {
      const o = s.bot;
      if (o === b || !o.f.alive || o.state === 'combat') continue;
      const d = Math.hypot(o.f.pos.x - b.f.pos.x, o.f.pos.z - b.f.pos.z);
      const sameFloor = levelOf(o.feetY) === levelOf(b.feetY);
      if (d < 16 && (sameFloor || Math.random() < 0.4) && Math.random() < 0.45 + o.skill * 0.3) {
        o.goSearch(target.pos.x + rnd(-3, 3), target.pos.y, target.pos.z + rnd(-3, 3));
      }
    }
  }

  for (let i = 0; i < ACTIVE; i++) {
    const bot = new Bot(i, scene, true);
    bot.onEngage = alert;
    bot.f.alive = false;
    const s = { bot, active: false, nextAt: 0 };
    slots.push(s);
    byF.set(bot.f, s);
  }

  on('shot', (shooter, origin) => slots.forEach((s) => s.bot.hear(shooter, origin)));
  on('damage', (victim, attacker) => byF.get(victim)?.bot.hurt(attacker));
  on('kill', (victim) => {
    const s = byF.get(victim);
    if (!s) return;
    s.bot.die();
    s.active = false;
    left = Math.max(0, left - 1);
    s.nextAt = now + rnd(3, 6);     // agla bot thodi der baad kahin se "nikalta" hai
  });

  return {
    left: () => left,
    bots: () => slots.map((s) => s.bot),
    update(dt) {
      const hs = humansAlive();
      if (!hs.length) return;
      now += dt;
      ctx.now = now;
      ctx.pressure = Math.min(1, now / 120);
      if (!started) {
        started = true;
        for (const s of slots) if (queued > 0) spawnInto(s, pickSpawn(hs) || undefined, hs[0]);
      }
      for (const s of slots) {
        const b = s.bot;
        let nh = hs[0], bd = Infinity;
        for (const h of hs) {
          const d = (h.pos.x - b.f.pos.x) ** 2 + (h.pos.z - b.f.pos.z) ** 2;
          if (d < bd) { bd = d; nh = h; }
        }
        ctx.player = nh;
        b.update(dt, ctx);
        if (!s.active && queued > 0 && now >= s.nextAt && now - lastSpawn > 2) {
          const node = pickSpawn(hs);
          if (node) spawnInto(s, node, nh);
          else s.nextAt = now + 1;
        }
      }
    },
  };
}