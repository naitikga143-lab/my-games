import { Container, Graphics } from 'pixi.js';

export class Satellite extends Container {
  constructor() {
    super();
    this.t = Math.random() * 10;
    this.vy = 150 + Math.random() * 60;
    this.vx = (Math.random() - 0.5) * 40;
    this.spin = (Math.random() - 0.5) * 0.6;
    this.scale.set(0.7 + Math.random() * 0.5);
    this.rotation = Math.random() * Math.PI * 2;
    this.radius = 56 * this.scale.x; // indestructible, collision = game over

    const g = new Graphics();
    for (const x of [-76, 20]) { // solar panels
      g.rect(x, -18, 56, 36).fill(0x16327d).stroke({ width: 1.5, color: 0x7fb2ff });
      for (let i = 1; i < 4; i++) g.moveTo(x + i * 14, -18).lineTo(x + i * 14, 18);
      g.moveTo(x, 0).lineTo(x + 56, 0);
      g.stroke({ width: 1, color: 0x4f7fd1, alpha: 0.8 });
    }
    g.rect(-22, -2, 44, 4).fill(0x999999);
    g.roundRect(-16, -22, 32, 44, 4).fill(0xd8b24a).stroke({ width: 2, color: 0xfff2b8 });
    g.rect(-16, -6, 32, 5).fill(0xa88428);
    g.moveTo(0, -22).lineTo(0, -30).stroke({ width: 2, color: 0xdddddd });
    g.circle(0, -34, 8).fill(0xe8e8e8).stroke({ width: 1.5, color: 0x888888 });
    this.addChild(g);

    this.light = new Graphics().circle(0, 27, 3).fill(0xff3030);
    this.addChild(this.light);
  }

  update(dt) { // dt = world time
    this.t += dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.rotation += this.spin * dt;
    this.light.alpha = Math.sin(this.t * 6) > 0.6 ? 1 : 0.15;
  }
}