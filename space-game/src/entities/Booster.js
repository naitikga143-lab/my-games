import { Container, Graphics } from 'pixi.js';
import { BOOSTERS, CONFIG } from '../config.js';
import { glowSprite } from '../utils/textures.js';
import { hsv } from '../utils/color.js';

// A booster floating in the air. Fly into it to pick it up.
export class Booster extends Container {
  constructor(kind) {
    super();
    const B = BOOSTERS[kind];
    this.kind = kind;
    this.radius = 26;
    this.t = Math.random() * 6;
    this.vy = CONFIG.coinVy;

    this.glow = glowSprite(B.color, 130, 0.7);
    const badge = new Graphics()
      .circle(0, 0, 25).fill({ color: 0x0a1226, alpha: 0.88 }).stroke({ width: 3, color: B.color });
    this.icon = new Graphics();
    if (kind === 'magnet') { // horseshoe magnet
      this.icon.moveTo(-10, 10).lineTo(-10, 0).arc(0, 0, 10, Math.PI, Math.PI * 2).lineTo(10, 10)
        .stroke({ width: 6, color: 0xff5a5a });
      this.icon.rect(-13, 8, 7, 6).fill(0xffffff).rect(6, 8, 7, 6).fill(0xffffff);
    } else if (kind === 'ghost') { // ghost
      this.icon.poly([-9, 11, -9, -3, -6, -9, 0, -12, 6, -9, 9, -3, 9, 11, 5, 7, 1, 11, -3, 7, -6, 11]).fill(0xe8fbff);
      this.icon.circle(-3.5, -3, 2).fill(0x0a2748).circle(3.5, -3, 2).fill(0x0a2748);
    } else if (kind === 'health') { // heart
      this.icon.circle(-5, -3, 6.5).fill(0xff4d6d).circle(5, -3, 6.5).fill(0xff4d6d)
        .poly([-11.2, 0, 11.2, 0, 0, 13]).fill(0xff4d6d);
      this.icon.circle(-6, -5, 2).fill({ color: 0xffffff, alpha: 0.7 });
    } else { // rainbow wheel
      for (let i = 0; i < 6; i++) {
        this.icon.moveTo(0, 0).arc(0, 0, 12, (i * Math.PI) / 3, ((i + 1) * Math.PI) / 3).lineTo(0, 0).fill(hsv(i / 6));
      }
    }
    this.addChild(this.glow, badge, this.icon);
  }

  update(wdt, dt) {
    this.t += dt;
    this.y += this.vy * wdt;
    this.icon.scale.set(1 + Math.sin(this.t * 5) * 0.1);
    this.glow.alpha = 0.55 + Math.sin(this.t * 4) * 0.2;
    if (this.kind === 'rainbow') this.glow.tint = hsv((this.t * 0.6) % 1);
  }
}