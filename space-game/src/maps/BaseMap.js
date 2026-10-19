import { Container } from 'pixi.js';

// Every map (Earth, Mars, Jupiter, Moon...) extends this.
export class BaseMap {
  constructor(screen) {
    this.screen = screen;
    this.background = new Container(); // the world far below / behind
    this.foreground = new Container(); // effects drawn above the ship
  }

  // wdt = world time (0 while the map is stopped)
  update(wdt, player) {}

  resize(w, h) {}
}