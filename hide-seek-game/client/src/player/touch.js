import {
  input, toggle, setView, peekPress, peekRelease,
  togglePeekLock, setWeapon, nextWeapon, peekValue,
  nextScope, setAds,
} from './input.js';
import { WEAPONS } from './weapons.js' 

const R = 55;
const LOOK = 0.005;

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
    <button id="fireBtn">FIRE</button>
    <button id="runBtn">RUN</button>
    <button id="crouchBtn">SIT</button>
    <button id="gunBtn"></button>
    <button id="cam1">1</button>
    <button id="cam2">2</button>
    <button id="cam3">3</button>
    <button id="peekL">◀</button>
    <button id="peekR">▶</button>
    <button id="fireBtn2">FIRE</button>
    <button id="adsBtn">SCOPE</button>
    <button id="sightBtn">SIGHT</button>`;
  document.body.appendChild(ui);

  const $ = (id) => document.getElementById(id);

  // ---------- joystick ----------
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

  // ---------- look ----------
  let last = null;
  zone($('lookZone'),
    (t) => { last = { x: t.clientX, y: t.clientY }; },
    (t) => {
      input.lookX += (t.clientX - last.x) * LOOK;
      input.lookY += (t.clientY - last.y) * LOOK;
      last = { x: t.clientX, y: t.clientY };
    },
    () => { last = null; });

  // ---------- buttons ----------
  const sync = () => {
    const pk = peekValue();
    $('runBtn').classList.toggle('active', input.run);
    $('crouchBtn').classList.toggle('active', input.crouch);
    $('fireBtn').classList.toggle('active', input.fire);
    $('fireBtn2').classList.toggle('active', input.fire);
    $('peekL').classList.toggle('active', pk === -1);
    $('peekR').classList.toggle('active', pk === 1);
    $('cam1').classList.toggle('active', input.view === 1);
    $('cam2').classList.toggle('active', input.view === 2);
    $('cam3').classList.toggle('active', input.view === 3);
    $('gunBtn').textContent = WEAPONS[input.weapon].name;
    $('adsBtn').classList.toggle('active', input.ads);
  };
  addEventListener('inputchange', sync);
  sync();

  const press = (id, fn) =>
    $(id).addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); fn(); });

  const hold = (id, down, up) => {
    const el = $(id);
    const on = (e) => { e.preventDefault(); down(); };
    const off = (e) => { e.preventDefault(); up(); };
    el.addEventListener('touchstart', on, { passive: false });
    el.addEventListener('touchend', off, { passive: false });
    el.addEventListener('touchcancel', off, { passive: false });
  };

  press('runBtn', () => toggle('run'));
  press('crouchBtn', () => toggle('crouch'));
  press('cam1', () => setView(1));
  press('cam2', () => setView(2));
  press('cam3', () => setView(3));
  press('gunBtn', () => nextWeapon(1));
  press('adsBtn', () => setAds(!input.ads));
  press('sightBtn', () => nextScope());
  hold('fireBtn', () => { input.fire = true; sync(); }, () => { input.fire = false; sync(); });
  press('peekL', () => peekPress(-1));
  press('peekR', () => peekPress(1));
  hold('fireBtn2', () => { input.fire = true; sync(); }, () => { input.fire = false; sync(); });
}