import { Container, Sprite } from 'pixi.js';
import { getGlowTexture, getStarTexture } from '../utils/textures.js';
import { lerpColor } from '../utils/color.js';

const MAX = 320;
const DEFAULT = [0xcff1ff, 0x2a6bff];
const SAFFRON = 0xff9933, WHITE = 0xffffff, GREEN = 0x138808;
const STAR_COLORS = [0xffffff, 0x9fe8ff, 0xffe9a0, 0xd9b3ff, 0xffffff];
const FIRE = [0xffffe0, 0xffd21a, 0xff6a00, 0x8a1000];
const rnd = (a, b) => a + Math.random() * (b - a);

function fireColor(k) {
  const x = k * (FIRE.length - 1);
  const i = Math.min(FIRE.length - 2, Math.floor(x));
  return lerpColor(FIRE[i], FIRE[i + 1], x - i);
}
function flagColor(k) { // saffron -> white -> green along the trail
  if (k < 0.26) return SAFFRON;
  if (k < 0.38) return lerpColor(SAFFRON, WHITE, (k - 0.26) / 0.12);
  if (k < 0.6) return WHITE;
  if (k < 0.72) return lerpColor(WHITE, GREEN, (k - 0.6) / 0.12);
  return GREEN;
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
    this.addChild(s);
    return s;
  }

  spawn(x, y, kind, colors = DEFAULT) {
    if (this.active.length >= MAX) return;
    const p = this.pool.pop() ?? this.make();
    p.kind = kind;
    p.colors = colors;
    p.life = 0;
    p.visible = true;
    p.rotation = 0;
    p.x = x + rnd(-2, 2);
    p.y = y;
    p.texture = getGlowTexture();
    p.blendMode = 'add';
    if (kind === 'tricolor') {
      p.blendMode = 'normal'; // solid flag colours
      p.max = rnd(0.85, 1.0); p.vx = rnd(-6, 6); p.vy = rnd(165, 190);
    } else if (kind === 'star') {
      p.texture = getStarTexture();
      p.max = rnd(0.6, 1.1); p.vx = rnd(-95, 95); p.vy = rnd(100, 230);
      p.size = rnd(14, 36); p.spin = rnd(-7, 7); p.tw = rnd(0, 6.28);
      p.col = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    } else if (kind === 'haze') {
      p.max = rnd(0.5, 0.8); p.vx = rnd(-30, 30); p.vy = rnd(90, 150); p.size = rnd(24, 40);
      p.colors = [0xbfeaff, 0x6a4fd8];
    } else if (kind === 'fire') {
      p.max = rnd(0.35, 0.6); p.vx = rnd(-45, 45); p.vy = rnd(200, 330); p.size = rnd(30, 46);
    } else if (kind === 'ember') {
      p.max = rnd(0.5, 0.9); p.vx = rnd(-130, 130); p.vy = rnd(160, 330); p.size = rnd(8, 14);
    } else {
      p.max = rnd(0.4, 0.65); p.vx = rnd(-15, 15); p.vy = rnd(140, 220);
    }
    this.active.push(p);
  }

  emitParticles(player, style, colors) {
    const c = Math.cos(player.rotation), s = Math.sin(player.rotation);
    for (const lx of [-12, 12]) {
      const ly = 42;
      const x = player.x + lx * c - ly * s, y = player.y + lx * s + ly * c;
      if (style === 'tricolor') {
        this.spawn(x, y, 'tricolor');
      } else if (style === 'stars') {
        this.spawn(x, y, 'star');
        if (Math.random() < 0.5) this.spawn(x, y, 'haze');
      } else if (style === 'fire') {
        this.spawn(x, y, 'fire');
        this.spawn(x, y, 'fire');
        if (Math.random() < 0.15) this.spawn(x, y, 'ember');
      } else {
        this.spawn(x, y, 'default', colors);
      }
    }
  }

  clear() {
    for (const p of this.active) { p.visible = false; this.pool.push(p); }
    this.active.length = 0;
  }

  update(dt, player, style = 'default', colors = DEFAULT) {
    if (player.alive) {
      const rate = style === 'stars' ? 0.03 : style === 'fire' ? 0.014 : 0.016;
      this.timer = Math.min(this.timer + dt, 0.06);
      while (this.timer > rate) {
        this.timer -= rate;
        this.emitParticles(player, style, colors);
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
      switch (p.kind) {
        case 'tricolor':
          p.width = p.height = 24 - k * 8;
          p.alpha = 0.92 * (1 - k * 0.5);
          p.tint = flagColor(k);
          break;
        case 'star': {
          p.rotation += p.spin * dt;
          const tw = 0.55 + 0.45 * Math.sin(p.life * 22 + p.tw);
          p.width = p.height = p.size * (1 - k * 0.5);
          p.alpha = (1 - k) * tw + 0.15 * (1 - k);
          p.tint = p.col;
          break;
        }
        case 'haze':
          p.width = p.height = p.size * (1 + k * 0.5);
          p.alpha = 0.35 * (1 - k);
          p.tint = lerpColor(p.colors[0], p.colors[1], k);
          break;
        case 'fire':
          p.width = p.height = p.size * (1 - k * 0.55);
          p.alpha = Math.pow(1 - k, 0.8) * 0.95;
          p.tint = fireColor(k);
          break;
        case 'ember':
          p.width = p.height = p.size * (1 - k);
          p.alpha = 1 - k;
          p.tint = lerpColor(0xffe27a, 0xff3a00, k);
          break;
        default:
          p.width = p.height = 26 * (1 - k) + 6;
          p.alpha = 0.7 * (1 - k);
          p.tint = lerpColor(p.colors[0], p.colors[1], k);
      }
    }
  }
}