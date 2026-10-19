import { Container } from 'pixi.js';
import { CONFIG } from '../config.js';
import { ShipModel } from './ShipModel.js';

export class Player extends Container {
  constructor() {
    super();
    this.vx = 0;
    this.vy = 0;
    this.radius = 26;
    this.model = new ShipModel();
    this.addChild(this.model);
  }

  update(dt, input, screen) {
    const max = CONFIG.shipSpeed;
    const k = Math.min(1, dt * 7);
    this.vx += (input.x * max - this.vx) * k;
    this.vy += (input.y * max - this.vy) * k;

    this.x = Math.max(45, Math.min(screen.width - 45, this.x + this.vx * dt));
    this.y = Math.max(50, Math.min(screen.height - 50, this.y + this.vy * dt));

    const bank = this.vx / max;
    this.rotation = bank * 0.28;
    this.model.scale.x = 1 - Math.abs(bank) * 0.12;
    this.model.update(dt, -this.vy / max);
  }
}