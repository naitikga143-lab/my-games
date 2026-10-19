import { Container, Sprite } from 'pixi.js';
import { getGlowTexture } from '../utils/textures.js';

const MAX = 160;

function lerpColor(a, b, t) {
  const r = ((a >> 16) & 255) * (1 - t) + ((b >> 16) & 255) * t;
  const g = ((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t;
  const bl = (a & 255) * (1 - t) + (b & 255) * t;
  return (r << 16) | (g << 8) | bl;
}

export class Exhaust extends Container {
  constructor() {
    super();
    this.pool = [];
    this.active = [];
    this.timer = 0;
  }

  make() {
    const s = new Sprite(getGlowTexture());
    s.anchor.set(0.5);
    s.blendMode = 'add';
    this.addChild(s);
    return s;
  }

  spawn(x, y) {
    if (this.active.length >= MAX) return;
    const p = this.pool.pop() ?? this.make();
    p.x = x + (Math.random() - 0.5) * 4;
    p.y = y;
    p.life = 0;
    p.max = 0.4 + Math.random() * 0.25;
    p.vx = (Math.random() - 0.5) * 30;
    p.vy = 140 + Math.random() * 80;
    p.visible = true;
    this.active.push(p);
  }

  emitParticles(player) {
    const c = Math.cos(player.rotation), s = Math.sin(player.rotation);
    for (const lx of [-12, 12]) {
      const ly = 42;
      this.spawn(player.x + lx * c - ly * s, player.y + lx * s + ly * c);
    }
  }

  update(dt, player) {
    this.timer = Math.min(this.timer + dt, 0.05);
    while (this.timer > 0.016) {
      this.timer -= 0.016;
      this.emitParticles(player);
    }
    for (let i = this.active.length - 1; i >= 0; i--) {
      const p = this.active[i];
      p.life += dt;
      const k = p.life / p.max;
      if (k >= 1) {
        p.visible = false;
        this.pool.push(p);
        this.active.splice(i, 1);
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.width = p.height = 26 * (1 - k) + 6;
      p.alpha = 0.7 * (1 - k);
      p.tint = lerpColor(0xcff1ff, 0x2a6bff, k);
    }
  }
}