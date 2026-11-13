import { IDS, orient, loadLayout, saveLayout, centerOf, sizeOf, safeBottom } from './controlsLayout.js';

/*
  Customize screen: map ke upar FIRE / JUMP / RUN / CAM ko pakad kar kheencho, size slider se bada-chhota karo,
  neeche beech mein SAVE dabao. Game mein bilkul yahi layout dikhta hai (touch.js saved layout padhta hai).
  Landscape aur portrait ka layout alag save hota hai (jo orientation mein khologe, wahi save hoga).
*/
const LABEL = { fire: 'FIRE', jump: 'JUMP', run: 'RUN', cam: 'CAM' };
const TOP = 84; // upar ka hissa (title + size slider): buttons yahan nahi aa sakte (game mein wahan HUD hota hai)

const CSS = `
#cust{position:fixed;inset:0;z-index:90;background:#040a1f;color:#fff;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
 user-select:none;-webkit-user-select:none;touch-action:none;overflow:hidden}
#cust .cmap{position:absolute;inset:0;width:100%;height:100%}
#cust .cbar{position:absolute;left:0;right:0;top:max(8px,env(safe-area-inset-top));padding:0 max(10px,env(safe-area-inset-right)) 0 max(10px,env(safe-area-inset-left));
 display:flex;align-items:center;justify-content:space-between;gap:8px}
#cust .cbtn{padding:8px 14px;border:1px solid rgba(255,255,255,.3);border-radius:12px;background:rgba(0,0,0,.45);color:#fff;font:700 13px system-ui,sans-serif}
#cust .ctitle{text-align:center;font:800 14px system-ui,sans-serif;letter-spacing:.16em;text-shadow:0 1px 4px #000}
#cust .ctitle small{display:block;margin-top:2px;font:500 11px system-ui,sans-serif;letter-spacing:.04em;opacity:.8}
#cust .csize{position:absolute;left:50%;top:calc(max(8px,env(safe-area-inset-top)) + 42px);transform:translateX(-50%);width:min(60vw,300px);
 display:flex;align-items:center;gap:8px;font:600 12px system-ui,sans-serif;text-shadow:0 1px 3px #000}
#cust .csize input{flex:1;height:28px;margin:0;accent-color:#ffb53a;touch-action:manipulation}
#cust .csize b{min-width:38px;text-align:right;font-variant-numeric:tabular-nums}
#cust .cjoy{position:absolute;left:24px;bottom:calc(40px + env(safe-area-inset-bottom,0px));width:112px;height:112px;border-radius:50%;
 border:2px dashed rgba(255,255,255,.35);display:flex;flex-direction:column;align-items:center;justify-content:center;
 font:700 12px system-ui,sans-serif;letter-spacing:.1em;opacity:.8;pointer-events:none;text-align:center}
#cust .cjoy small{font:500 9px system-ui,sans-serif;letter-spacing:.02em;opacity:.8;padding:0 10px}
#cust .cb{position:absolute;border-radius:50%;display:flex;align-items:center;justify-content:center;font:700 13px/1 system-ui,sans-serif;
 letter-spacing:.5px;background:rgba(255,255,255,.2);border:2px solid rgba(255,255,255,.75);box-shadow:0 0 14px rgba(0,0,0,.5);
 touch-action:none;cursor:grab;z-index:2}
#cust .cb.drag{background:rgba(255,255,255,.4);cursor:grabbing;transform:scale(1.06)}
#cust .cb.bad{background:rgba(255,60,60,.4);border-color:#ff5a5a}
#cust .cbottom{position:absolute;left:0;right:0;bottom:max(12px,env(safe-area-inset-bottom));display:flex;justify-content:center;z-index:3;pointer-events:none}
#cust .csave{pointer-events:auto;padding:12px 44px;border:0;border-radius:999px;font:800 15px system-ui,sans-serif;letter-spacing:.2em;
 color:#2a1304;background:linear-gradient(180deg,#ffe08a,#ff9a2e);box-shadow:0 8px 24px rgba(0,0,0,.5)}
#cust .csave.off{opacity:.45;filter:grayscale(.6)}
#cust .cflash{position:absolute;left:50%;bottom:calc(max(12px,env(safe-area-inset-bottom)) + 58px);transform:translateX(-50%);z-index:4;
 padding:8px 16px;border-radius:999px;background:rgba(10,14,40,.94);border:1px solid rgba(255,210,122,.6);font:600 12px system-ui,sans-serif;
 opacity:0;pointer-events:none;transition:opacity .25s;max-width:90vw;text-align:center}
#cust .cflash.show{opacity:1}`;

