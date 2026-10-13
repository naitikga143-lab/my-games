import { Container, Graphics } from 'pixi.js';
import { CONFIG } from '../config.js';

export class Player extends Container {
  constructor() {
    super();
    const ship = new Graphics()
      .poly([0, -30, 22, 24, 0, 12, -22, 24])
      .fill(0x4fd1ff)
      .stroke({ width: 2, color: 0xffffff });
    this.addChild(ship);
  }

  update(dt, input, screen) {
    this.x += input.x * CONFIG.shipSpeed * dt;
    this.y += input.y * CONFIG.shipSpeed * dt;
    this.x = Math.max(25, Math.min(screen.width - 25, this.x));
    this.y = Math.max(30, Math.min(screen.height - 30, this.y));
  }
}