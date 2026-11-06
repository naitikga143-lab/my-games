import { Container, Graphics } from 'pixi.js';
import { glowSprite } from '../utils/textures.js';
import { EnemyBullet } from './EnemyBullet.js';

const mir = p => p.map((v, i) => (i % 2 === 0 ? -v : v));
const same = p => p;
const DOWN = Math.PI / 2;

// Enemies run sideways and fire CONTINUOUSLY straight down (not aimed at you),
// so you dodge between the bullets. dmg = HP the player loses per bullet.
const FIRE = {
  scout: { // 1 stream
    interval: 0.45,
    volley: () => [{ a: DOWN, ox: 0, dmg: 1, speed: 300, size: 6, color: 0xff7a3d }],
  },
  fighter: { // 2 streams (twin cannons)
    interval: 0.6,
    volley: () => [-30, 30].map(ox => ({ a: DOWN, ox, dmg: 2, speed: 320, size: 7, color: 0xc084fc })),
  },
  gunship: { // 3 streams, slightly fanned out
    interval: 0.75,
    volley: () => [-0.2, 0, 0.2].map(d => ({ a: DOWN + d, ox: 0, dmg: 3, speed: 290, size: 9, color: 0x7dffb0 })),
  },
  dreadnought: { // big centre orb + 2 side streams
    interval: 0.9,
    volley: () => [
      { a: DOWN, ox: 0, dmg: 4, speed: 250, size: 14, color: 0xff3b3b },
      { a: DOWN - 0.3, ox: -45, dmg: 4, speed: 270, size: 9, color: 0xff8a5a },
      { a: DOWN + 0.3, ox: 45, dmg: 4, speed: 270, size: 9, color: 0xff8a5a },
    ],
  },
};

// All art is drawn nose-UP, then flipped so the nose faces the player.
const TYPES = {
  scout: {
    hp: 12, radius: 24, coins: 5, speed: 240,
    draw() {
      const c = new Container();
      const eng = glowSprite(0xff7a3d, 54, 0.9);
      eng.position.set(0, 20);
      const g = new Graphics()
        .poly([0, -28, 9, -8, 22, 18, 9, 11, 0, 20, -9, 11, -22, 18, -9, -8]).fill(0xc0392b).stroke({ width: 2, color: 0xff9a7a })
        .poly([0, -18, 5, -4, 0, 6, -5, -4]).fill(0xffd9b0)
        .rect(-1.5, 6, 3, 10).fill(0x7a1f14);
      c.addChild(eng, g);
      return c;
    },
  },
  fighter: {
    hp: 30, radius: 34, coins: 10, speed: 200,
    draw() {
      const c = new Container();
      const g = new Graphics();
      for (const m of [same, mir]) {
        g.poly(m([-8, -4, -46, 20, -42, 34, -10, 24])).fill(0x4b1fa8).stroke({ width: 2, color: 0xc7a2ff });
      }
      g.poly([0, -40, 10, -18, 13, 16, 0, 30, -13, 16, -10, -18]).fill(0x7b3ff0).stroke({ width: 2, color: 0xd9c2ff });
      for (const s of [-1, 1]) g.rect(s * 30 - 2.5, 8, 5, 24).fill(0x2a1166).stroke({ width: 1, color: 0xc7a2ff });
      g.ellipse(0, -8, 5, 10).fill(0xffe28a);
      const e1 = glowSprite(0xb06cff, 42, 0.9); e1.position.set(-7, 30);
      const e2 = glowSprite(0xb06cff, 42, 0.9); e2.position.set(7, 30);
      c.addChild(e1, e2, g);
      return c;
    },
  },
  gunship: {
    hp: 60, radius: 48, coins: 20, speed: 140,
    draw() {
      const c = new Container();
      const g = new Graphics();
      for (const s of [-1, 1]) g.roundRect(s * 50 - 11, -14, 22, 52, 8).fill(0x1f4a37).stroke({ width: 2, color: 0x7dffb0 });
      g.roundRect(-40, -32, 80, 64, 14).fill(0x2f6b4f).stroke({ width: 2.5, color: 0x7dffb0 });
      g.moveTo(-30, -18).lineTo(30, -18).moveTo(-30, 8).lineTo(30, 8).moveTo(-30, 22).lineTo(30, 22);
      g.stroke({ width: 1.5, color: 0x1a3a2b });
      g.rect(-3, -38, 6, 34).fill(0x13281f).stroke({ width: 1.5, color: 0x7dffb0 });
      g.circle(0, -4, 15).fill(0x1f4a37).stroke({ width: 2, color: 0x7dffb0 });
      g.circle(0, -4, 5).fill(0xff5a5a);
      c.addChild(g);
      for (const [x, y] of [[-24, 36], [0, 40], [24, 36]]) {
        const e = glowSprite(0x7dffb0, 50, 0.9);
        e.position.set(x, y);
        c.addChild(e);
      }
      return c;
    },
  },
  dreadnought: {
    hp: 120, radius: 70, coins: 50, speed: 90,
    draw() {
      const c = new Container();
      const g = new Graphics();
      g.poly([0, -64, 36, -44, 72, -12, 84, 30, 52, 62, 20, 54, 0, 70, -20, 54, -52, 62, -84, 30, -72, -12, -36, -44])
        .fill(0x363d4c).stroke({ width: 3, color: 0x9aa6bd });
      g.poly([0, -50, 26, -34, 52, -8, 60, 24, 0, 40, -60, 24, -52, -8, -26, -34])
        .fill(0x2a303d).stroke({ width: 1.5, color: 0x5f6b82 });
      for (const [x, y] of [[-40, 0], [40, 0], [-22, -28], [22, -28]]) {
        g.rect(x - 2, y - 24, 4, 18).fill(0x1b2029).stroke({ width: 1, color: 0xff6b6b });
        g.circle(x, y, 9).fill(0x1b2029).stroke({ width: 2, color: 0xff6b6b });
      }
      g.circle(0, 6, 16).fill(0xff2a2a).stroke({ width: 2, color: 0xffb0b0 });
      const core = glowSprite(0xff3b3b, 96, 0.8); core.position.set(0, 6);
      c.addChild(g, core);
      for (const [x, y] of [[-20, 56], [20, 56], [-50, 50], [50, 50]]) {
        const e = glowSprite(0xff4d4d, 56, 0.9);
        e.position.set(x, y);
        c.addChild(e);
      }
      return c;
    },
  },
};

