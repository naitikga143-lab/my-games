import { CONFIG } from '../config.js';
import { Bullet, Missile } from '../entities/Projectiles.js';

export class Weapons {
  constructor(world) {
    this.world = world;
    this.reset();
  }

  reset() {
    this.fireT = 0;
    this.missileT = 0;
  }

  get missileFrac() { return 1 - this.missileT / CONFIG.missileCooldown; }

  update(dt, input, player) {
    this.fireT -= dt;
    this.missileT = Math.max(0, this.missileT - dt);
    const wantMissile = input.consumeMissile();
    if (!player.alive) return;

    if (input.firing && this.fireT <= 0) {
      this.fireT = CONFIG.fireInterval;
      for (const s of [-1, 1]) {
        this.world.add(this.world.bullets, new Bullet(player.x + s * 13, player.y - 26));
      }
    }
    if (wantMissile && this.missileT <= 0) {
      this.missileT = CONFIG.missileCooldown;
      this.world.add(this.world.bullets, new Missile(player.x, player.y - 34));
    }
  }
}