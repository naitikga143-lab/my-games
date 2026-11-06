import { Container, Graphics } from 'pixi.js';
import { CONFIG } from '../config.js';
import { glowSprite } from '../utils/textures.js';
import { hsv } from '../utils/color.js';

const GOLD = 0xffc83d;

export class Coin extends Container {
  constructor(value = 1) {
    super();
    this.value = value;
    this.radius = 12;
    this.t = Math.random() * 6;
    this.phase = Math.random();
    this.vx = 0;
    this.vy = CONFIG.coinVy;

    // drawn white/grey and TINTED, so the same coin can be gold or rainbow
    this.body = new Graphics()
      .circle(0, 0, 12).fill(0xffffff).stroke({ width: 2, color: 0xffffff })
      .circle(0, 0, 7.5).stroke({ width: 1.5, color: 0x8a8a8a })
      .rect(-1.5, -4, 3, 8).fill(0x8a8a8a);
    this.body.tint = GOLD;
    this.glow = glowSprite(GOLD, 58, 0.55);
    this.addChild(this.glow, this.body);
  }

  update(wdt, dt, rainbow = false) {
    this.t += dt;
    this.y += this.vy * wdt;
    if (this.vx) {
      this.x += this.vx * dt;
      this.vx *= Math.max(0, 1 - dt * 2);
    }
    this.body.scale.x = Math.max(0.15, Math.abs(Math.cos(this.t * 4)));
    const col = rainbow ? hsv((this.t * 0.7 + this.phase) % 1) : GOLD;
    this.body.tint = col;
    this.glow.tint = col;
    this.glow.alpha = rainbow ? 0.85 : 0.55;
  }
}