export const ENEMY_TYPES = Object.keys(TYPES);

export class Enemy extends Container {
  constructor(type, screen) {
    super();
    const T = TYPES[type];
    this.type = type;
    this.maxHp = T.hp;
    this.hp = T.hp;
    this.radius = T.radius;
    this.coins = T.coins;
    this.speed = T.speed;
    this.hit = 0;
    this.t = Math.random() * 10;
    this.life = 16 + Math.random() * 6;
    this.dir = Math.random() < 0.5 ? -1 : 1;
    this.hoverY = 90 + Math.random() * screen.height * 0.16; // stays in the TOP area
    this.gone = false;
    this.fire = FIRE[type];
    this.fireT = 1 + Math.random() * 0.5; // first shot a moment after spawning

    this.art = T.draw();
    this.art.rotation = Math.PI;
    this.bar = new Graphics();
    this.marked = 0; // set by targeting missiles
    this.reticle = new Graphics();
    this.reticle.visible = false;
    const RR = this.radius * 1.3;
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      this.reticle.moveTo(Math.cos(a - 0.3) * RR, Math.sin(a - 0.3) * RR).arc(0, 0, RR, a - 0.3, a + 0.3);
    }
    this.reticle.stroke({ width: 3, color: 0xff4d4d });
    this.addChild(this.art, this.bar, this.reticle);
    this.drawBar();

    this.x = this.radius + Math.random() * (screen.width - this.radius * 2);
    this.y = -this.radius - 40;
  }

  drawBar() {
    const w = this.radius * 1.6;
    const y = -this.radius - 18;
    this.bar.clear()
      .rect(-w / 2, y, w, 5).fill({ color: 0x000000, alpha: 0.55 })
      .rect(-w / 2, y, w * Math.max(0, this.hp / this.maxHp), 5).fill(0xff4d4d);
  }

  shoot(world) {
    const f = this.fire;
    this.fireT = f.interval;
    const mx = this.x, my = this.y + this.radius * 0.55;
    for (const s of f.volley()) {
      world.add(world.enemyShots, new EnemyBullet(mx + s.ox, my, s.a, s.speed, s.dmg, s.size, s.color));
    }
  }

  hurt(d) {
    this.hp -= d;
    this.hit = 0.1;
    this.drawBar();
    return this.hp <= 0;
  }

  update(dt, player, screen, world) {
    this.t += dt;
    this.life -= dt;
    if (this.life <= 0) { // time is up: fly away upwards
      this.y -= 170 * dt;
      if (this.y < -this.radius - 120) this.gone = true;
    } else {
      if (this.y < this.hoverY) this.y += 130 * dt;
      else this.y += (this.hoverY - this.y) * Math.min(1, dt * 2);

      // lateral run: sweeps left <-> right across the screen
      this.x += this.dir * this.speed * dt;
      const m = this.radius + 10;
      if (this.x < m) { this.x = m; this.dir = 1; }
      if (this.x > screen.width - m) { this.x = screen.width - m; this.dir = -1; }

      // back off upwards if the player flies right up to it
      const d = Math.hypot(this.x - player.x, this.y - player.y);
      const near = this.radius + 130;
      if (d < near) this.y -= (near - d) * 3 * dt;
      this.y = Math.max(this.radius * 0.4, this.y);

      // continuous fire straight down (not aimed): dodge between the bullets
      if (world && player.alive && this.y > 30) {
        this.fireT -= dt;
        if (this.fireT <= 0) this.shoot(world);
      }
    }
    this.art.y = Math.sin(this.t * 2) * 5;
    if (this.marked > 0) {
      this.marked -= dt;
      this.reticle.visible = true;
      this.reticle.rotation += dt * 2.5;
    } else {
      this.reticle.visible = false;
    }
    if (this.hit > 0) {
      this.hit -= dt;
      this.art.scale.set(1 + Math.max(0, this.hit) * 0.6);
    }
  }
}