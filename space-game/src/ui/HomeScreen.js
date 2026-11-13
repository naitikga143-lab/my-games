import { Container, Graphics } from 'pixi.js';
import { makeText, makeButton } from './widgets.js';

const AD_TOP = 120;     // space kept free at the top for the social bar
const AD_BOTTOM = 80;   // space kept free at the bottom for the banner
const DESIGN_H = 400;   // height of the content block (it is scaled down on small screens)

// The Home page: shown at the start and after every game over.
export class HomeScreen extends Container {
  constructor() {
    super();
    this.visible = false;
  }

  // info = { gameOver, distance, coins, best }
  show(w, h, info, onPlay) {
    for (const c of this.removeChildren()) c.destroy({ children: true });

    const dim = new Graphics().rect(0, 0, w, h).fill({ color: 0x020612, alpha: 0.62 });
    dim.eventMode = 'static'; // block taps from reaching the game

    const box = new Container(); // content, centred between the two ad strips
    const title = makeText(info.gameOver ? 'GAME OVER' : 'SPACE GAME', 54, info.gameOver ? 0xff5a5a : 0x7fe8ff);
    title.anchor.set(0.5, 0);
    const sub = makeText(
      info.gameOver ? 'You crashed. Try again!' : 'Fly high above Earth. Collect coins. Survive!',
      16, 0xa9b8d4, false,
    );
    sub.anchor.set(0.5, 0);
    sub.position.set(0, 68);
    box.addChild(title, sub);

    const rows = [];
    if (info.gameOver) rows.push(['DISTANCE', `${Math.floor(info.distance)} m`], ['COINS', String(info.coins)]);
    if (info.gameOver || info.best > 0) rows.push(['BEST', `${Math.floor(info.best)} m`]);
    if (rows.length) {
      const panel = new Graphics()
        .roundRect(-170, 108, 340, 28 + rows.length * 36, 14).fill({ color: 0x0e1729, alpha: 0.85 })
        .stroke({ width: 2, color: 0x4a5c82, alpha: 0.8 });
      box.addChild(panel);
      rows.forEach(([k, v], i) => {
        const y = 124 + i * 36;
        const label = makeText(k, 16, 0x8aa2c8);
        label.position.set(-150, y);
        const value = makeText(v, 20, k === 'BEST' ? 0xffd166 : 0xffffff);
        value.anchor.set(1, 0);
        value.position.set(150, y - 2);
        box.addChild(label, value);
      });
    }

    const btn = makeButton(info.gameOver ? 'RESTART' : 'PLAY', 260, 64, 0x7dffb0, onPlay);
    btn.position.set(-130, 266);
    const h1 = makeText('or press ENTER', 14, 0x8aa2c8, false);
    h1.anchor.set(0.5, 0);
    h1.position.set(0, 342);
    const h2 = makeText('WASD / Arrows: move   SPACE: fire   M: missile', 13, 0x6f819f, false);
    h2.anchor.set(0.5, 0);
    h2.position.set(0, 366);
    box.addChild(btn, h1, h2);

    // fit between the ads
    const availH = h - AD_TOP - AD_BOTTOM;
    const s = Math.max(0.5, Math.min(1, availH / DESIGN_H, (w - 24) / 400));
    box.scale.set(s);
    box.position.set(w / 2, AD_TOP + Math.max(0, (availH - DESIGN_H * s) / 2));

    this.addChild(dim, box);
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}