import { Container, Graphics } from 'pixi.js';
import { makeText, coinIcon } from './widgets.js';

const BAR_W = 170;
const HP_W = 160;
const BOOST_LINES = [
  ['magnet', 'COIN MAGNET', 0xff8a8a],
  ['ghost', 'INVISIBLE', 0x9fe8ff],
  ['rainbow', 'COLORFUL COINS x2', 0xff9de6],
];

export class Hud extends Container {
  constructor() {
    super();
    this.w = 800;
    this.h = 600;
    this.hurtA = 0;
    this.toastT = 0;
    this.flash = new Graphics(); // soft red flash when the ship is hit
    this.flash.alpha = 0;
    this.coinIc = coinIcon(11);
    this.coinText = makeText('0', 24);
    this.distText = makeText('0 m', 28);
    this.distText.anchor.set(0.5, 0);
    this.nextText = makeText('', 14, 0x9fd8ff);
    this.nextText.anchor.set(0.5, 0);
    this.toastText = makeText('', 20);
    this.toastText.anchor.set(0.5, 0);
    this.toastText.alpha = 0;
    this.fuelLabel = makeText('NO FUEL', 13);
    this.fuelLabel.anchor.set(1, 0);
    this.missLabel = makeText('MISSILE', 11, 0xffb08a);
    this.missLabel.anchor.set(1, 0);
    this.hpText = makeText('HP', 13);
    this.seekText = makeText('', 13, 0xff8a8a);
    this.shieldText = makeText('', 13, 0x7fe8ff);
    this.boostTexts = BOOST_LINES.map(([, , col]) => makeText('', 13, col));
    this.bars = new Graphics();
    this.addChild(
      this.flash, this.seekText, this.shieldText, ...this.boostTexts, this.bars, this.coinIc, this.coinText,
      this.distText, this.nextText, this.toastText, this.fuelLabel, this.missLabel, this.hpText,
    );
    this.layout(800, 600);
  }

  layout(w, h = this.h) {
    this.w = w;
    this.h = h;
    const m = 16;
    this.flash.clear().rect(0, 0, w, h).fill(0xff2020);
    this.coinIc.position.set(m + 11, m + 15);
    this.coinText.position.set(m + 30, m);
    this.distText.position.set(w / 2, m - 2);
    this.nextText.position.set(w / 2, m + 34);
    this.toastText.position.set(w / 2, m + 62);
    this.fuelLabel.position.set(w - m, m);
    this.missLabel.position.set(w - m, m + 40);
    this.hpText.position.set(m + HP_W + 8, 31);
    this.seekText.position.set(m, m + 52);
    this.shieldText.position.set(m, m + 70);
    this.boostTexts.forEach((t, i) => t.position.set(m, m + 88 + i * 18));
  }

  hurt() { this.hurtA = 1; }

  toast(text, color = 0xffffff) {
    this.toastText.text = text;
    this.toastText.style.fill = color;
    this.toastT = 2.4;
  }

  update(state, info) {
    this.hurtA = Math.max(0, this.hurtA - 0.05);
    this.flash.alpha = this.hurtA * 0.16;
    this.toastT = Math.max(0, this.toastT - (info.dt || 0.016));
    this.toastText.alpha = Math.min(1, this.toastT * 1.5);

    this.coinText.text = String(state.coins);
    this.distText.text = Math.floor(state.distance) + ' m';
    this.nextText.text = info.stationText;
    this.hpText.text = `HP ${Math.ceil(state.hp)}/${state.maxHp}`;
    this.seekText.text = state.seekers > 0 ? `TARGETING MISSILES  x${state.seekers}` : '';
    this.shieldText.text = state.shield > 0 ? `ASTEROID PROTECTOR  ${state.shield} LEFT` : '';
    BOOST_LINES.forEach(([id, label], i) => {
      const t = state.boost[id];
      this.boostTexts[i].text = t > 0 ? `${label}  ${Math.ceil(t)}s` : '';
    });

    const fuel = state.fuel;
    this.fuelLabel.text = fuel ? `${fuel.name}  ${Math.ceil(state.fuelLeft)}s` : 'NO FUEL  (base speed)';

    const g = this.bars;
    g.clear();

    // HP bar (top-left)
    const hf = Math.max(0, Math.min(1, state.hp / state.maxHp));
    g.roundRect(16, 32, HP_W, 14, 7).fill({ color: 0x000000, alpha: 0.5 });
    if (hf * HP_W > 3) g.roundRect(16, 32, HP_W * hf, 14, 7).fill(hf > 0.5 ? 0x4cff7a : hf > 0.25 ? 0xffc83d : 0xff4d4d);

    // fuel + missile bars (top-right)
    const x = this.w - 16 - BAR_W;
    g.roundRect(x, 38, BAR_W, 12, 6).fill({ color: 0x000000, alpha: 0.5 });
    if (fuel) {
      const f = Math.max(0, Math.min(1, state.fuelLeft / fuel.duration));
      if (f * BAR_W > 3) g.roundRect(x, 38, BAR_W * f, 12, 6).fill(fuel.color);
    }
    g.roundRect(x, 56, BAR_W, 6, 3).fill({ color: 0x000000, alpha: 0.5 });
    const mf = Math.max(0, Math.min(1, info.missileFrac));
    if (mf * BAR_W > 3) g.roundRect(x, 56, BAR_W * mf, 6, 3).fill(mf >= 1 ? 0xff9a5a : 0x9a6a50);
  }
}