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