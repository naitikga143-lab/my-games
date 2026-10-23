import * as THREE from 'three';
import { Bot } from './bot.js';
import { BOTS } from './config.js';
import { buildNav, coverNodes, occ, getHideNodes } from './nav.js';
import { on } from '../game/fighters.js';
import { losClear, levelOf } from '../world/collision.js';

const ACTIVE = 4;
const rnd = (a, b) => a + Math.random() * (b - a);
const _a = new THREE.Vector3(), _b = new THREE.Vector3();

// total bots ka pehla half ground floor pe, wo sab marne ke baad doosra half upar wali floor pe
export function createSquad(scene, total, { headless, humans, camPos }) {
  buildNav();
  const covers = coverNodes.filter((n) => n.links.length);
  const spots = covers.length >= 6 ? covers : getHideNodes();

  const names = [...BOTS.NAMES].sort(() => Math.random() - 0.5);
  const groundTotal = Math.ceil(total / 2);
  const upperTotal = total - groundTotal;
  let nameI = 0, killed = 0, spG = 0, spU = 0, now = 0, lastSpawn = -99, started = false;
  const slots = [], byF = new Map();
  const ctx = { now: 0, pressure: 0, player: null, camPos };

  const phaseLevel = () => (killed < groundTotal ? 0 : 1);
  const canSpawn = () => (killed < groundTotal ? spG < groundTotal : spU < upperTotal);

  function persona(b) {
    b.f.name = names[nameI++ % names.length] + BOTS.TAG;
    b.skill = rnd(BOTS.SKILL_MIN, BOTS.SKILL_MAX);
    b.newReact();
  }

  // cover ke peeche, player se door, player ko dikhe nahi
  function pickSpawn(level, hs, relax) {
    const here = hs.filter((h) => levelOf(h.pos.y) === level);
    const cand = [];
    for (const n of spots) {
      if (n.level !== level || occ.has(n.i)) continue;
      let ok = true;
      for (const h of here) {
        const d = Math.hypot(n.x - h.pos.x, n.z - h.pos.z);
        if (d < (relax ? 8 : 11)) { ok = false; break; }
        _a.set(h.pos.x, h.pos.y + (h.crouch ? 0.8 : 1.3), h.pos.z);
        _b.set(n.x, n.y + 0.8, n.z);
        if (losClear(_a, _b, level)) { ok = false; break; }          // crouch hua bot dikhna nahi chahiye
        if (!relax) {
          _b.y = n.y + 1.3;
          if (losClear(_a, _b, level)) {                              // is jagah ka khula hissa player ko dikhta hai
            let inView = true;
            if (h.yaw !== undefined) {
              const dot = (-Math.sin(h.yaw) * (n.x - h.pos.x) - Math.cos(h.yaw) * (n.z - h.pos.z)) / d;
              inView = dot > 0.4;
            }
            if (inView || d < 16) { ok = false; break; }
          }
        }
      }
      if (ok) cand.push(n);
    }
    if (!cand.length) return null;
    if (here.length) {
      const dist = (n) => Math.min(...here.map((h) => Math.hypot(n.x - h.pos.x, n.z - h.pos.z)));
      cand.sort((p, q) => dist(q) - dist(p));
      return cand[Math.floor(Math.random() * Math.min(6, cand.length))];
    }
    return cand[Math.floor(Math.random() * cand.length)];
  }

  function spawnInto(s, node) {
    persona(s.bot);
    if (phaseLevel() === 0) spG++; else spU++;
    s.bot.spawn(null, node);
    s.active = true;
    lastSpawn = now;
  }

  // ek bot ladai shuru kare to baaki bots jaldi jhaankte hain
  function alert(b, target) {
    for (const s of slots) {
      const o = s.bot;
      if (o === b || !o.f.alive || o.sub === 'peek') continue;
      const d = Math.hypot(o.f.pos.x - b.f.pos.x, o.f.pos.z - b.f.pos.z);
      if (d < 16 && Math.random() < 0.4 + o.skill * 0.3) o.alertTo(target.pos);
    }
  }

  for (let i = 0; i < ACTIVE; i++) {
    const bot = new Bot(i, scene, headless);
    bot.onEngage = alert;
    const s = { bot, active: false, nextAt: 0, since: 0 };
    slots.push(s);
    byF.set(bot.f, s);
  }

  on('shot', (shooter, origin) => slots.forEach((s) => s.active && s.bot.hear(shooter, origin)));
  on('damage', (victim, attacker) => byF.get(victim)?.bot.hurt(attacker));
  on('kill', (victim) => {
    const s = byF.get(victim);
    if (!s) return;
    s.bot.die();
    s.active = false;
    killed++;
    s.nextAt = now + rnd(3, 6);     // agla bot thodi der baad kahin chhupa hua "nikalta" hai
    s.since = now;
  });

  return {
    left: () => total - killed,
    bots: () => slots.map((s) => s.bot),
    update(dt) {
      const hs = humans();
      if (!hs.length) return;
      now += dt;
      ctx.now = now;

      if (!started) {
        started = true;
        for (const s of slots) {
          if (!canSpawn()) break;
          const node = pickSpawn(phaseLevel(), hs, false) || pickSpawn(phaseLevel(), hs, true);
          if (node) spawnInto(s, node);
        }
      }
      for (const s of slots) {
        s.bot.update(dt, ctx);
        if (!s.active && canSpawn() && now >= s.nextAt && now - lastSpawn > 2) {
          const node = pickSpawn(phaseLevel(), hs, now - s.since > 10);
          if (node) spawnInto(s, node);
          else s.nextAt = now + 1;
        }
      }
    },
  };
}