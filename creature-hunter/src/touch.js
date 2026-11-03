// touch.js — phone ke liye controls
// Left side: floating joystick (jahan ungli rakho wahin bann jaata hai)
// Right side: ungli ghumao = camera ghoomega
// Buttons: JUMP, RUN (toggle), aur apne extra buttons addButton() se

export class TouchControls {
  static isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  constructor({
    parent = document.body,
    lookSensitivity = 0.0055, // camera kitna tez ghoome
    joystickRadius = 56,
    autoSprint = true, // joystick poora kinare tak dabao to apne aap run
    forceShow = false, // desktop par test karne ke liye true karo
  } = {}) {
    // main.js / player.update() ko yahi object do
    this.input = { forward: 0, right: 0, sprint: false, jump: false };

    this.enabled = forceShow || TouchControls.isTouchDevice();
    this.lookSensitivity = lookSensitivity;
    this.radius = joystickRadius;
    this.autoSprint = autoSprint;

    this._look = { x: 0, y: 0 };
    this._joyId = null;
    this._lookId = null;
    this._jumpId = null;
    this._sprintLatched = false;
    this._origin = { x: 0, y: 0 };
    this._last = { x: 0, y: 0 };
    this._buttons = [];

    if (!this.enabled) return;
    this._injectStyle();
    this._build(parent);
  }

  /* camera ke liye: har frame ek baar bulao.
     return: { x, y } = pixel delta * sensitivity (radians) */
  consumeLook() {
    const out = { x: this._look.x, y: this._look.y };
    this._look.x = 0;
    this._look.y = 0;
    return out;
  }

  setVisible(v) {
    if (this.root) this.root.style.display = v ? '' : 'none';
    if (!v) this._reset();
  }

  /* extra button (attack, shoot, interact...)
     touch.addButton({ label: 'HIT', onPress: () => ..., onRelease: () => ..., slot: 0 })
     slot 0,1,2 = JUMP ke upar-baayein ki taraf */
  addButton({ label = '', onPress, onRelease, slot = 0 } = {}) {
    if (!this.enabled) return null;
    const el = document.createElement('div');
    el.className = 'tc-btn tc-small';
    el.textContent = label;
    const spots = [
      { right: '24px', bottom: '132px' },   // slot 0 (FIRE)
      { right: '118px', bottom: '104px' },  // slot 1 (AIM)
      { right: '24px', bottom: '206px' },   // slot 2 (CAM)
      { right: '118px', bottom: '178px' },  // slot 3 (extra)
      { right: '118px', bottom: '178px' },  // slot 3 (extra)
      { right: '24px', bottom: '34px', big: true }, // slot 4 = bada FIRE button
    ];
    const sp = slot === 'main'
      ? { right: '24px', bottom: '34px', big: true }   // bada FIRE button (neeche-right)
      : spots[slot % spots.length];
    el.className = 'tc-btn ' + (sp.big ? 'tc-big' : 'tc-small');
    el.className = 'tc-btn ' + (sp.big ? 'tc-big' : 'tc-small');
    el.style.right = sp.right;
    el.style.bottom = `calc(${sp.bottom} + env(safe-area-inset-bottom, 0px))`;
    this._bindButton(el, onPress, onRelease);
    this.root.appendChild(el);
    return el;
  }

  dispose() {
    this._reset();
    this.root?.remove();
    this.style?.remove();
  }

  /* ---------------- internals ---------------- */
  _reset() {
    this.input.forward = 0;
    this.input.right = 0;
    this.input.jump = false;
    this.input.sprint = false;
    this._joyId = this._lookId = this._jumpId = null;
    this._sprintLatched = false;
    this.sprintBtn?.classList.remove('on');
    if (this.joyBase) this.joyBase.style.display = 'none';
  }

  _injectStyle() {
    const style = document.createElement('style');
    style.textContent = `
      .tc-root { position: fixed; inset: 0; z-index: 50; pointer-events: none;
        user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; touch-action: none; }
      .tc-zone { position: absolute; top: 0; bottom: 0; pointer-events: auto; touch-action: none; }
      .tc-left { left: 0; width: 45%; }
      .tc-right { right: 0; width: 55%; }
      .tc-joy { position: absolute; width: 112px; height: 112px; margin: -56px 0 0 -56px;
        border-radius: 50%; border: 2px solid rgba(255,255,255,.35);
        background: rgba(255,255,255,.08); display: none; pointer-events: none; }
      .tc-knob { position: absolute; left: 50%; top: 50%; width: 52px; height: 52px; margin: -26px 0 0 -26px;
        border-radius: 50%; background: rgba(255,255,255,.55); box-shadow: 0 2px 8px rgba(0,0,0,.4); }
      .tc-hint { position: absolute; left: 24px; bottom: calc(40px + env(safe-area-inset-bottom, 0px));
        width: 112px; height: 112px; border-radius: 50%; border: 2px dashed rgba(255,255,255,.18);
        pointer-events: none; }
      .tc-btn { position: absolute; pointer-events: auto; touch-action: none; display: flex;
        align-items: center; justify-content: center; border-radius: 50%; color: #fff;
        font: 700 13px/1 system-ui, sans-serif; letter-spacing: .5px;
        background: rgba(255,255,255,.16); border: 2px solid rgba(255,255,255,.4);
        backdrop-filter: blur(4px); -webkit-tap-highlight-color: transparent; transition: transform .06s, background .06s; }
      .tc-btn.on, .tc-btn:active { background: rgba(255,255,255,.4); transform: scale(.92); }
      .tc-jump { width: 58px; height: 58px; right: 24px;
        bottom: calc(132px + env(safe-area-inset-bottom, 0px)); }
      .tc-big { width: 84px; height: 84px; font-size: 14px; }
      .tc-run { width: 62px; height: 62px; right: 120px;
        bottom: calc(26px + env(safe-area-inset-bottom, 0px)); }
      .tc-small { width: 58px; height: 58px; }
      .tc-btn.lock { background: rgba(255,200,80,.45); border-color: rgba(255,220,120,.9); }
    `;
    document.head.appendChild(style);
    this.style = style;
  }

