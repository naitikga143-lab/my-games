const BLOCK = new Set(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);
const MISSILE_KEYS = new Set(['KeyM', 'KeyX', 'ShiftLeft', 'ShiftRight']);

export class Input {
  constructor(canvas) {
    this.keys = new Set();
    this.touch = null;
    this._missile = false;
    this.button = null;

    window.addEventListener('keydown', e => {
      if (BLOCK.has(e.code)) e.preventDefault();
      if (!e.repeat && MISSILE_KEYS.has(e.code)) this._missile = true;
      this.keys.add(e.code);
    });
    window.addEventListener('keyup', e => this.keys.delete(e.code));
    window.addEventListener('blur', () => this.keys.clear());

    canvas.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse') return;
      this.touch = { id: e.pointerId, x: e.clientX, y: e.clientY };
    });
    canvas.addEventListener('pointermove', e => {
      if (this.touch && this.touch.id === e.pointerId) {
        this.touch.x = e.clientX;
        this.touch.y = e.clientY;
      }
    });
    const end = e => { if (this.touch && this.touch.id === e.pointerId) this.touch = null; };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);

    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      const b = document.createElement('button');
      b.id = 'btn-missile';
      b.textContent = 'MISSILE';
      b.addEventListener('pointerdown', e => {
        e.preventDefault();
        e.stopPropagation();
        this._missile = true;
      });
      document.body.appendChild(b);
      this.button = b;
    }
  }

  is(code) { return this.keys.has(code); }
  get x() { return Number(this.is('ArrowRight') || this.is('KeyD')) - Number(this.is('ArrowLeft') || this.is('KeyA')); }
  get y() { return Number(this.is('ArrowDown') || this.is('KeyS')) - Number(this.is('ArrowUp') || this.is('KeyW')); }
  get firing() { return this.is('Space') || !!this.touch; }

  consumeMissile() {
    const m = this._missile;
    this._missile = false;
    return m;
  }

  setButtonVisible(v) { if (this.button) this.button.style.display = v ? 'block' : 'none'; }

  clear() {
    this.keys.clear();
    this.touch = null;
    this._missile = false;
  }
}