import { Container, Graphics } from 'pixi.js';
import { FUELS, PARTS, EXHAUSTS } from '../config.js';
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
      this.msg || (station.kind === 'fuel' ? 'One fuel purchase per visit' : 'Buy as much as you can afford'),
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
    const S = this.state;
    const sd = PARTS.seeker, sh = PARTS.shield;
    const status = (cost, blocked) => {
      if (blocked) return { label: blocked, disabled: true };
      if (S.coins < cost) return { label: `NEED ${cost - S.coins} MORE`, disabled: true };
      return { label: 'BUY', disabled: false };
    };
    const A = {
      color: 0xff6b6b, title: sd.name, cost: sd.cost,
      line1: `Pack of ${sd.pack}   -   In stock: ${S.seekers}/${sd.max}`,
      line2: 'Auto-locks and destroys ANY enemy ship in one hit',
      ...status(sd.cost, S.seekers >= sd.max ? 'FULL' : ''),
      onTap: () => this.buySeeker(sd),
    };
    const B = {
      color: 0x7fe8ff, title: sh.name, cost: sh.cost,
      line1: `Absorbs ${sh.charges} asteroid hits`,
      line2: 'No damage from the next 2 meteor crashes',
      ...status(sh.cost, S.shield > 0 ? `ACTIVE - ${S.shield} LEFT` : ''),
      onTap: () => this.buyShield(sh),
    };
    if (L.compact) {
      const cw = w - 32, chA = 100;
      this.content.addChild(this.partCard(A, 16, L.cardsTop, cw, chA, true));
      this.content.addChild(this.partCard(B, 16, L.cardsTop + chA + 10, cw, chA, true));
      const y3 = L.cardsTop + 2 * (chA + 10);
      this.content.addChild(this.exhaustCard(16, y3, cw, Math.max(190, L.exitY - 12 - y3), true));
    } else {
      const cw = Math.min(300, (w - 64) / 3);
      const ch = Math.min(L.availH, 330);
      const x0 = (w - (cw * 3 + 32)) / 2;
      this.content.addChild(this.partCard(A, x0, L.cardsTop, cw, ch, false));
      this.content.addChild(this.partCard(B, x0 + cw + 16, L.cardsTop, cw, ch, false));
      this.content.addChild(this.exhaustCard(x0 + 2 * (cw + 16), L.cardsTop, cw, ch, false));
    }
  }

  partCard(I, x, y, cw, ch, compact) {
    const c = new Container();
    c.position.set(x, y);
    const bg = new Graphics()
      .roundRect(0, 0, cw, ch, 14).fill({ color: 0x0e1729, alpha: 0.94 })
      .stroke({ width: 2, color: I.color, alpha: 0.7 });
    const title = makeText(I.title, compact ? 17 : 20, I.color);
    title.position.set(14, 10);
    const maxW = compact ? cw - 28 - 70 : cw - 28;
    if (title.width > maxW) title.scale.set(maxW / title.width);
    const l1 = makeText(I.line1, compact ? 13 : 15, 0xffffff);
    l1.position.set(14, compact ? 34 : 44);
    const l2 = makeText(I.line2, compact ? 12 : 14, 0xa9b8d4, false);
    l2.style.wordWrap = true;
    l2.style.wordWrapWidth = compact ? cw - 28 - 124 : cw - 28;
    l2.position.set(14, compact ? 54 : 72);

    const price = makeText(String(I.cost), 20, 0xffffff);
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
    const btn = makeButton(I.label, btnW, 40, I.color, I.onTap, I.disabled);
    btn.position.set(btnX, btnY);
    c.addChild(bg, title, l1, l2, icon, price, btn);
    return c;
  }

  exhaustCard(x, y, cw, ch, compact) {
    const S = this.state;
    const c = new Container();
    c.position.set(x, y);
    const bg = new Graphics()
      .roundRect(0, 0, cw, ch, 14).fill({ color: 0x0e1729, alpha: 0.94 })
      .stroke({ width: 2, color: 0xffb347, alpha: 0.7 });
    const title = makeText('EXHAUST FUMES', compact ? 17 : 20, 0xffb347);
    title.position.set(14, 10);
    c.addChild(bg, title);

    const ids = ['default', 'tricolor', 'stars', 'fire'];
    const top = compact ? 38 : 46;
    const rh = clamp((ch - top - 8) / 4, 30, 52);
    const bw = compact ? 96 : 104;
    ids.forEach((id, i) => {
      const d = EXHAUSTS[id];
      const ry = top + i * rh;
      d.preview.forEach((col, j) => {
        c.addChild(new Graphics().circle(22 + j * 12, ry + rh / 2, 5).fill(col));
      });
      const name = makeText(d.name, compact ? 12 : 13, 0xffffff);
      const avail = cw - 14 - bw - 64 - 6;
      if (name.width > avail) name.scale.set(avail / name.width);
      name.anchor.set(0, 0.5);
      name.position.set(64, ry + rh / 2);

      const owned = !!S.exhaustOwned[id];
      let label, disabled = false;
      if (S.exhaust === id) { label = 'EQUIPPED'; disabled = true; }
      else if (owned) label = 'EQUIP';
      else { label = `BUY ${d.cost}`; disabled = S.coins < d.cost; }
      const btn = makeButton(label, bw, rh - 8, 0xffb347, () => this.exhaustAction(d), disabled);
      btn.position.set(cw - 14 - bw, ry + 4);
      c.addChild(name, btn);
    });
    return c;
  }

  buySeeker(def) {
    const S = this.state;
    if (this.phase !== 'idle' || S.coins < def.cost || S.seekers >= def.max) return;
    S.coins -= def.cost;
    S.seekers = Math.min(def.max, S.seekers + def.pack);
    this.msg = `+${def.pack} TARGETING MISSILES LOADED  -  press MISSILE when an enemy is on screen`;
    this.build();
  }

  buyShield(def) {
    const S = this.state;
    if (this.phase !== 'idle' || S.coins < def.cost || S.shield > 0) return;
    S.coins -= def.cost;
    S.shield = def.charges;
    this.msg = `ASTEROID PROTECTOR ONLINE  -  ${def.charges} HITS`;
    this.build();
  }

  exhaustAction(def) {
    const S = this.state;
    if (this.phase !== 'idle') return;
    if (!S.exhaustOwned[def.id]) {
      if (S.coins < def.cost) return;
      S.coins -= def.cost;
      S.exhaustOwned[def.id] = true;
      this.msg = `${def.name} EXHAUST UNLOCKED AND EQUIPPED`;
    } else {
      this.msg = `${def.name} EXHAUST EQUIPPED`;
    }
    S.exhaust = def.id;
    this.build();
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