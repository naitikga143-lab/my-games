import { Container } from 'pixi.js';

export class World {
  constructor() {
    this.objects = new Container(); // hazards + coins + boosters
    this.shots = new Container();   // player + enemy bullets
    this.asteroids = [];
    this.satellites = [];
    this.enemies = [];
    this.coins = [];
    this.bullets = [];     // player's bullets / missiles
    this.enemyShots = [];  // bullets fired by enemy ships
    this.boosters = [];    // pick-ups (magnet, invisibility, colorful coins, health)
    this.rainbow = false;  // colorful-coins booster active
  }

  add(list, obj) {
    list.push(obj);
    (list === this.bullets || list === this.enemyShots ? this.shots : this.objects).addChild(obj);
    return obj;
  }

  remove(list, obj) {
    const i = list.indexOf(obj);
    if (i >= 0) list.splice(i, 1);
    obj.destroy({ children: true });
  }

  hazards() { return [...this.asteroids, ...this.satellites, ...this.enemies, ...this.enemyShots]; }

  fadeHazards() { for (const h of this.hazards()) h.fading = true; }

  clear() {
    for (const list of [this.asteroids, this.satellites, this.enemies, this.coins, this.bullets, this.enemyShots, this.boosters]) {
      for (const o of list) o.destroy({ children: true });
      list.length = 0;
    }
  }

  // coin magnet: pulls nearby coins towards the ship
  attractCoins(px, py, dt, R) {
    for (const c of this.coins) {
      const dx = px - c.x, dy = py - c.y, d = Math.hypot(dx, dy);
      if (d < R && d > 1) {
        const step = Math.min(d, (260 + (1 - d / R) * 900) * dt);
        c.x += (dx / d) * step;
        c.y += (dy / d) * step;
      }
    }
  }

  // wdt = world time (0 when the map is stopped), dt = real time
  update(wdt, dt, player, screen, effects) {
    const off = o => o.y > screen.height + 260 || o.x < -320 || o.x > screen.width + 320;

    const sweep = (list, fn) => {
      for (let i = list.length - 1; i >= 0; i--) {
        const o = list[i];
        if (o.fading) { // fade out (e.g. when entering a safe zone)
          o.alpha -= dt * 2;
          if (o.alpha <= 0) this.remove(list, o);
          continue;
        }
        fn(o);
      }
    };
    sweep(this.asteroids, a => { a.update(wdt); if (off(a)) this.remove(this.asteroids, a); });
    sweep(this.satellites, s => { s.update(wdt); if (off(s)) this.remove(this.satellites, s); });
    sweep(this.enemies, e => {
      e.update(dt, player, screen, this, effects);
      if (e.gone) this.remove(this.enemies, e);
    });
    sweep(this.enemyShots, s => {
      s.update(dt);
      if (s.y > screen.height + 120 || s.y < -400 || s.x < -200 || s.x > screen.width + 200) this.remove(this.enemyShots, s);
    });

    for (let i = this.coins.length - 1; i >= 0; i--) {
      const c = this.coins[i];
      c.update(wdt, dt, this.rainbow);
      if (off(c)) this.remove(this.coins, c);
    }
    for (let i = this.boosters.length - 1; i >= 0; i--) {
      const b = this.boosters[i];
      b.update(wdt, dt);
      if (off(b)) this.remove(this.boosters, b);
    }
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.update(dt, effects, this);
      if (b.gone) this.remove(this.bullets, b);
    }
  }
}