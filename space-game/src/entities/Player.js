import { Container, Graphics } from 'pixi.js';
import { CONFIG } from '../config.js';
import { ShipModel } from './ShipModel.js';
import { glowSprite } from '../utils/textures.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export class Player extends Container {
  constructor() {
    super();
    this.vx = 0;
    this.vy = 0;
    this.radius = 20;
    this.invuln = 0;
    this.hurtCd = 0;
    this.alive = true;
    this.model = new ShipModel();

    // Asteroid protector bubble
    this.shieldCharges = 0;
    this.flash = 0;
    this.shield = new Container();
    this.shieldGlow = glowSprite(0x7fe8ff, 170, 0.3);
    this.shieldRing = new Graphics();
    this.shield.addChild(this.shieldGlow, this.shieldRing);
    this.shield.visible = false;

    this.addChild(this.model, this.shield);
  }

  reset(screen) {
    this.position.set(screen.width / 2, screen.height - 140);
    this.vx = 0; this.vy = 0;
    this.rotation = 0;
    this.alive = true;
    this.visible = true;
    this.invuln = 1.5;
    this.hurtCd = 0;
    this.shieldCharges = 0;
    this.flash = 0;
  }

  shieldHit() { this.flash = 1; }

  drawShield(dt) {
    this.flash = Math.max(0, this.flash - dt * 3);
    const t = performance.now() / 1000;
    const pulse = 1 + Math.sin(t * 4) * 0.03;
    const R = 52 * pulse;
    const g = this.shieldRing;
    g.clear();
    g.circle(0, 0, R).fill({ color: 0x7fe8ff, alpha: 0.08 + this.flash * 0.25 })
      .stroke({ width: 2.5, color: 0x9ff0ff, alpha: 0.7 + this.flash * 0.3 });
    for (let i = 0; i < 3; i++) { // rotating shield segments
      const a = t * 1.5 + (i * Math.PI * 2) / 3;
      g.moveTo(Math.cos(a) * (R + 6), Math.sin(a) * (R + 6)).arc(0, 0, R + 6, a, a + 0.7);
    }
    g.stroke({ width: 3, color: 0xffffff, alpha: 0.5 });
    for (let i = 0; i < this.shieldCharges; i++) { // one dot per remaining hit
      const a = -Math.PI / 2 + (i - (this.shieldCharges - 1) / 2) * 0.5;
      g.circle(Math.cos(a) * R, Math.sin(a) * R, 4.5).fill(0xffffff);
    }
    this.shieldGlow.alpha = 0.3 + this.flash * 0.5;
  }

  update(dt, input, screen, agility = 1) {
    const max = CONFIG.shipSpeed * agility;
    let tvx = input.x * max;
    let tvy = input.y * max;
    if (input.touch) { // drag: ship follows the finger (a bit above it)
      tvx = clamp((input.touch.x - this.x) * 7, -max * 1.4, max * 1.4);
      tvy = clamp((input.touch.y - 90 - this.y) * 7, -max * 1.4, max * 1.4);
    }
    const k = Math.min(1, dt * 7 * agility);
    this.vx += (tvx - this.vx) * k;
    this.vy += (tvy - this.vy) * k;

    this.x = clamp(this.x + this.vx * dt, 45, screen.width - 45);
    this.y = clamp(this.y + this.vy * dt, 50, screen.height - 50);

    const bank = clamp(this.vx / CONFIG.shipSpeed, -1, 1);
    this.rotation = bank * 0.28;
    this.model.scale.x = 1 - Math.abs(bank) * 0.12;
    this.model.update(dt, clamp(-this.vy / CONFIG.shipSpeed, -1, 1));

    this.shield.visible = this.shieldCharges > 0;
    if (this.shield.visible) this.drawShield(dt);

    if (this.hurtCd > 0) this.hurtCd -= dt;
    if (this.invuln > 0) this.invuln -= dt;
    const blink = this.invuln > 0 || this.hurtCd > 0;
    this.model.alpha = blink ? (Math.sin(performance.now() / 60) > 0 ? 0.45 : 1) : 1;
  }
}