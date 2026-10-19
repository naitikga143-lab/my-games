import { Container, Graphics } from 'pixi.js';
import { CONFIG } from '../config.js';
import { glowSprite } from '../utils/textures.js';
import { makeText } from '../ui/widgets.js';

const KINDS = {
  fuel: { title: 'FUEL DEPOT', accent: 0x22d3ee, alt: 0xff8a1f },
  parts: { title: 'PARTS BAY', accent: 0xc084fc, alt: 0xffd166 },
};
const GATE_Y = 168; // local coords: centre of the docking gate
const GATE_R = 48;

export class Station extends Container {
  constructor(kind, screen) {
    super();
    const K = KINDS[kind];
    this.kind = kind;
    this.title = K.title;
    this.accent = K.accent;
    this.alt = K.alt;
    this.s = Math.max(0.65, Math.min(1, screen.width / 900));
    this.scale.set(this.s);
    this.zoneR = Math.max(220, Math.min(380, Math.min(screen.width, screen.height) * 0.55));
    this.passed = false;
    this.dockCd = 0;
    this.t = 0;
    this.ringA = 0.45;
    this.fuelBought = null;

    const R = this.zoneR / this.s;

    // Safe zone
    this.zoneGlow = glowSprite(K.accent, R * 2.3, 0.16);
    this.ring = new Container();
    const rg = new Graphics();
    const N = 28;
    for (let i = 0; i < N; i++) {
      const a0 = (i / N) * Math.PI * 2;
      const a1 = a0 + (Math.PI * 2 / N) * 0.6;
      rg.moveTo(Math.cos(a0) * R, Math.sin(a0) * R).arc(0, 0, R, a0, a1);
    }
    rg.stroke({ width: 4, color: K.accent, alpha: 0.9 });
    rg.circle(0, 0, R - 12).stroke({ width: 1.5, color: K.accent, alpha: 0.3 });
    this.ring.addChild(rg);

    const halo = glowSprite(K.accent, 720, 0.2);

    // Station body
    const b = new Graphics();
    b.rect(-250, -10, 500, 20).fill(0x39465f).stroke({ width: 2, color: 0x7f93b8 });
    for (let x = -240; x <= 230; x += 40) b.moveTo(x, -10).lineTo(x + 20, 10);
    b.stroke({ width: 1, color: 0x5b6c8f });
    for (const sx of [-1, 1]) { // solar arrays on top
      for (const x0 of [sx > 0 ? 80 : -250, sx > 0 ? 170 : -160]) {
        b.rect(x0, -84, 80, 62).fill(0x16327d).stroke({ width: 1.5, color: 0x7fb2ff });
        for (let i = 1; i < 4; i++) b.moveTo(x0 + i * 20, -84).lineTo(x0 + i * 20, -22);
        b.moveTo(x0, -53).lineTo(x0 + 80, -53);
        b.stroke({ width: 1, color: 0x4f7fd1, alpha: 0.8 });
      }
    }
    if (kind === 'fuel') { // fuel tanks
      for (const x of [-232, -164, 108, 176]) {
        b.roundRect(x, 14, 56, 100, 16).fill(K.alt).stroke({ width: 2, color: 0xffd9a8 });
        b.rect(x, 52, 56, 12).fill(0x7a3d0a);
        b.rect(x + 22, 70, 12, 30).fill({ color: 0xffffff, alpha: 0.25 });
      }
    } else { // cargo crates + crane
      for (const sx of [-1, 1]) {
        b.rect(sx * 180 - 4, 14, 8, 70).fill(0x8a7fb0);
        b.rect(sx > 0 ? 100 : -260, 80, 160, 8).fill(0x8a7fb0);
        for (let i = 0; i < 3; i++) {
          const x = (sx > 0 ? 112 : -250) + i * 46;
          b.roundRect(x, 92, 40, 34, 4).fill(i % 2 ? K.accent : K.alt).stroke({ width: 2, color: 0xffffff, alpha: 0.6 });
        }
      }
    }
    // hub
    b.circle(0, 0, 76).fill(0x2a3550).stroke({ width: 3, color: 0x8aa2c8 });
    b.circle(0, 0, 60).fill(0x1b2438).stroke({ width: 2, color: K.accent });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      b.circle(Math.cos(a) * 49, Math.sin(a) * 49, 4).fill(K.alt);
    }
    b.circle(0, 0, 28).fill(0x10151f).stroke({ width: 2, color: K.accent });
    b.circle(0, 0, 13).fill({ color: K.accent, alpha: 0.9 });
    // tunnel + gate bay
    b.rect(-28, 70, 56, 74).fill(0x39465f).stroke({ width: 2, color: 0x7f93b8 });
    b.moveTo(-28, 92).lineTo(28, 92).moveTo(-28, 116).lineTo(28, 116).stroke({ width: 1.5, color: 0x5b6c8f });
    b.roundRect(-64, 138, 128, 62, 10).fill(0x0b1220).stroke({ width: 4, color: K.accent });
    b.roundRect(-48, 146, 96, 46, 8).fill(0x02060d);
    for (const [x, y] of [[-58, 144], [58, 144], [-58, 194], [58, 194]]) b.circle(x, y, 3.5).fill(K.alt);

    this.chev = new Graphics();
    this.title_ = makeText(K.title, 24, K.accent);
    this.title_.anchor.set(0.5);
    this.title_.position.set(0, -108);
    this.prompt = makeText('FLY INTO THE GATE TO DOCK', 15, 0xffffff);
    this.prompt.anchor.set(0.5);
    this.prompt.position.set(0, GATE_Y + 70);
    this.prompt.alpha = 0;

    this.beaconL = new Graphics().circle(-252, 0, 5).fill(0xff3b3b);
    this.beaconR = new Graphics().circle(252, 0, 5).fill(0x3bff6a);

    this.addChild(this.zoneGlow, this.ring, halo, b, this.chev, this.title_, this.prompt, this.beaconL, this.beaconR);
  }

  get gateX() { return this.x; }
  get gateY() { return this.y + GATE_Y * this.s; }
  get gateRadius() { return GATE_R * this.s; }

  update(wdt, dt, inZone) {
    this.y += CONFIG.stationVy * wdt;
    this.t += dt;
    if (this.dockCd > 0) this.dockCd -= dt;
    this.ring.rotation += dt * 0.25;

    const target = this.passed ? 0 : (inZone ? 1 : 0.45);
    this.ringA += (target - this.ringA) * Math.min(1, dt * 4);
    this.ring.alpha = this.ringA;
    this.zoneGlow.alpha = 0.16 * this.ringA;
    this.prompt.alpha = inZone ? 0.6 + Math.sin(this.t * 5) * 0.4 : 0;

    this.chev.clear();
    for (let i = 0; i < 3; i++) {
      const a = 0.25 + 0.75 * Math.max(0, Math.sin(this.t * 6 - i * 0.9));
      const y = 150 + i * 12;
      this.chev.moveTo(-16, y).lineTo(0, y + 9).lineTo(16, y).stroke({ width: 3, color: this.accent, alpha: a });
    }
    this.beaconL.alpha = Math.sin(this.t * 4) > 0 ? 1 : 0.15;
    this.beaconR.alpha = Math.sin(this.t * 4 + 2) > 0 ? 1 : 0.15;
  }
}