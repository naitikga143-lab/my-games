import { Container, Sprite } from 'pixi.js';
import { getGlowTexture } from '../utils/textures.js';
import { lerpColor } from '../utils/color.js';

const MAX = 160;
const DEFAULT = [0xcff1ff, 0x2a6bff];

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

  clear() {
    for (const p of this.active) { p.visible = false; this.pool.push(p); }
    this.active.length = 0;
  }

  update(dt, player, colors = DEFAULT) {
    if (player.alive) {
      this.timer = Math.min(this.timer + dt, 0.05);
      while (this.timer > 0.016) {
        this.timer -= 0.016;
        this.emitParticles(player);
      }
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
      p.tint = lerpColor(colors[0], colors[1], k);
    }
  }
}