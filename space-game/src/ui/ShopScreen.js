import { Container, Graphics } from 'pixi.js';
import { FUELS } from '../config.js';
import { lerpColor } from '../utils/color.js';
import { glowSprite } from '../utils/textures.js';
import { makeText, makeButton, coinIcon } from './widgets.js';

const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export class ShopScreen extends Container {
  constructor(screen) {
    super();
    this.screen = screen;
    this.visible = false;
    this.phase = 'none'; // enter -> idle -> leaving -> none
    this.t = 0;
    this.msg = '';
  }

  open(station, state, onExit) {
    for (const c of this.removeChildren()) c.destroy({ children: true });
    this.station = station;
    this.state = state;
    this.onExit = onExit;
    this.w = this.screen.width;
    this.h = this.screen.height;
    this.msg = '';
    this.visible = true;
    this.phase = 'enter';
    this.t = 0;

    this.interior = new Container();
    this.addChild(this.interior);
    this.drawInterior();
    this.content = new Container();
    this.interior.addChild(this.content);
    this.build();
    this.drawDoors('ENTRY GATE');
    this.interior.alpha = 0;
  }

  layout() {
    const { w, h } = this;
    const compact = w < 720;
    const winY = 66;
    const winH = compact ? clamp(h * 0.12, 60, 120) : Math.min(170, h * 0.2);
    const cardsTop = winY + winH + 28;
    const exitH = 54;
    const exitY = h - exitH - 16;
    return { compact, winY, winH, cardsTop, exitH, exitY, availH: exitY - 12 - cardsTop };
  }

  // ---------- visuals ----------
  drawInterior() {
    const { w, h } = this;
    const L = this.layout();
    const accent = this.station.accent;
    const g = new Graphics();

    const bands = 28;
    for (let i = 0; i < bands; i++) {
      g.rect(0, (i * h) / bands, w, h / bands + 1).fill(lerpColor(0x0a1020, 0x1a2540, i / (bands - 1)));
    }
    for (let x = 0; x < w; x += 120) g.moveTo(x, 0).lineTo(x, h * 0.78);
    g.stroke({ width: 2, color: 0x070b16, alpha: 0.8 });

    // floor with perspective lines
    g.rect(0, h * 0.78, w, h * 0.22).fill(0x0c1322);
    for (let i = -6; i <= 6; i++) g.moveTo(w / 2 + i * w * 0.04, h * 0.78).lineTo(w / 2 + i * w * 0.16, h);
    g.stroke({ width: 2, color: accent, alpha: 0.22 });
    for (let i = 1; i < 5; i++) {
      const y = h * 0.78 + h * 0.22 * Math.pow(i / 5, 1.6);
      g.moveTo(0, y).lineTo(w, y);
    }
    g.stroke({ width: 1.5, color: accent, alpha: 0.18 });

    // big window to space
    const ww = Math.min(w - 32, 760), wh = L.winH, wx = (w - ww) / 2, wy = L.winY;
    g.roundRect(wx - 8, wy - 8, ww + 16, wh + 16, 14).fill(0x1d2740).stroke({ width: 3, color: 0x4a5c82 });
    g.rect(wx, wy, ww, wh).fill(0x02040c);
    for (let i = 0; i < 70; i++) {
      g.circle(wx + Math.random() * ww, wy + Math.random() * wh, Math.random() * 1.3 + 0.4)
        .fill({ color: 0xffffff, alpha: 0.4 + Math.random() * 0.6 });
    }
    // Earth limb at the bottom of the window
    const R = ww * 0.9, cx = wx + ww / 2, cy = wy + wh + R * 0.62;
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const x = wx + (i / 40) * ww;
      const y = clamp(cy - Math.sqrt(Math.max(0, R * R - (x - cx) * (x - cx))), wy, wy + wh);
      pts.push(x, y);
    }
    g.poly([...pts, wx + ww, wy + wh, wx, wy + wh]).fill(0x1b5fb0);
    g.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]);
    g.stroke({ width: 3, color: 0x8fd0ff, alpha: 0.8 });
    g.rect(wx, wy, ww, wh).stroke({ width: 2, color: 0x4a5c82 });

    // ceiling light strip
    g.rect(0, 0, w, 8).fill(0x0a0f1c);
    this.neon = new Graphics().rect(0, 2, w, 4).fill(accent);
    const halo = glowSprite(accent, Math.min(w, 900), 0.18);
    halo.position.set(w / 2, 0);
    this.interior.addChild(g, halo, this.neon);
  }

  drawDoors(label) {
    const { w, h } = this;
    const accent = this.station.accent;
    this.doors = new Container();
    const mk = (x, innerOnRight) => {
      const c = new Container();
      c.position.x = x;
      const g = new Graphics().rect(0, 0, w / 2, h).fill(0x1a2236);
      for (let y = 0; y < h; y += 70) g.moveTo(0, y).lineTo(w / 2, y);
      g.stroke({ width: 3, color: 0x0b1020 });
      const edge = innerOnRight ? w / 2 - 26 : 0;
      g.rect(edge, 0, 26, h).fill(0x151a26);
      for (let y = -40; y < h; y += 52) g.poly([edge, y, edge + 26, y + 26, edge + 26, y + 52, edge, y + 26]).fill(0xf2c230);
      g.rect(innerOnRight ? w / 2 - 3 : 0, 0, 3, h).fill(accent);
      c.addChild(g);
      return c;
    };
    this.left = mk(0, true);
    this.right = mk(w / 2, false);
    this.doorLabel = makeText(label, Math.min(36, w * 0.08), 0xffffff);
    this.doorLabel.anchor.set(0.5);
    this.doorLabel.position.set(w / 2, h / 2);
    const plate = new Graphics().roundRect(w / 2 - 150, h / 2 - 30, 300, 60, 10).fill({ color: 0x05080f, alpha: 0.9 }).stroke({ width: 2, color: accent });
    this.plate = plate;
    this.doors.addChild(this.left, this.right, plate, this.doorLabel);
    this.addChild(this.doors);
    this.applyDoors(0);
  }

  applyDoors(open) {
    this.left.x = (-this.w / 2) * open;
    this.right.x = this.w / 2 + (this.w / 2) * open;
    const a = Math.max(0, 1 - open * 3);
    this.doorLabel.alpha = a;
    this.plate.alpha = a;
    this.doors.visible = open < 0.995;
    this.interior.alpha = Math.min(1, open * 1.6);
  }

  // ---------- UI ----------
  build() {
    for (const c of this.content.removeChildren()) c.destroy({ children: true });
    const { w, h, state, station } = this;
    const L = this.layout();
    const accent = station.accent;

    const title = makeText(station.title, L.compact ? 26 : 34, accent);
    title.anchor.set(0.5, 0);
    title.position.set(w / 2, 16);

    const pill = new Graphics().roundRect(0, 0, 96, 32, 16).fill({ color: 0x000000, alpha: 0.55 }).stroke({ width: 1.5, color: 0xffc83d, alpha: 0.8 });
    pill.position.set(w - 112, 16);
    const ic = coinIcon(9);
    ic.position.set(w - 112 + 18, 32);
    const coins = makeText(String(state.coins), 18, 0xffffff);
    coins.position.set(w - 112 + 34, 21);

    const hint = makeText(
      this.msg || (station.kind === 'fuel' ? 'One fuel purchase per visit' : 'Ship parts arriving soon'),
      13, this.msg ? 0x7dffb0 : 0x8aa2c8, false,
    );
    hint.anchor.set(0.5, 0);
    hint.position.set(w / 2, L.winY + L.winH + 8);

    this.content.addChild(title, pill, ic, coins, hint);
    if (station.kind === 'fuel') this.buildFuel(L); else this.buildParts(L);

    const exit = makeButton('EXIT GATE  >>', Math.min(280, w - 40), L.exitH, 0x7dffb0, () => this.leave());
    exit.position.set((w - Math.min(280, w - 40)) / 2, L.exitY);
    this.content.addChild(exit);
  }

  buildFuel(L) {
    const { w } = this;
    const defs = [FUELS.normal, FUELS.power, FUELS.intense];
    if (L.compact) {
      const cw = w - 32;
      const ch = clamp((L.availH - 20) / 3, 92, 150);
      defs.forEach((d, i) => this.content.addChild(this.fuelCard(d, 16, L.cardsTop + i * (ch + 10), cw, ch, true)));
    } else {
      const cw = Math.min(300, (w - 64) / 3);
      const ch = Math.min(L.availH, 320);
      const x0 = (w - (cw * 3 + 32)) / 2;
      defs.forEach((d, i) => this.content.addChild(this.fuelCard(d, x0 + i * (cw + 16), L.cardsTop, cw, ch, false)));
    }
  }

  fuelCard(def, x, y, cw, ch, compact) {
    const c = new Container();
    c.position.set(x, y);
    const bought = this.station.fuelBought;
    const owned = bought === def.id;
    const afford = this.state.coins >= def.cost;

    const bg = new Graphics()
      .roundRect(0, 0, cw, ch, 14).fill({ color: 0x0e1729, alpha: 0.94 })
      .stroke({ width: owned ? 3 : 2, color: def.color, alpha: owned ? 1 : 0.7 });
    const title = makeText(def.name, compact ? 17 : 22, def.color);
    title.position.set(14, 10);
    const stats = makeText(`Speed x${def.speed}   -   ${def.duration}s`, compact ? 14 : 16, 0xffffff);
    stats.position.set(14, compact ? 36 : 44);
    const perk = makeText(def.perk, compact ? 12 : 14, 0xa9b8d4, false);
    perk.style.wordWrap = true;
    perk.style.wordWrapWidth = compact ? cw - 28 - 124 : cw - 28;
    perk.position.set(14, compact ? 58 : 76);

    const price = makeText(String(def.cost), 20, 0xffffff);
    const icon = coinIcon(9);
    let btnX, btnY, btnW;
    if (compact) {
      price.anchor.set(1, 0);
      price.position.set(cw - 14, 10);
      icon.position.set(cw - 14 - price.width - 14, 22);
      btnW = 110; btnX = cw - 14 - btnW; btnY = ch - 50;
    } else {
      price.position.set(36, ch - 92);
      icon.position.set(22, ch - 80);
      btnW = cw - 28; btnX = 14; btnY = ch - 54;
    }

    let label = 'BUY';
    let disabled = false;
    if (owned) { label = 'PURCHASED'; disabled = true; }
    else if (bought) { label = 'ONE PER VISIT'; disabled = true; }
    else if (!afford) { label = `NEED ${def.cost - this.state.coins} MORE`; disabled = true; }
    const btn = makeButton(label, btnW, 40, def.color, () => this.buy(def), disabled);
    btn.position.set(btnX, btnY);

    c.addChild(bg, title, stats, perk, icon, price, btn);
    return c;
  }

  buildParts(L) {
    const { w } = this;
    const cols = L.compact ? 2 : 3;
    const rows = L.compact ? 3 : 2;
    const gap = 12;
    const cw = Math.min(260, (w - 32 - gap * (cols - 1)) / cols);
    const ch = clamp((L.availH - gap * (rows - 1)) / rows, 70, 150);
    const x0 = (w - (cw * cols + gap * (cols - 1))) / 2;
    for (let i = 0; i < cols * rows; i++) {
      const c = new Container();
      c.position.set(x0 + (i % cols) * (cw + gap), L.cardsTop + Math.floor(i / cols) * (ch + gap));
      const bg = new Graphics().roundRect(0, 0, cw, ch, 14).fill({ color: 0x0e1729, alpha: 0.9 }).stroke({ width: 2, color: 0x6a5a9a, alpha: 0.6 });
      const lock = new Graphics()
        .roundRect(-12, -2, 24, 18, 4).fill(0x8a7fb0)
        .arc(0, -2, 8, Math.PI, 0).stroke({ width: 3, color: 0x8a7fb0 });
      lock.position.set(cw / 2, ch / 2 - 12);
      const t1 = makeText(`PART SLOT ${i + 1}`, 14, 0xc9bdf0);
      t1.anchor.set(0.5);
      t1.position.set(cw / 2, ch / 2 + 16);
      const t2 = makeText('COMING SOON', 11, 0x8a95aa, false);
      t2.anchor.set(0.5);
      t2.position.set(cw / 2, ch / 2 + 34);
      c.addChild(bg, lock, t1, t2);
      this.content.addChild(c);
    }
  }

  buy(def) {
    if (this.phase !== 'idle' || this.station.fuelBought || this.state.coins < def.cost) return;
    this.state.coins -= def.cost;
    this.state.addFuel(def.id);
    this.station.fuelBought = def.id;
    this.msg = `${def.name} LOADED  -  SPEED x${def.speed} FOR ${def.duration}s`;
    this.build();
  }

  leave() {
    if (this.phase !== 'idle') return;
    this.phase = 'leaving';
    this.t = 0;
    this.doorLabel.text = 'EXIT GATE';
    this.doors.visible = true;
  }

  update(dt) {
    if (this.neon) this.neon.alpha = 0.75 + Math.sin(performance.now() / 400) * 0.2;
    if (this.phase !== 'enter' && this.phase !== 'leaving') return;
    this.t += dt / (this.phase === 'enter' ? 1.1 : 0.8);
    const k = Math.min(1, this.t);
    this.applyDoors(this.phase === 'enter' ? ease(k) : 1 - ease(k));
    if (k >= 1) {
      if (this.phase === 'enter') {
        this.phase = 'idle';
      } else {
        this.phase = 'none';
        this.visible = false;
        this.onExit();
      }
    }
  }
}