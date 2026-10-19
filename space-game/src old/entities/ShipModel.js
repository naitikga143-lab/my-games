import { Container, Graphics, Sprite } from 'pixi.js';
import { getGlowTexture } from '../utils/textures.js';

const mirror = p => p.map((v, i) => (i % 2 === 0 ? -v : v));
const same = p => p;
const ENGINES = [-12, 12];

function glow(color, size, alpha) {
  const s = new Sprite(getGlowTexture());
  s.anchor.set(0.5);
  s.width = s.height = size;
  s.tint = color;
  s.alpha = alpha;
  s.blendMode = 'add';
  return s;
}

export class ShipModel extends Container {
  constructor() {
    super();
    this.t = 0;

    this.aura = glow(0x3fa9ff, 240, 0.22);
    this.flames = ENGINES.map(x => {
      const g = new Graphics();
      g.position.set(x, 36);
      return g;
    });
    const hull = new Graphics();
    this.drawHull(hull);
    this.nozzleGlows = ENGINES.map(x => {
      const s = glow(0x7fd8ff, 60, 0.9);
      s.position.set(x, 40);
      return s;
    });

    this.lightL = new Graphics().circle(-50, 38, 2.5).fill(0xff3b3b);
    this.lightR = new Graphics().circle(50, 38, 2.5).fill(0x3bff6a);

    this.addChild(this.aura, ...this.flames, hull, ...this.nozzleGlows, this.lightL, this.lightR);
  }

  drawHull(g) {
    // Wings, accent stripe, canards (left + right)
    const wing = [-10, -2, -48, 26, -52, 40, -14, 34];
    const stripe = [-13, 6, -46, 31, -47, 35, -14, 11];
    const canard = [-9, -20, -24, -8, -9, -8];
    for (const m of [same, mirror]) {
      g.poly(m(wing)).fill(0x2a3a58).stroke({ width: 2, color: 0x6f8fc4 });
      g.poly(m(stripe)).fill(0x22d3ee);
      g.poly(m(canard)).fill(0x3a4f78).stroke({ width: 1.5, color: 0x8fb0e8 });
    }

    // Engine nozzles
    for (const x of ENGINES) {
      g.roundRect(x - 6, 30, 12, 10, 2).fill(0x10151f).stroke({ width: 1.5, color: 0x5f7aa8 });
    }

    // Fuselage + light/shadow halves for depth
    const body = [0, -48, 8, -32, 13, -6, 15, 24, 9, 36, -9, 36, -15, 24, -13, -6, -8, -32];
    g.poly(body).fill(0xdfe8f5).stroke({ width: 2, color: 0x8aa2c8 });
    g.poly([0, -48, 8, -32, 13, -6, 15, 24, 9, 36, 0, 36]).fill({ color: 0xffffff, alpha: 0.22 });
    g.poly([0, -48, -8, -32, -13, -6, -15, 24, -9, 36, 0, 36]).fill({ color: 0x1a2a4a, alpha: 0.18 });

    // Details
    g.rect(-9, 28, 18, 8).fill(0x2a3550);
    g.moveTo(-12, -2).lineTo(12, -2).stroke({ width: 1, color: 0x8aa2c8 });
    for (const s of [-1, 1]) {
      g.moveTo(s * 6, 4).lineTo(s * 8, 26).stroke({ width: 1.5, color: 0x22d3ee });
      g.roundRect(s * 11 - 3, 8, 6, 14, 2).fill(0x1a2233);
    }
    g.poly([0, -48, 3, -40, -3, -40]).fill(0xff5a5a);

    // Cockpit
    g.ellipse(0, -16, 6.5, 13).fill(0x0a2748).stroke({ width: 1.5, color: 0x9fe3ff });
    g.ellipse(-1.5, -19, 2.5, 6).fill({ color: 0x6fd0ff, alpha: 0.8 });
    g.ellipse(-2.2, -22, 1.2, 2.6).fill({ color: 0xffffff, alpha: 0.9 });
  }

  // thrust: -1 (peeche) .. 1 (aage)
  update(dt, thrust) {
    this.t += dt;
    const base = 18 + Math.max(0, thrust) * 16 - Math.max(0, -thrust) * 6;
    this.flames.forEach((g, i) => {
      const len = base + Math.sin(this.t * 45 + i * 2) * 4 + Math.random() * 5;
      g.clear()
        .poly([-6, 0, 6, 0, 0, len]).fill({ color: 0x2f9bff, alpha: 0.85 })
        .poly([-3.5, 0, 3.5, 0, 0, len * 0.62]).fill(0xbfeaff)
        .poly([-1.8, 0, 1.8, 0, 0, len * 0.3]).fill(0xffffff);
    });
    for (const s of this.nozzleGlows) {
      s.alpha = 0.7 + Math.random() * 0.3;
      s.width = s.height = 60 + Math.max(0, thrust) * 24;
    }
    this.aura.alpha = 0.2 + Math.sin(this.t * 3) * 0.04;
    this.lightL.alpha = Math.sin(this.t * 5) > 0 ? 1 : 0.2;
    this.lightR.alpha = Math.sin(this.t * 5 + Math.PI) > 0 ? 1 : 0.2;
  }
}