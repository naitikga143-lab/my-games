import { el, show } from './dom.js';

export function splash(next) {
  const s = el('div', 'screen splash',
    '<div class="t-main">Trap Master</div><div class="t-sub">Diwali Special</div>');
  show(s);
  let done = false;
  const go = () => { if (!done) { done = true; next(); } };
  s.addEventListener('pointerdown', go);   // tap = skip
  setTimeout(go, 4200);
}