  _build(parent) {
    const root = document.createElement('div');
    root.className = 'tc-root';
    root.addEventListener('contextmenu', (e) => e.preventDefault());

    // zones
    const left = document.createElement('div');
    left.className = 'tc-zone tc-left';
    const right = document.createElement('div');
    right.className = 'tc-zone tc-right';

    const hint = document.createElement('div');
    hint.className = 'tc-hint';

    const joyBase = document.createElement('div');
    joyBase.className = 'tc-joy';
    const knob = document.createElement('div');
    knob.className = 'tc-knob';
    joyBase.appendChild(knob);

    this.joyBase = joyBase;
    this.knob = knob;

    // buttons
    const jump = document.createElement('div');
    jump.className = 'tc-btn tc-jump';
    jump.textContent = 'JUMP';
    this._bindButton(
      jump,
      () => { this.input.jump = true; navigator.vibrate?.(8); },
      () => { this.input.jump = false; },
    );

    const run = document.createElement('div');
    run.className = 'tc-btn tc-run';
    run.textContent = 'RUN';
    this.sprintBtn = run;
    run.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._sprintLatched = !this._sprintLatched;
      run.classList.toggle('on', this._sprintLatched);
      this._applySprint();
    });

    root.append(left, right, hint, joyBase, jump, run);
    parent.appendChild(root);
    this.root = root;

    this._bindJoystick(left);
    this._bindLook(right);
  }

  _bindButton(el, onPress, onRelease) {
    const down = (e) => {
      e.preventDefault();
      e.stopPropagation();
      el.setPointerCapture?.(e.pointerId);
      el.classList.add('on');
      onPress?.();
    };
    const up = (e) => {
      e.preventDefault();
      el.classList.remove('on');
      onRelease?.();
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('lostpointercapture', up);
  }

  _applySprint(mag = 0) {
    this.input.sprint = this._sprintLatched || (this.autoSprint && mag > 0.96);
  }

  _bindJoystick(zone) {
    zone.addEventListener('pointerdown', (e) => {
      if (this._joyId !== null) return;
      e.preventDefault();
      zone.setPointerCapture(e.pointerId);
      this._joyId = e.pointerId;
      this._origin.x = e.clientX;
      this._origin.y = e.clientY;
      this.joyBase.style.display = 'block';
      this.joyBase.style.left = `${e.clientX}px`;
      this.joyBase.style.top = `${e.clientY}px`;
      this.knob.style.transform = 'translate(0px, 0px)';
    });

    zone.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this._joyId) return;
      e.preventDefault();
      let dx = e.clientX - this._origin.x;
      let dy = e.clientY - this._origin.y;
      const d = Math.hypot(dx, dy);
      if (d > this.radius) {
        dx = (dx / d) * this.radius;
        dy = (dy / d) * this.radius;
      }
      this.knob.style.transform = `translate(${dx}px, ${dy}px)`;

      let nx = dx / this.radius;
      let ny = dy / this.radius;
      const mag = Math.min(1, Math.hypot(nx, ny));
      const dead = 0.12;
      if (mag < dead) {
        nx = ny = 0;
      } else {
        const k = (mag - dead) / (1 - dead) / mag; // dead zone ke baad smooth scale
        nx *= k;
        ny *= k;
      }
      this.input.right = nx;
      this.input.forward = -ny; // upar = aage
      this._applySprint(mag);
    });

    const end = (e) => {
      if (e.pointerId !== this._joyId) return;
      this._joyId = null;
      this.input.forward = 0;
      this.input.right = 0;
      this._applySprint(0);
      this.joyBase.style.display = 'none';
    };
    zone.addEventListener('pointerup', end);
    zone.addEventListener('pointercancel', end);
  }

  _bindLook(zone) {
    zone.addEventListener('pointerdown', (e) => {
      if (this._lookId !== null) return;
      e.preventDefault();
      zone.setPointerCapture(e.pointerId);
      this._lookId = e.pointerId;
      this._last.x = e.clientX;
      this._last.y = e.clientY;
    });

    zone.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this._lookId) return;
      e.preventDefault();
      this._look.x += (e.clientX - this._last.x) * this.lookSensitivity;
      this._look.y += (e.clientY - this._last.y) * this.lookSensitivity;
      this._last.x = e.clientX;
      this._last.y = e.clientY;
    });

    const end = (e) => {
      if (e.pointerId === this._lookId) this._lookId = null;
    };
    zone.addEventListener('pointerup', end);
    zone.addEventListener('pointercancel', end);
  }
}