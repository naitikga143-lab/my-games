import { Container } from 'pixi.js';

export class BaseMap {
  constructor(screen) {
    this.screen = screen;
    this.background = new Container(); // neeche ki duniya
    this.objects = new Container();    // satellites, asteroids
    this.foreground = new Container(); // ship ke upar ke effects
  }

  update(dt, player) {}

  updateObjects(dt) {
    const { width, height } = this.screen;
    for (const o of [...this.objects.children]) {
      o.update(dt);
      if (o.y > height + 250 || o.x < -300 || o.x > width + 300) {
        o.destroy({ children: true });
      }
    }
  }
}