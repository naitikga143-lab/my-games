/*
  Mobile landscape setup:
   - portrait mein "phone ghumao" screen dikhta hai aur game pause rehta hai
   - pehle tap par fullscreen + landscape lock (Android Chrome). iPhone lock support nahi karta,
     wahan rotate screen hi kaam aata hai.
   - top-right par fullscreen button
   - desktop par kuch nahi karta
*/
export function setupLandscape({ isTouch }) {
  if (window.__landscape) return window.__landscape; // pehle se chalu hai
  const api = { blocked: false };
  window.__landscape = api;
  if (!isTouch) return api;

  const css = document.createElement('style');
  css.textContent = `
#rot-hint{position:fixed;inset:0;z-index:100;display:none;flex-direction:column;gap:16px;align-items:center;justify-content:center;
 background:#16264d;color:#fff;font:700 clamp(18px,5vw,26px) system-ui,sans-serif;text-align:center;padding:24px}
#rot-hint .ph{font-size:64px;animation:rotph 2s ease-in-out infinite}
@keyframes rotph{0%,30%{transform:rotate(0)}70%,100%{transform:rotate(-90deg)}}
#fs-btn{position:fixed;top:max(10px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));z-index:70;
 width:38px;height:38px;border-radius:10px;border:1px solid rgba(255,255,255,.5);background:rgba(0,0,0,.35);color:#fff;
 font:700 20px system-ui,sans-serif;line-height:1;padding:0}`;
  document.head.appendChild(css);

  const hint = document.createElement('div');
  hint.id = 'rot-hint';
  hint.innerHTML = '<div class="ph">📱</div><div>Landscape mein khelo</div><div style="font-size:.6em;font-weight:500;opacity:.8">Phone ko side mein ghumao</div>';

  const btn = document.createElement('button');
  btn.id = 'fs-btn';
  btn.textContent = '⛶';
  document.body.append(hint, btn);

  const de = document.documentElement;
  const reqFs = de.requestFullscreen || de.webkitRequestFullscreen;
  const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
  if (!reqFs) btn.style.display = 'none'; // iPhone Safari: fullscreen support nahi

  const goFull = async () => {
    try {
      if (!fsEl() && reqFs) await reqFs.call(de, { navigationUI: 'hide' });
    } catch (e) { /* ignore */ }
    try {
      if (screen.orientation && screen.orientation.lock) await screen.orientation.lock('landscape');
    } catch (e) { /* iOS / unsupported */ }
  };

  const check = () => {
    const portrait = window.innerHeight > window.innerWidth;
    api.blocked = portrait;
    hint.style.display = portrait ? 'flex' : 'none';
  };

  // pehla tap => fullscreen + lock (touch mein browser pointerup par hi permission deta hai)
  window.addEventListener('pointerup', goFull, { once: true, capture: true });

  btn.addEventListener('pointerdown', (e) => e.stopPropagation());
  btn.addEventListener('touchstart', (e) => e.stopPropagation());
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (fsEl()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else goFull();
  });

  const refit = () => setTimeout(() => { check(); window.dispatchEvent(new Event('resize')); }, 200);
  window.addEventListener('resize', check);
  window.addEventListener('orientationchange', refit);
  document.addEventListener('fullscreenchange', refit);
  document.addEventListener('webkitfullscreenchange', refit);
  check();
  return api;
}