import { me } from '../player/self.js';
import { on } from './fighters.js';

const CSS = `
body.ingame::before{display:none!important}
#xh{position:fixed;left:50%;top:50%;width:0;height:0;z-index:6;pointer-events:none;--g:5px}
#xh i{position:absolute;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.6)}
#xh .t{width:2px;height:7px;left:-1px;top:calc(-7px - var(--g))}
#xh .b{width:2px;height:7px;left:-1px;top:var(--g)}
#xh .l{width:7px;height:2px;top:-1px;left:calc(-7px - var(--g))}
#xh .r{width:7px;height:2px;top:-1px;left:var(--g)}
#xh .d{width:2px;height:2px;left:-1px;top:-1px;background:#ff3b30;box-shadow:none}
`;

export function initCrosshair() {
  const st = document.createElement('style');
  st.textContent = CSS;
  document.head.appendChild(st);
  const el = document.createElement('div');
  el.id = 'xh';
  el.innerHTML = '<i class="t"></i><i class="b"></i><i class="l"></i><i class="r"></i><i class="d"></i>';
  document.body.appendChild(el);

  let bloom = 0, gap = 5, lx = me.pos.x, lz = me.pos.z;
  on('shot', (s) => { if (s === me) bloom = Math.min(10, bloom + 3.5); });

  return {
    update(dt, ads) {
      const sp = Math.min(8, Math.hypot(me.pos.x - lx, me.pos.z - lz) / Math.max(dt, 1e-3));
      lx = me.pos.x; lz = me.pos.z;
      bloom *= Math.exp(-dt * 8);
      const target = 4 + sp * 1.2 + bloom - (me.crouch ? 2 : 0);
      gap += (target - gap) * Math.min(1, dt * 14);
      el.style.setProperty('--g', gap.toFixed(1) + 'px');
      el.style.opacity = String(1 - ads);
    },
  };
}