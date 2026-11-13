/*
  Touch buttons ka layout: customize screen (customize.js) likhta hai, touch.js (game) padhta hai.
  Landscape aur portrait ka layout alag-alag save hota hai, device (localStorage) par.
  Position screen ke hisaab se fraction (0-1) mein save hoti hai, isliye alag screen size par bhi theek baithti hai.
*/
const KEY = 'ch_controls_v1';

export const IDS = ['fire', 'jump', 'run', 'cam'];
export const BASE = { fire: 84, jump: 58, run: 62, cam: 58 }; // button ka size (px)
// pehle ki tarah default: [right, bottom] px
const DEF = { fire: [24, 34], jump: [24, 132], run: [120, 26], cam: [118, 104] };

export const orient = () => (window.innerWidth >= window.innerHeight ? 'land' : 'port');

export function loadLayout() {
  try {
    const o = JSON.parse(localStorage.getItem(KEY));
    return o && typeof o === 'object' ? o : {};
  } catch (e) {
    return {};
  }
}

export function saveLayout(which, cfg) {
  const all = loadLayout();
  all[which] = cfg;
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) { /* ignore */ }
}

export function sizeOf(id, cfg) {
  const sc = cfg && Number.isFinite(cfg.scale) && cfg.scale > 0 ? cfg.scale : 1;
  return Math.round(BASE[id] * Math.min(1.6, Math.max(0.6, sc)));
}

// iPhone ke neeche ki safe jagah (px)
export function safeBottom() {
  const p = document.createElement('div');
  p.style.cssText = 'position:fixed;left:0;bottom:0;width:0;height:env(safe-area-inset-bottom,0px);visibility:hidden;pointer-events:none';
  document.body.appendChild(p);
  const h = p.getBoundingClientRect().height || 0;
  p.remove();
  return h;
}

// button ka center (px). cfg = { scale, pos: { id: {x, y} } } ya null
export function centerOf(id, W, H, cfg, inset = 0) {
  const s = sizeOf(id, cfg);
  const p = cfg && cfg.pos && cfg.pos[id];
  let x, y;
  if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) {
    x = p.x * W;
    y = p.y * H;
  } else {
    x = W - DEF[id][0] - s / 2;
    y = H - DEF[id][1] - inset - s / 2;
  }
  const m = 6;
  return {
    x: Math.min(W - s / 2 - m, Math.max(s / 2 + m, x)),
    y: Math.min(H - s / 2 - m, Math.max(s / 2 + m, y)),
  };
}