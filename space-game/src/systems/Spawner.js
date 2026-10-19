import { Asteroid } from '../entities/Asteroid.js';
import { Satellite } from '../entities/Satellite.js';
import { Coin } from '../entities/Coin.js';
import { Enemy } from '../entities/Enemy.js';

function coinPattern(w) {
  const margin = Math.min(150, w * 0.3);
  const cx = margin + Math.random() * (w - margin * 2);
  const pts = [];
  const kind = Math.floor(Math.random() * 4);
  if (kind === 0) { // straight line
    for (let i = 0; i < 6; i++) pts.push([cx, -i * 46]);
  } else if (kind === 1) { // arc
    for (let i = 0; i < 7; i++) pts.push([cx + Math.sin((i / 6) * Math.PI - Math.PI / 2) * 120, -i * 40]);
  } else if (kind === 2) { // zig-zag
    for (let i = 0; i < 8; i++) pts.push([cx + (i % 2 ? 55 : -55), -i * 44]);
  } else { // wave
    for (let i = 0; i < 10; i++) pts.push([cx + Math.sin(i * 0.7) * 110, -i * 40]);
  }
  return pts.map(([x, y]) => [Math.max(30, Math.min(w - 30, x)), y - 40]);
}

function pickEnemy(d) {
  const pool = ['scout', 'scout', 'fighter'];
  if (d > 300) pool.push('fighter', 'gunship');
  if (d > 600) pool.push('gunship', 'dreadnought');
  if (d > 1200) pool.push('dreadnought');
  return pool[Math.floor(Math.random() * pool.length)];
}

export class Spawner {
  constructor(world, screen) {
    this.world = world;
    this.screen = screen;
    this.reset();
  }

  reset() {
    this.astT = 1.5;
    this.satT = 5;
    this.coinT = 2;
    this.enemyT = 10;
  }

  // wdt = world time, so spawn density stays the same per metre flown
  update(wdt, distance, suppress) {
    if (suppress || wdt <= 0) return;
    const w = this.screen.width;
    const diff = Math.min(1, distance / 5000);
    this.astT -= wdt;
    this.satT -= wdt;
    this.coinT -= wdt;
    this.enemyT -= wdt;

    if (this.astT <= 0) {
      this.astT = 1.5 - diff * 0.9 + Math.random() * 0.8;
      const a = new Asteroid();
      a.position.set(40 + Math.random() * (w - 80), -100);
      this.world.add(this.world.asteroids, a);
    }
    if (this.satT <= 0) {
      this.satT = 5 + Math.random() * 4;
      const s = new Satellite();
      s.position.set(100 + Math.random() * Math.max(10, w - 200), -140);
      this.world.add(this.world.satellites, s);
    }
    if (this.coinT <= 0) {
      this.coinT = 3 + Math.random() * 2.5;
      for (const [x, y] of coinPattern(w)) {
        const c = new Coin(1);
        c.position.set(x, y);
        this.world.add(this.world.coins, c);
      }
    }
    if (this.enemyT <= 0 && distance > 120 && this.world.enemies.length === 0) {
      this.enemyT = 14 + Math.random() * 10 - diff * 6;
      this.world.add(this.world.enemies, new Enemy(pickEnemy(distance), this.screen));
    }
  }
}