import { Container, Graphics } from 'pixi.js';
import { CONFIG } from '../config.js';

export class Starfield extends Container {
  constructor(w, h) {
    super();
    this.w = w;
    this.h = h;
    for (let i = 0; i < CONFIG.starCount; i++) {
      const s = new Graphics().circle(0, 0, Math.random() * 1.5 + 0.5).fill(0xffffff);
      s.x = Math.random() * w;
      s.y = Math.random() * h;
      s.speed = 40 + Math.random() * 160;
      s.alpha = 0.3 + Math.random() * 0.7;
      this.addChild(s);
    }
  }

  update(dt) {
    for (const s of this.children) {
      s.y += s.speed * dt;
      if (s.y > this.h) { s.y = 0; s.x = Math.random() * this.w; }
    }
  }
}