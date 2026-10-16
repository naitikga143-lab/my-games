import { input, toggle } from './input.js';

const R = 55;       // joystick radius (px)
const LOOK = 0.005; // look sensitivity

function zone(el, onStart, onMove, onEnd) {
  let id = null;
  el.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (id !== null) return;
    const t = e.changedTouches[0];
    id = t.identifier;
    onStart(t);
  }, { passive: false });
  el.addEventListener('touchmove', (e) => {
    e.preventDefault();
    for (const t of e.changedTouches) if (t.identifier === id) onMove(t);
  }, { passive: false });
  const end = (e) => {
    for (const t of e.changedTouches) if (t.identifier === id) { id = null; onEnd(); }
  };
  el.addEventListener('touchend', end);
  el.addEventListener('touchcancel', end);
}

export function setupTouch() {
  if (!matchMedia('(pointer: coarse)').matches) return;
  document.body.classList.add('touch');

  const ui = document.createElement('div');
  ui.id = 'touchUI';
  ui.innerHTML = `
    <div id="joyZone"></div>
    <div id="lookZone"></div>
    <div id="joyBase"><div id="joyKnob"></div></div>
    <button id="crouchBtn">SIT</button>
    <button id="runBtn">RUN</button>`;
  document.body.appendChild(ui);

  const $ = (id) => document.getElementById(id);
  const base = $('joyBase'), knob = $('joyKnob');
  const rest = () => ({ x: 90, y: innerHeight - 100 });
  let origin = rest();
  const placeBase = (p) => {
    base.style.left = p.x - 60 + 'px';
    base.style.top = p.y - 60 + 'px';
  };
  placeBase(origin);

  zone($('joyZone'),
    (t) => { origin = { x: t.clientX, y: t.clientY }; placeBase(origin); base.classList.add('on'); },
    (t) => {
      let dx = t.clientX - origin.x, dy = t.clientY - origin.y;
      const d = Math.hypot(dx, dy);
      if (d > R) { dx = (dx / d) * R; dy = (dy / d) * R; }
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
      input.moveX = dx / R;
      input.moveY = -dy / R;
    },
    () => {
      input.moveX = 0; input.moveY = 0;
      knob.style.transform = '';
      base.classList.remove('on');
      origin = rest(); placeBase(origin);
    });

  let last = null;
  zone($('lookZone'),
    (t) => { last = { x: t.clientX, y: t.clientY }; },
    (t) => {
      input.lookX += (t.clientX - last.x) * LOOK;
      input.lookY += (t.clientY - last.y) * LOOK;
      last = { x: t.clientX, y: t.clientY };
    },
    () => { last = null; });

  const bind = (id, name) =>
    $(id).addEventListener('touchstart', (e) => { e.preventDefault(); toggle(name); }, { passive: false });
  bind('runBtn', 'run');
  bind('crouchBtn', 'crouch');

  addEventListener('inputchange', () => {
    $('runBtn').classList.toggle('active', input.run);
    $('crouchBtn').classList.toggle('active', input.crouch);
  });
}