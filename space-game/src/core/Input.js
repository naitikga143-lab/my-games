export class Input {
  constructor() {
    this.keys = new Set();
    window.addEventListener('keydown', e => this.keys.add(e.code));
    window.addEventListener('keyup', e => this.keys.delete(e.code));
  }
  is(code) { return this.keys.has(code); }
  get x() { return Number(this.is('ArrowRight') || this.is('KeyD')) - Number(this.is('ArrowLeft') || this.is('KeyA')); }
  get y() { return Number(this.is('ArrowDown') || this.is('KeyS')) - Number(this.is('ArrowUp') || this.is('KeyW')); }
}