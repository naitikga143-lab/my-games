import { CONFIG } from '../config.js';
import { Bullet, Missile, SeekerMissile } from '../entities/Projectiles.js';

export class Weapons {
  constructor(world) {
    this.world = world;
    this.reset();
  }

  reset() {
    this.fireT = 0;
    this.missileT = 0;
    this.missileTotal = CONFIG.missileCooldown;
  }

  get missileFrac() { return 1 - this.missileT / this.missileTotal; }

  update(dt, input, player, state) {
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
      const enemyOnScreen = this.world.enemies.some(e => !e.fading && e.y > -e.radius * 0.5);
      if (state.seekers > 0 && enemyOnScreen) { // targeting missile: auto-locks, kills any enemy
        state.seekers--;
        this.missileT = this.missileTotal = CONFIG.seekerCooldown;
        this.world.add(this.world.bullets, new SeekerMissile(player.x, player.y - 34, this.world));
      } else {
        this.missileT = this.missileTotal = CONFIG.missileCooldown;
        this.world.add(this.world.bullets, new Missile(player.x, player.y - 34));
      }
    }
  }
}