import { Container } from 'pixi.js';

export class World {
  constructor() {
    this.objects = new Container(); // hazards + coins
    this.shots = new Container();   // bullets + missiles
    this.asteroids = [];
    this.satellites = [];
    this.enemies = [];
    this.coins = [];
    this.bullets = [];
  }

  add(list, obj) {
    list.push(obj);
    (list === this.bullets ? this.shots : this.objects).addChild(obj);
    return obj;
  }

  remove(list, obj) {
    const i = list.indexOf(obj);
    if (i >= 0) list.splice(i, 1);
    obj.destroy({ children: true });
  }

  hazards() { return [...this.asteroids, ...this.satellites, ...this.enemies]; }

  fadeHazards() { for (const h of this.hazards()) h.fading = true; }

  clear() {
    for (const list of [this.asteroids, this.satellites, this.enemies, this.coins, this.bullets]) {
      for (const o of list) o.destroy({ children: true });
      list.length = 0;
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
    sweep(this.enemies, e => { e.update(dt, player, screen); if (e.gone) this.remove(this.enemies, e); });

    for (let i = this.coins.length - 1; i >= 0; i--) {
      const c = this.coins[i];
      c.update(wdt, dt);
      if (off(c)) this.remove(this.coins, c);
    }
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const b = this.bullets[i];
      b.update(dt, effects);
      if (b.gone) this.remove(this.bullets, b);
    }
  }
}