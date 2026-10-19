import { Container, Graphics } from 'pixi.js';

export class Asteroid extends Container {
  constructor() {
    super();
    const size = 20 + Math.random() * 40;
    this.radius = size * 0.9;
    this.hp = Math.max(2, Math.round(size / 14)); // 2..4
    this.hit = 0;
    this.vy = 230 + Math.random() * 150;
    this.vx = (Math.random() - 0.5) * 120;
    this.spin = (Math.random() - 0.5) * 2;

    const pts = [];
    const n = 10 + Math.floor(Math.random() * 5);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = size * (0.75 + Math.random() * 0.35);
      pts.push(Math.cos(a) * r, Math.sin(a) * r);
    }
    const g = new Graphics().poly(pts).fill(0x6b5f55).stroke({ width: 2, color: 0x9a8c7e });
    const craters = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < craters; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * size * 0.5;
      const cx = Math.cos(a) * d, cy = Math.sin(a) * d;
      const cr = size * (0.12 + Math.random() * 0.1);
      g.circle(cx, cy, cr).fill(0x4a4038);
      g.circle(cx, cy, cr).stroke({ width: 1.5, color: 0x8a7c6e, alpha: 0.7 });
    }
    this.addChild(g);
  }

  hurt(d) {
    this.hp -= d;
    this.hit = 0.12;
    return this.hp <= 0;
  }

  update(dt) { // dt = world time
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.rotation += this.spin * dt;
    if (this.hit > 0) {
      this.hit -= dt;
      this.scale.set(1 + Math.max(0, this.hit) * 0.5);
    }
  }
}