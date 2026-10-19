import { Container } from 'pixi.js';
import { CONFIG } from '../config.js';
import { ShipModel } from './ShipModel.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export class Player extends Container {
  constructor() {
    super();
    this.vx = 0;
    this.vy = 0;
    this.radius = 20;
    this.invuln = 0;
    this.alive = true;
    this.model = new ShipModel();
    this.addChild(this.model);
  }

  reset(screen) {
    this.position.set(screen.width / 2, screen.height - 140);
    this.vx = 0; this.vy = 0;
    this.rotation = 0;
    this.alive = true;
    this.visible = true;
    this.invuln = 1.5;
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

    if (this.invuln > 0) {
      this.invuln -= dt;
      this.model.alpha = Math.sin(performance.now() / 60) > 0 ? 0.45 : 1;
    } else {
      this.model.alpha = 1;
    }
  }
}