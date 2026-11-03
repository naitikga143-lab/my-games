import { Container, Graphics } from 'pixi.js';
import { glowSprite } from '../utils/textures.js';

// A shot fired by an enemy ship. Bigger ships fire bigger shots that hurt more.
export class EnemyBullet extends Container {
  constructor(x, y, angle, speed, damage, size, color) {
    super();
    this.position.set(x, y);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.damage = damage;
    this.radius = size;
    this.t = 0;
    this.core = new Graphics()
      .circle(0, 0, size).fill(color).stroke({ width: 2, color: 0xffffff, alpha: 0.9 })
      .circle(0, 0, size * 0.45).fill(0xffffff);
    this.addChild(glowSprite(color, size * 5, 0.55), this.core);
  }

  update(dt) {
    this.t += dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.core.scale.set(1 + Math.sin(this.t * 18) * 0.1);
  }
}