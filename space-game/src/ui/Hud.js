import { Container, Graphics } from 'pixi.js';
import { makeText, coinIcon } from './widgets.js';

const BAR_W = 170;

export class Hud extends Container {
  constructor() {
    super();
    this.w = 800;
    this.coinIc = coinIcon(11);
    this.coinText = makeText('0', 24);
    this.distText = makeText('0 m', 28);
    this.distText.anchor.set(0.5, 0);
    this.nextText = makeText('', 14, 0x9fd8ff);
    this.nextText.anchor.set(0.5, 0);
    this.fuelLabel = makeText('NO FUEL', 13);
    this.fuelLabel.anchor.set(1, 0);
    this.missLabel = makeText('MISSILE', 11, 0xffb08a);
    this.missLabel.anchor.set(1, 0);
    this.bars = new Graphics();
    this.addChild(this.bars, this.coinIc, this.coinText, this.distText, this.nextText, this.fuelLabel, this.missLabel);
    this.layout(800, 600);
  }

  layout(w) {
    this.w = w;
    const m = 16;
    this.coinIc.position.set(m + 11, m + 15);
    this.coinText.position.set(m + 30, m);
    this.distText.position.set(w / 2, m - 2);
    this.nextText.position.set(w / 2, m + 34);
    this.fuelLabel.position.set(w - m, m);
    this.missLabel.position.set(w - m, m + 40);
  }

  update(state, info) {
    this.coinText.text = String(state.coins);
    this.distText.text = Math.floor(state.distance) + ' m';
    this.nextText.text = info.stationText;

    const fuel = state.fuel;
    this.fuelLabel.text = fuel ? `${fuel.name}  ${Math.ceil(state.fuelLeft)}s` : 'NO FUEL  (base speed)';

    const x = this.w - 16 - BAR_W;
    const g = this.bars;
    g.clear();
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