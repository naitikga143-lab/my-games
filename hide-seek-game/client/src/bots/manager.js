import { Bot } from './bot.js';
import { BOTS } from './config.js';
import { buildNav } from './nav.js';
import { on } from '../game/fighters.js';
import { me } from '../player/self.js';

export function createBots(scene, camera) {
  buildNav();
  const bots = [];
  const byFighter = new Map();
  for (let i = 0; i < BOTS.COUNT; i++) {
    const b = new Bot(i, scene);
    bots.push(b);
    byFighter.set(b.f, b);
  }
  bots.forEach((b) => b.spawn(me.pos));

  on('shot', (shooter, origin) => bots.forEach((b) => b.hear(shooter, origin)));
  on('damage', (victim, attacker) => byFighter.get(victim)?.hurt(attacker));
  on('kill', (victim) => byFighter.get(victim)?.die());

  let now = 0;
  const ctx = { now: 0, pressure: 0, player: me, camPos: camera.position };

  return {
    update(dt) {
      now += dt;
      ctx.now = now;
      ctx.pressure = Math.min(1, now / 120);   // time ke saath bots player ko dhoondhne lagte hain
      for (const b of bots) b.update(dt, ctx);
    },
  };
}