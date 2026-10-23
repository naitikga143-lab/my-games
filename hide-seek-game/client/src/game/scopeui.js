import { eco } from './economy.js';

const CSS = `
#scp{position:fixed;inset:0;z-index:5;pointer-events:none;display:none;--r:34vmin}
#scp .dot{position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:#ff2a1a;box-shadow:0 0 8px 3px rgba(255,40,20,.7);display:none}
#scp .ring{position:absolute;left:50%;top:50%;width:64px;height:64px;margin:-32px 0 0 -32px;border:2px solid rgba(255,60,40,.85);border-radius:50%;box-shadow:0 0 6px rgba(255,40,20,.6);display:none}
#scp .tube{position:absolute;inset:0;display:none;background:radial-gradient(circle at 50% 50%,transparent var(--r),#020202 calc(var(--r) + .6vmin))}
#scp .tube::before{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:rgba(0,0,0,.85)}
#scp .tube::after{content:"";position:absolute;top:0;bottom:0;left:50%;width:1px;background:rgba(0,0,0,.85)}
#scp.rd .dot{display:block}
#scp.holo .dot,#scp.holo .ring{display:block}
#scp.x2,#scp.x3{--r:34vmin}
#scp.x3{--r:29vmin}
#scp.x2 .tube,#scp.x3 .tube{display:block}
#scp.x2 .dot,#scp.x3 .dot{display:block;width:3px;height:3px;margin:-1.5px 0 0 -1.5px;box-shadow:0 0 4px 1px rgba(255,40,20,.6)}
`;
const TYPES = ['rd', 'holo', 'x2', 'x3'];

export function initScopeUi() {
  const st = document.createElement('style');
  st.textContent = CSS;
  document.head.appendChild(st);
  const el = document.createElement('div');
  el.id = 'scp';
  el.innerHTML = '<div class="tube"></div><div class="ring"></div><div class="dot"></div>';
  document.body.appendChild(el);
  let cur = -1;

  return {
    update(ads) {
      if (ads < 0.02) { if (el.style.display !== 'none') el.style.display = 'none'; return; }
      el.style.display = 'block';
      if (cur !== eco.scope) { cur = eco.scope; el.className = TYPES[cur]; }
      el.style.opacity = cur >= 2 ? Math.min(1, Math.max(0, (ads - 0.5) * 2)) : ads;
    },
  };
}