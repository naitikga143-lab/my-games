import { Container, Graphics, Sprite } from 'pixi.js';
import { getBulletTexture, glowSprite } from '../utils/textures.js';

export class Bullet extends Sprite {
  constructor(x, y) {
    super(getBulletTexture());
    this.anchor.set(0.5);
    this.position.set(x, y);
    this.width = 10;
    this.height = 38;
    this.blendMode = 'add';
    this.vy = -1050;
    this.damage = 1;   // TODO: tune later
    this.aoe = 0;
    this.radius = 7;
    this.gone = false;
  }

  update(dt) {
    this.y += this.vy * dt;
    if (this.y < -80) this.gone = true;
  }
}

export class Missile extends Container {
  constructor(x, y) {
    super();
    this.position.set(x, y);
    this.vy = -260;
    this.damage = 6;   // TODO: tune later
    this.aoe = 100;
    this.radius = 11;
    this.isMissile = true;
    this.gone = false;
    this.puffT = 0;

    this.flame = glowSprite(0xffa040, 46, 0.9);
    this.flame.position.set(0, 22);
    this.flame.height = 70;
    const g = new Graphics()
      .rect(-4.5, -16, 9, 28).fill(0xe6edf7).stroke({ width: 1.5, color: 0x9aaac4 })
      .poly([0, -28, 4.5, -16, -4.5, -16]).fill(0xff4d4d)
      .poly([-4.5, 4, -12, 18, -4.5, 12]).fill(0x7a8aa8)
      .poly([4.5, 4, 12, 18, 4.5, 12]).fill(0x7a8aa8)
      .rect(-4.5, -4, 9, 4).fill(0xff4d4d);
    this.addChild(this.flame, g);
  }

  update(dt, effects) {
    this.vy = Math.max(-1150, this.vy - 1500 * dt);
    this.y += this.vy * dt;
    this.flame.alpha = 0.7 + Math.random() * 0.3;
    this.puffT -= dt;
    if (effects && this.puffT <= 0) {
      this.puffT = 0.03;
      effects.puff(this.x, this.y + 24);
    }
    if (this.y < -80) this.gone = true;
  }
}


// Targeting missile: no aiming needed. Locks on to the nearest enemy ship and
// destroys ANY enemy (any HP) in one hit.
export class SeekerMissile extends Container {
  constructor(x, y, world) {
    super();
    this.position.set(x, y);
    this.ang = -Math.PI / 2;
    this.speed = 420;
    this.t = 0;
    this.damage = 9999;
    this.aoe = 0;
    this.radius = 12;
    this.seeker = true;
    this.gone = false;
    this.puffT = 0;
    this.target = this.pick(world);

    this.flame = glowSprite(0x5ff0ff, 44, 0.95);
    this.flame.position.set(0, 22);
    this.flame.height = 64;
    const g = new Graphics()
      .rect(-4, -17, 8, 30).fill(0xd8f6ff).stroke({ width: 1.5, color: 0x5ff0ff })
      .poly([0, -30, 4, -17, -4, -17]).fill(0x00e5ff)
      .poly([-4, 2, -13, 18, -4, 13]).fill(0x00b8d4)
      .poly([4, 2, 13, 18, 4, 13]).fill(0x00b8d4)
      .rect(-4, -6, 8, 3).fill(0xff3b3b);
    this.addChild(this.flame, g);
  }

  pick(world) {
    let best = null, bd = Infinity;
    for (const e of world.enemies) {
      if (e.fading || e.gone) continue;
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (d < bd) { bd = d; best = e; }
    }
    return best;
  }

  update(dt, effects, world) {
    this.t += dt;
    if (!this.target || !world.enemies.includes(this.target) || this.target.fading) {
      this.target = this.pick(world);
    }
    this.speed = Math.min(980, this.speed + 900 * dt);
    if (this.target) {
      this.target.marked = 0.12; // shows the red lock-on brackets
      const want = Math.atan2(this.target.y - this.y, this.target.x - this.x);
      let diff = want - this.ang;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      const turn = (4 + this.t * 7) * dt; // turns harder the longer it flies, so it never misses
      this.ang += Math.max(-turn, Math.min(turn, diff));
    }
    this.x += Math.cos(this.ang) * this.speed * dt;
    this.y += Math.sin(this.ang) * this.speed * dt;
    this.rotation = this.ang + Math.PI / 2;
    this.flame.alpha = 0.7 + Math.random() * 0.3;

    this.puffT -= dt;
    if (effects && this.puffT <= 0) {
      this.puffT = 0.025;
      effects.burst(this.x - Math.cos(this.ang) * 22, this.y - Math.sin(this.ang) * 22, {
        count: 1, speed: 15, size: 22, life: 0.35, c1: 0xbffcff, c2: 0x0a4a8a, drag: 3,
      });
    }
    if (this.t > 8 || this.y < -250 || this.y > 3000 || this.x < -300 || this.x > 5000) this.gone = true;
  }
}