const MAP = `
<svg class="cmap" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="cust-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040a1f"/><stop offset=".62" stop-color="#16264d"/></linearGradient>
    <radialGradient id="cust-glow"><stop offset="0" stop-color="#ffa040" stop-opacity=".85"/><stop offset="1" stop-color="#ffa040" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="160" height="90" fill="url(#cust-sky)"/>
  <g fill="#fff" opacity=".8"><circle cx="12" cy="10" r=".5"/><circle cx="34" cy="20" r=".4"/><circle cx="58" cy="8" r=".5"/><circle cx="84" cy="16" r=".4"/><circle cx="108" cy="9" r=".5"/><circle cx="146" cy="26" r=".4"/><circle cx="70" cy="28" r=".3"/></g>
  <circle cx="132" cy="14" r="5" fill="#dfe8ff"/>
  <rect y="58" width="160" height="32" fill="#1c4a2a"/>
  <path d="M0 58 Q40 53 80 58 T160 58 V61 H0Z" fill="#2a6a38"/>
  <g fill="#0d2418"><rect x="16" y="40" width="3" height="19"/><ellipse cx="17.5" cy="38" rx="15" ry="8"/><rect x="136" y="42" width="3" height="17"/><ellipse cx="137.5" cy="40" rx="13" ry="7"/></g>
  <circle cx="118" cy="58" r="14" fill="url(#cust-glow)"/>
  <ellipse cx="118" cy="60" rx="5.5" ry="4" fill="#8e4a2a"/><circle cx="123.5" cy="56.5" r="2.7" fill="#d49a68"/>
  <rect x="50" y="52" width="4.6" height="11" rx="2.2" fill="#17171b"/><circle cx="52.3" cy="50" r="2.5" fill="#d9a98a"/>
  <g stroke="#fff" stroke-opacity=".75" stroke-width=".5" fill="none"><circle cx="80" cy="45" r="3"/><path d="M80 39v3M80 48v3M74 45h3M83 45h3"/></g>
</svg>`;

