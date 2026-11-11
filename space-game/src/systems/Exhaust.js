import { Container, Sprite } from 'pixi.js';
import { getGlowTexture, getStarTexture } from '../utils/textures.js';
import { lerpColor } from '../utils/color.js';

const MAX = 700; // long trails need more particles
const DEFAULT = [0xcff1ff, 0x2a6bff];
const SAFFRON = 0xff9933, WHITE = 0xffffff, GREEN = 0x138808;
const STAR_COLORS = [0xffffff, 0x9fe8ff, 0xffe9a0, 0xd9b3ff, 0xffffff];
const FIRE = [0xffffe0, 0xffd21a, 0xff6a00, 0x8a1000];
const rnd = (a, b) => a + Math.random() * (b - a);

// Trail length = speed * life. Every style is now ~300 px long with a steady width.
// To make ALL trails longer / shorter, just change TRAIL_LEN (1 = as written here).
const TRAIL_LEN = 1;

function fireColor(k) {
  const x = k * (FIRE.length - 1);
  const i = Math.min(FIRE.length - 2, Math.floor(x));
  return lerpColor(FIRE[i], FIRE[i + 1], x - i);
}
function flagColor(k) { // saffron -> white -> green along the trail
  if (k < 0.3) return SAFFRON;
  if (k < 0.4) return lerpColor(SAFFRON, WHITE, (k - 0.3) / 0.1);
  if (k < 0.6) return WHITE;
  if (k < 0.7) return lerpColor(WHITE, GREEN, (k - 0.6) / 0.1);
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
      p.blendMode = 'normal'; // solid flag colours, ~350 px long
      p.max = rnd(1.7, 1.85); p.vx = rnd(-4, 4); p.vy = rnd(190, 205);
    } else if (kind === 'star') {
      p.texture = getStarTexture();
      p.max = rnd(1.1, 1.9); p.vx = rnd(-70, 70); p.vy = rnd(120, 260);
      p.size = rnd(16, 38); p.spin = rnd(-7, 7); p.tw = rnd(0, 6.28);
      p.col = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    } else if (kind === 'haze') {
      p.max = rnd(0.9, 1.3); p.vx = rnd(-20, 20); p.vy = rnd(150, 190); p.size = rnd(26, 40);
      p.colors = [0xbfeaff, 0x6a4fd8];
    } else if (kind === 'fire') {
      p.max = rnd(0.8, 1.1); p.vx = rnd(-30, 30); p.vy = rnd(260, 330); p.size = rnd(34, 46);
    } else if (kind === 'ember') {
      p.max = rnd(0.9, 1.4); p.vx = rnd(-100, 100); p.vy = rnd(220, 380); p.size = rnd(8, 14);
    } else {
      p.max = rnd(1.0, 1.15); p.vx = rnd(-8, 8); p.vy = rnd(210, 230);
    }
    p.max *= TRAIL_LEN;
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
      const rate = style === 'stars' ? 0.03 : style === 'fire' ? 0.016 : 0.02;
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
          p.width = p.height = 26 - k * 10;           // steady width, thins only a little
          p.alpha = 0.92 * (1 - k * 0.45);
          p.tint = flagColor(k);
          break;
        case 'star': {
          p.rotation += p.spin * dt;
          const tw = 0.55 + 0.45 * Math.sin(p.life * 22 + p.tw);
          p.width = p.height = p.size * (1 - k * 0.45);
          p.alpha = Math.min(1, (1 - k) * tw + 0.15 * (1 - k));
          p.tint = p.col;
          break;
        }
        case 'haze':
          p.width = p.height = p.size * (1 + k * 0.4);
          p.alpha = 0.35 * (1 - k);
          p.tint = lerpColor(p.colors[0], p.colors[1], k);
          break;
        case 'fire':
          p.width = p.height = p.size * (1 - k * 0.6);
          p.alpha = Math.pow(1 - k, 0.7) * 0.95;
          p.tint = fireColor(k);
          break;
        case 'ember':
          p.width = p.height = p.size * (1 - k);
          p.alpha = 1 - k;
          p.tint = lerpColor(0xffe27a, 0xff3a00, k);
          break;
        default:
          p.width = p.height = 24 * (1 - k * 0.7) + 6; // steady width, long tail
          p.alpha = 0.75 * (1 - k * 0.9);
          p.tint = lerpColor(p.colors[0], p.colors[1], k);
      }
    }
  }
}