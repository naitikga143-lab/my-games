import { Container, Sprite } from 'pixi.js';
import { getPuffTextures, getGlowTexture } from '../utils/textures.js';

const rnd = (a, b) => a + Math.random() * (b - a);

// Foreground sky effects (drawn ABOVE the ship): big cloud puffs flying past,
// occasional thick cloud banks, and wind streaks when you are going fast.
export class SkyFX extends Container {
  constructor(screen) {
    super();
    this.screen = screen;
    this.puffs = [];
    this.pool = [];
    this.timer = 0.4;
    this.bankT = rnd(40, 60);
    this.textures = getPuffTextures();
    this.streaks = [];
    for (let i = 0; i < 22; i++) {
      const s = new Sprite(getGlowTexture());
      s.anchor.set(0.5);
      s.tint = 0xffffff;
      s.blendMode = 'add';
      s.alpha = 0;
      this.addChild(s);
      this.streaks.push(s);
      this.resetStreak(s, true);
    }
  }

  resetStreak(s, anywhere) {
    const { width: w, height: h } = this.screen;
    s.x = rnd(0, w);
    s.y = anywhere ? rnd(-100, h) : rnd(-300, -60);
    s.width = rnd(2, 4);
    s.height = rnd(70, 190);
    s.vy = rnd(1500, 2400);
    s.k = rnd(0.4, 1);
  }

  spawnPuff(x, y, bank) {
    let p = this.pool.pop();
    if (!p) {
      p = new Sprite(this.textures[0]);
      p.anchor.set(0.5);
      this.addChild(p);
    }
    p.texture = this.textures[Math.floor(Math.random() * this.textures.length)];
    p.visible = true;
    p.x = x; p.y = y;
    p.scale.set(bank ? rnd(2.0, 3.0) : rnd(1.0, 2.2));
    if (Math.random() < 0.5) p.scale.x *= -1;
    p.rotation = rnd(-0.15, 0.15);
    p.vy = bank ? rnd(820, 980) : rnd(420, 760);
    p.vx = rnd(-25, 25);
    p.peak = bank ? 0.3 : rnd(0.12, 0.24);
    p.alpha = 0;
    this.puffs.push(p);
  }

  // dt = real time, speed = world speed multiplier (0 while the map is stopped)
  update(dt, speed, player) {
    const { width: w, height: h } = this.screen;
    const f = 0.15 + Math.min(speed, 2.5);
    this.timer -= dt * f;
    this.bankT -= dt * f;

    if (this.timer <= 0 && this.puffs.length < 8) {
      this.timer = rnd(0.9, 2.0);
      this.spawnPuff(rnd(0, w), -170, false);
    }
    if (this.bankT <= 0) { // a thick cloud bank: fly through it!
      this.bankT = rnd(50, 80);
      const cx = rnd(w * 0.2, w * 0.8);
      for (let i = 0; i < 4; i++) this.spawnPuff(cx + rnd(-w * 0.35, w * 0.35), -150 - i * rnd(60, 110), true);
    }
    for (let i = this.puffs.length - 1; i >= 0; i--) {
      const p = this.puffs[i];
      p.y += p.vy * f * dt;
      p.x += p.vx * dt;
      const prog = (p.y + 220) / (h + 440);
      if (prog >= 1) {
        p.visible = false;
        this.pool.push(p);
        this.puffs.splice(i, 1);
        continue;
      }
      let a = p.peak * Math.pow(Math.sin(Math.max(0, prog) * Math.PI), 0.7);
      if (player) { // clouds thin out around the ship so you can always see
        const R = 230 * Math.abs(p.scale.x);
        const d = Math.hypot(p.x - player.x, p.y - player.y);
        if (d < R) a *= 0.15 + 0.85 * (d / R);
      }
      p.alpha = a;
    }

    const boost = Math.max(0, Math.min(1, (speed - 1.05) / 1.1));
    for (const s of this.streaks) {
      s.alpha = boost * 0.2 * s.k;
      if (boost <= 0) continue;
      s.y += s.vy * (0.4 + speed) * dt;
      if (s.y > h + 200) this.resetStreak(s, false);
    }
  }
}