export function openCustomize(onDone) {
  if (document.getElementById('cust')) return;
  if (!document.getElementById('cust-css')) {
    const st = document.createElement('style');
    st.id = 'cust-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  const root = document.createElement('div');
  root.id = 'cust';
  root.innerHTML = `${MAP}
    <div class="cbar">
      <button class="cbtn" data-a="back">&#8249; Back</button>
      <div class="ctitle">CUSTOMIZE CONTROLS <span data-o></span><small>Button ko pakad kar kheencho</small></div>
      <button class="cbtn" data-a="reset">Reset</button>
    </div>
    <div class="csize"><span>Size</span><input type="range" min="70" max="140" step="5" value="100" data-size><b data-sv>100%</b></div>
    <div class="cjoy">MOVE<small>jahan ungli rakho wahin joystick</small></div>
    <div class="cbottom"><button class="csave" data-a="save">SAVE</button></div>
    <div class="cflash" data-flash></div>`;
  document.body.appendChild(root);
  const q = (s) => root.querySelector(s);

  const els = {};
  for (const id of IDS) {
    const b = document.createElement('div');
    b.className = 'cb';
    b.dataset.id = id;
    b.textContent = LABEL[id];
    root.appendChild(b);
    els[id] = b;
  }

  let which = orient();
  let scale = 1;
  const pos = {}; // id -> {x, y} (screen ka fraction); jo nahi hai wo default jagah par
  let inset = safeBottom();
  let drag = null;
  let bad = false;
  let flashT = 0;

  const cfgNow = () => ({ scale, pos });

  const load = () => {
    which = orient();
    inset = safeBottom();
    const cfg = loadLayout()[which] || null;
    scale = cfg && cfg.scale ? cfg.scale : 1;
    for (const k of Object.keys(pos)) delete pos[k];
    if (cfg && cfg.pos) for (const id of IDS) if (cfg.pos[id]) pos[id] = { x: cfg.pos[id].x, y: cfg.pos[id].y };
    q('[data-size]').value = String(Math.round(scale * 100));
    q('[data-sv]').textContent = `${Math.round(scale * 100)}%`;
    q('[data-o]').textContent = which === 'land' ? '\u00b7 LANDSCAPE' : '\u00b7 PORTRAIT';
  };

  // button ko screen ke andar, HUD ke neeche aur SAVE ke upar rakho
  const clampPos = (id, x, y) => {
    const s = sizeOf(id, cfgNow()), W = window.innerWidth, H = window.innerHeight;
    const nx = Math.min(W - s / 2 - 6, Math.max(s / 2 + 6, x));
    let maxY = H - s / 2 - 6;
    if (Math.abs(nx - W / 2) < 80 + s / 2) maxY = Math.min(maxY, H - 66 - s / 2);
    return { x: nx, y: Math.min(maxY, Math.max(TOP + s / 2, y)) };
  };

  const render = () => {
    const W = window.innerWidth, H = window.innerHeight;
    const cs = {};
    for (const id of IDS) {
      const s = sizeOf(id, cfgNow());
      const c0 = centerOf(id, W, H, cfgNow(), inset);
      const c = clampPos(id, c0.x, c0.y);
      cs[id] = { c, s };
      const el = els[id];
      el.style.width = `${s}px`;
      el.style.height = `${s}px`;
      el.style.left = `${c.x - s / 2}px`;
      el.style.top = `${c.y - s / 2}px`;
    }
    bad = false;
    for (const a of IDS) {
      let ov = false;
      for (const b of IDS) {
        if (a === b) continue;
        const d = Math.hypot(cs[a].c.x - cs[b].c.x, cs[a].c.y - cs[b].c.y);
        if (d < (cs[a].s + cs[b].s) / 2 + 4) ov = true;
      }
      els[a].classList.toggle('bad', ov);
      bad = bad || ov;
    }
    q('.csave').classList.toggle('off', bad);
    return cs;
  };

  const flash = (msg) => {
    const f = q('[data-flash]');
    f.textContent = msg;
    f.classList.add('show');
    clearTimeout(flashT);
    flashT = setTimeout(() => f.classList.remove('show'), 2200);
  };

  /* ---------- drag ---------- */
  root.addEventListener('pointerdown', (e) => {
    const b = e.target.closest ? e.target.closest('.cb') : null;
    if (!b || drag) return;
    e.preventDefault();
    const id = b.dataset.id;
    const c = render()[id].c;
    drag = { id, pid: e.pointerId, gx: e.clientX - c.x, gy: e.clientY - c.y };
    b.setPointerCapture(e.pointerId);
    b.classList.add('drag');
  });
  root.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.pid) return;
    e.preventDefault();
    const p = clampPos(drag.id, e.clientX - drag.gx, e.clientY - drag.gy);
    pos[drag.id] = { x: p.x / window.innerWidth, y: p.y / window.innerHeight };
    render();
  });
  const endDrag = (e) => {
    if (!drag || e.pointerId !== drag.pid) return;
    els[drag.id].classList.remove('drag');
    drag = null;
  };
  root.addEventListener('pointerup', endDrag);
  root.addEventListener('pointercancel', endDrag);

  /* ---------- size, reset, save, back ---------- */
  q('[data-size]').addEventListener('input', (e) => {
    scale = Number(e.target.value) / 100;
    q('[data-sv]').textContent = `${Math.round(scale * 100)}%`;
    render();
  });

  const close = (reason) => {
    window.removeEventListener('resize', onResize);
    clearTimeout(flashT);
    root.remove();
    if (onDone) onDone(reason);
  };

  root.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('[data-a]') : null;
    if (!a) return;
    const act = a.dataset.a;
    if (act === 'back') { close('cancel'); return; }
    if (act === 'reset') {
      for (const k of Object.keys(pos)) delete pos[k];
      scale = 1;
      q('[data-size]').value = '100';
      q('[data-sv]').textContent = '100%';
      render();
      flash('Pehle jaisa layout (SAVE dabane par hi lagega)');
      return;
    }
    if (act === 'save') {
      const cs = render();
      if (bad) { flash('Buttons ek doosre par aa rahe hain, unhe alag karo'); return; }
      const W = window.innerWidth, H = window.innerHeight;
      const out = {};
      for (const id of IDS) out[id] = { x: Math.round((cs[id].c.x / W) * 10000) / 10000, y: Math.round((cs[id].c.y / H) * 10000) / 10000 };
      saveLayout(which, { scale, pos: out });
      close('saved');
    }
  });

  // phone ghumne / fullscreen par: orientation badli to us orientation ka layout dikhao
  const onResize = () => {
    if (orient() !== which) load();
    inset = safeBottom();
    render();
  };
  window.addEventListener('resize', onResize);

  load();
  render();
}