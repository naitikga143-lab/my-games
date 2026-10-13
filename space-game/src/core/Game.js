import { Application } from 'pixi.js';
import { Input } from './Input.js';
import { Player } from '../entities/Player.js';
import { Starfield } from '../systems/Starfield.js';

export class Game {
  async start() {
    this.app = new Application();
    await this.app.init({ background: 0x050816, resizeTo: window, antialias: true });
    document.body.appendChild(this.app.canvas);

    const { width, height } = this.app.screen;
    this.input = new Input();
    this.stars = new Starfield(width, height);
    this.player = new Player();
    this.player.position.set(width / 2, height - 100);

    this.app.stage.addChild(this.stars, this.player);
    this.app.ticker.add(t => this.update(t.deltaMS / 1000));
  }

  update(dt) {
    this.stars.update(dt);
    this.player.update(dt, this.input, this.app.screen);
  }
}