import { Container, Graphics } from 'pixi.js';
import { makeText, makeButton } from './widgets.js';

export class GameOverScreen extends Container {
  constructor() {
    super();
    this.visible = false;
  }

  show(w, h, state, onRestart) {
    for (const c of this.removeChildren()) c.destroy({ children: true });
    const dim = new Graphics().rect(0, 0, w, h).fill({ color: 0x000510, alpha: 0.72 });
    dim.eventMode = 'static'; // block taps from reaching the game
    const title = makeText('GAME OVER', Math.min(56, w * 0.12), 0xff5a5a);
    title.anchor.set(0.5);
    title.position.set(w / 2, h * 0.3);
    const stats = makeText(`Distance  ${Math.floor(state.distance)} m      Coins  ${state.coins}`, 22);
    stats.anchor.set(0.5);
    stats.position.set(w / 2, h * 0.3 + 70);
    const btn = makeButton('RESTART', 220, 56, 0x7dffb0, onRestart);
    btn.position.set(w / 2 - 110, h * 0.3 + 120);
    const hint = makeText('or press ENTER', 14, 0x8aa2c8, false);
    hint.anchor.set(0.5);
    hint.position.set(w / 2, h * 0.3 + 196);
    this.addChild(dim, title, stats, btn, hint);
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}