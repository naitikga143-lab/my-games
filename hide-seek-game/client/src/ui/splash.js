import { el, show } from './dom.js';

export function splash(next) {
  const s = el('div', 'screen splash',
    '<div class="t-main">Hide and Seek</div><div class="t-sub">Peace Less</div>');
  show(s);
  let done = false;
  const go = () => { if (!done) { done = true; next(); } };
  s.addEventListener('pointerdown', go);   // tap = skip
  setTimeout(go, 4200);
}