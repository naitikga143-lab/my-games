import { Application } from 'pixi.js';
import { Input } from './Input.js';
import { Player } from '../entities/Player.js';
import { EarthMap } from '../maps/EarthMap.js';
import { Exhaust } from '../systems/Exhaust.js';

export class Game {
  async start() {
    this.app = new Application();
    await this.app.init({ background: 0x050816, resizeTo: window, antialias: true });
    document.body.appendChild(this.app.canvas);

    const { width, height } = this.app.screen;
    this.input = new Input();
    this.map = new EarthMap(this.app.screen);
    this.exhaust = new Exhaust();
    this.player = new Player();
    this.player.position.set(width / 2, height - 140);

    this.app.stage.addChild(
      this.map.background, this.map.objects, this.exhaust, this.player, this.map.foreground
    );
    this.app.ticker.add(t => this.update(t.deltaMS / 1000));
  }

  update(dt) {
    this.player.update(dt, this.input, this.app.screen);
    this.exhaust.update(dt, this.player);
    this.map.update(dt, this.player);
  }
}