import { me } from '../player/self.js';
import { WEAPONS, SCOPES } from './weapondata.js';
import { eco } from './economy.js';
import { SHOPS, SHOP_RADIUS } from './shopdata.js';
import { input, setWeapon, setScope } from '../player/input.js';
import { toast } from '../ui/dom.js';

const CSS = `
#shop{position:fixed;left:50%;bottom:calc(14px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9;display:none;
  width:min(520px,96vw);box-sizing:border-box;padding:8px;background:rgba(10,6,3,.92);border:1px solid #c9a45a;color:#f0d9a0;font:12px Arial}
#shop h4{margin:0 0 6px;font-size:12px;letter-spacing:2px;text-align:center}
#shop .cols{display:grid;grid-template-columns:1fr 1fr;gap:10px}
#shop .sub{font-size:10px;letter-spacing:2px;opacity:.7;margin-bottom:2px}
#shop .row{display:flex;align-items:center;gap:6px;margin:3px 0}
#shop .row span{flex:1}
#shop button{min-width:84px;padding:6px 3px;border:1px solid #c9a45a;background:#3a2412;color:#f0d9a0;font:bold 10px Arial}
#shop button:disabled{opacity:.4}
#shop button.eq{background:#5a3a1c;color:#fff}
`;

export function initShop(buy, buyScope) {
  const st = document.createElement('style');
  st.textContent = CSS;
  document.head.appendChild(st);

  const panel = document.createElement('div');
  panel.id = 'shop';
  const head = document.createElement('h4');
  const cols = document.createElement('div');
  cols.className = 'cols';
  const gc = document.createElement('div'), sc = document.createElement('div');
  gc.innerHTML = '<div class="sub">GUNS (1-4)</div>';
  sc.innerHTML = '<div class="sub">SCOPES (5-8)</div>';
  cols.append(gc, sc);
  panel.append(head, cols);

  const mk = (parent, label, fn) => {
    const row = document.createElement('div');
    row.className = 'row';
    const name = document.createElement('span');
    name.textContent = label;
    const b = document.createElement('button');
    b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); fn(); });
    row.append(name, b);
    parent.append(row);
    return b;
  };
  const gb = WEAPONS.map((w, i) => mk(gc, `${i + 1}. ${w.name}`, () => (eco.owned[i] ? setWeapon(i) : buy(i))));
  const sb = SCOPES.map((s, i) => mk(sc, `${i + 5}. ${s.name}`, () => (eco.scopes[i] ? setScope(i) : buyScope(i))));
  document.body.append(panel);

  const isNear = () => me.alive && SHOPS.some((s) =>
    Math.abs(me.pos.y - s.y) < 2 && Math.hypot(me.pos.x - s.x, me.pos.z - s.z) < SHOP_RADIUS);

  addEventListener('shop:want', (e) => { if (isNear()) buy(e.detail); else toast('Pehle shop ke paas jao'); });
  addEventListener('shop:wantscope', (e) => { if (isNear()) buyScope(e.detail); else toast('Pehle shop ke paas jao'); });

  const paint = (b, owned, equipped, price) => {
    if (owned) { b.textContent = equipped ? 'EQUIPPED' : 'EQUIP'; b.className = equipped ? 'eq' : ''; b.disabled = false; }
    else { b.textContent = `BUY $${price}`; b.className = ''; b.disabled = me.coins < price; }
  };

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
      WEAPONS.forEach((w, i) => paint(gb[i], eco.owned[i], input.weapon === i, w.price));
      SCOPES.forEach((s, i) => paint(sb[i], eco.scopes[i], eco.scope === i, s.price));
    },
  };
}