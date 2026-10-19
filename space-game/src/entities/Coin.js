import { Container, Graphics } from 'pixi.js';
import { CONFIG } from '../config.js';
import { glowSprite } from '../utils/textures.js';

export class Coin extends Container {
  constructor(value = 1) {
    super();
    this.value = value;
    this.radius = 12;
    this.t = Math.random() * 6;
    this.vx = 0;
    this.vy = CONFIG.coinVy;

    this.body = new Graphics()
      .circle(0, 0, 12).fill(0xffc83d).stroke({ width: 2, color: 0xfff3b0 })
      .circle(0, 0, 7.5).stroke({ width: 1.5, color: 0xb97a00 })
      .rect(-1.5, -4, 3, 8).fill(0xb97a00);
    this.addChild(glowSprite(0xffc83d, 58, 0.55), this.body);
  }

  update(wdt, dt) {
    this.t += dt;
    this.y += this.vy * wdt;
    if (this.vx) {
      this.x += this.vx * dt;
      this.vx *= Math.max(0, 1 - dt * 2);
    }
    this.body.scale.x = Math.max(0.15, Math.abs(Math.cos(this.t * 4)));
  }
}