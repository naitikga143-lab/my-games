import { Container, Graphics, Sprite } from 'pixi.js';
import { getGlowTexture } from '../utils/textures.js';
import { lerpColor } from '../utils/color.js';

export class Effects extends Container {
  constructor() {
    super();
    this.parts = [];
    this.pool = [];
    this.rings = [];
  }

  _p() {
    let s = this.pool.pop();
    if (!s) {
      s = new Sprite(getGlowTexture());
      s.anchor.set(0.5);
      s.blendMode = 'add';
      this.addChild(s);
    }
    s.visible = true;
    return s;
  }

  burst(x, y, o = {}) {
    const { count = 16, speed = 240, life = 0.7, size = 40, c1 = 0xfff2b0, c2 = 0xff3b00, drag = 2 } = o;
    for (let i = 0; i < count; i++) {
      const p = this._p();
      const a = Math.random() * Math.PI * 2;
      const v = speed * (0.2 + Math.random() * 0.8);
      p.x = x; p.y = y;
      p.vx = Math.cos(a) * v;
      p.vy = Math.sin(a) * v;
      p.life = 0;
      p.max = life * (0.6 + Math.random() * 0.8);
      p.size = size * (0.5 + Math.random());
      p.c1 = c1; p.c2 = c2; p.drag = drag;
      this.parts.push(p);
    }
  }

  explosion(x, y, scale = 1) {
    this.burst(x, y, { count: 24, speed: 280 * scale, size: 62 * scale });
    this.burst(x, y, { count: 8, speed: 120 * scale, size: 100 * scale, c1: 0xffffff, c2: 0xff8a00, life: 0.4 });
    this.ring(x, y, 0xffb060, 100 * scale);
  }

  spark(x, y) { this.burst(x, y, { count: 6, speed: 220, size: 18, life: 0.25, c1: 0xffffff, c2: 0x66ccff }); }
  sparkle(x, y) { this.burst(x, y, { count: 8, speed: 130, size: 22, life: 0.4, c1: 0xfff6b0, c2: 0xffb300 }); }
  puff(x, y) { this.burst(x, y, { count: 1, speed: 20, size: 24, life: 0.5, c1: 0xdddddd, c2: 0x222233, drag: 3 }); }

  ring(x, y, color, maxR) {
    const g = new Graphics();
    g.position.set(x, y);
    g.life = 0; g.max = 0.45; g.maxR = maxR; g.color = color;
    this.addChild(g);
    this.rings.push(g);
  }

  clear() {
    for (const p of this.parts) { p.visible = false; this.pool.push(p); }
    this.parts.length = 0;
    for (const r of this.rings) { this.removeChild(r); r.destroy(); }
    this.rings.length = 0;
  }

  update(dt) {
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const p = this.parts[i];
      p.life += dt;
      const k = p.life / p.max;
      if (k >= 1) {
        p.visible = false;
        this.pool.push(p);
        this.parts.splice(i, 1);
        continue;
      }
      const f = Math.max(0, 1 - p.drag * dt);
      p.vx *= f; p.vy *= f;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.width = p.height = p.size * (1 - k * 0.6);
      p.alpha = 1 - k;
      p.tint = lerpColor(p.c1, p.c2, k);
    }
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const g = this.rings[i];
      g.life += dt;
      const k = g.life / g.max;
      if (k >= 1) {
        this.removeChild(g);
        g.destroy();
        this.rings.splice(i, 1);
        continue;
      }
      g.clear().circle(0, 0, g.maxR * k).stroke({ width: 5 * (1 - k) + 1, color: g.color, alpha: 1 - k });
    }
  }
}