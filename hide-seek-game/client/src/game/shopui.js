import { me } from '../player/self.js';
import { WEAPONS } from './weapondata.js';
import { eco } from './economy.js';
import { SHOPS, SHOP_RADIUS } from './shopdata.js';
import { input, setWeapon } from '../player/input.js';
import { toast } from '../ui/dom.js';

const CSS = `
#shop{position:fixed;left:50%;bottom:calc(14px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9;display:none;
  width:min(360px,94vw);box-sizing:border-box;padding:8px;background:rgba(10,6,3,.9);border:1px solid #c9a45a;color:#f0d9a0;font:12px Arial}
#shop h4{margin:0 0 6px;font-size:12px;letter-spacing:2px;text-align:center}
#shop .row{display:flex;align-items:center;gap:8px;margin:4px 0}
#shop .row span{flex:1}
#shop button{min-width:96px;padding:7px 4px;border:1px solid #c9a45a;background:#3a2412;color:#f0d9a0;font:bold 11px Arial}
#shop button:disabled{opacity:.4}
#shop button.eq{background:#5a3a1c;color:#fff}
`;

export function initShop(buy) {
  const st = document.createElement('style');
  st.textContent = CSS;
  document.head.appendChild(st);

  const panel = document.createElement('div');
  panel.id = 'shop';
  const head = document.createElement('h4');
  panel.append(head);
  const btns = WEAPONS.map((w, i) => {
    const row = document.createElement('div');
    row.className = 'row';
    const name = document.createElement('span');
    name.textContent = `${i + 1}. ${w.name}`;
    const b = document.createElement('button');
    b.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (eco.owned[i]) setWeapon(i); else buy(i);
    });
    row.append(name, b);
    panel.append(row);
    return b;
  });
  document.body.append(panel);

  const isNear = () => me.alive && SHOPS.some((s) =>
    Math.abs(me.pos.y - s.y) < 2 && Math.hypot(me.pos.x - s.x, me.pos.z - s.z) < SHOP_RADIUS);

  addEventListener('shop:want', (e) => {
    if (isNear()) buy(e.detail); else toast('Pehle shop ke paas jao');
  });

  let acc = 0;
  return {
    update(dt) {
      acc += dt;
      if (acc < 0.2) return;
      acc = 0;
      const near = isNear();
      panel.style.display = near ? 'block' : 'none';
      if (!near) return;
      head.textContent = `ARMS SHOP · $${me.coins}`;
      WEAPONS.forEach((w, i) => {
        const b = btns[i];
        if (eco.owned[i]) {
          b.textContent = input.weapon === i ? 'EQUIPPED' : 'EQUIP';
          b.className = input.weapon === i ? 'eq' : '';
          b.disabled = false;
        } else {
          b.textContent = `BUY $${w.price}`;
          b.className = '';
          b.disabled = me.coins < w.price;
        }
      });
    },
  };
}