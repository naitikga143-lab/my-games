import { Coin } from '../entities/Coin.js';

const hit = (a, b, pad = 0) => {
  const dx = a.x - b.x, dy = a.y - b.y, r = a.radius + b.radius + pad;
  return dx * dx + dy * dy < r * r;
};

function damageAsteroid(g, a, d) {
  if (a.hurt(d)) {
    g.effects.explosion(a.x, a.y, a.radius / 32);
    g.shake(5);
    g.world.remove(g.world.asteroids, a);
  } else {
    g.effects.spark(a.x, a.y);
  }
}

function damageEnemy(g, e, d) {
  if (e.hurt(d)) {
    g.effects.explosion(e.x, e.y, e.radius / 28);
    g.shake(4 + e.radius / 8);
    for (let i = 0; i < e.coins; i++) { // enemy drops coins
      const c = new Coin(1);
      c.position.set(e.x + (Math.random() - 0.5) * e.radius, e.y + (Math.random() - 0.5) * e.radius);
      c.vx = (Math.random() - 0.5) * 320;
      g.world.add(g.world.coins, c);
    }
    g.world.remove(g.world.enemies, e);
  } else {
    g.effects.spark(e.x, e.y);
  }
}

function explodeMissile(g, m) {
  g.effects.explosion(m.x, m.y, 1.7);
  g.shake(8);
  for (const a of [...g.world.asteroids]) {
    if (!a.fading && Math.hypot(a.x - m.x, a.y - m.y) < m.aoe + a.radius) damageAsteroid(g, a, m.damage);
  }
  for (const e of [...g.world.enemies]) {
    if (!e.fading && Math.hypot(e.x - m.x, e.y - m.y) < m.aoe + e.radius) damageEnemy(g, e, m.damage);
  }
}

export function resolveCollisions(g) {
  const { world, player, state, effects } = g;

  // Bullets / missiles
  for (let i = world.bullets.length - 1; i >= 0; i--) {
    const b = world.bullets[i];
    let target = null;
    let kind = '';
    for (const s of world.satellites) if (!s.fading && hit(b, s)) { target = s; kind = 'sat'; break; }
    if (!target) for (const a of world.asteroids) if (!a.fading && hit(b, a)) { target = a; kind = 'ast'; break; }
    if (!target) for (const e of world.enemies) if (!e.fading && hit(b, e)) { target = e; kind = 'enemy'; break; }
    if (!target) continue;

    if (b.aoe) explodeMissile(g, b);
    else if (kind === 'sat') effects.spark(b.x, b.y); // satellites take no damage
    else if (kind === 'ast') damageAsteroid(g, target, b.damage);
    else damageEnemy(g, target, b.damage);
    world.remove(world.bullets, b);
  }

  // Coins (always collectable)
  for (let i = world.coins.length - 1; i >= 0; i--) {
    const c = world.coins[i];
    if (hit(player, c, 12) && player.alive) {
      state.coins += c.value;
      effects.sparkle(c.x, c.y);
      world.remove(world.coins, c);
    }
  }

  // Ship vs hazards: nothing can hurt the ship inside a safe zone
  if (g.inZone || !player.alive || player.invuln > 0) return;
  for (const a of [...world.asteroids]) {
    if (a.fading || !hit(player, a)) continue;
    if (state.fuel && state.fuel.smash) { // intense energy smashes meteors
      damageAsteroid(g, a, 999);
    } else {
      return g.gameOver();
    }
  }
  for (const s of world.satellites) if (!s.fading && hit(player, s)) return g.gameOver();
  for (const e of world.enemies) if (!e.fading && hit(player, e)) return g.gameOver();
}