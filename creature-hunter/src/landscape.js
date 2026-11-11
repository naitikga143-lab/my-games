/*
  Mobile landscape setup:
   - Game landscape ke liye bana hai, par portrait mein BLOCK NAHI hota (koi "phone ghumao" screen nahi,
     game pause nahi hota). Link se aane wala portrait mein bhi seedha khel sakta hai.
   - pehle tap par fullscreen + landscape lock ki koshish (Android Chrome par phone khud ghoom jata hai).
     iPhone lock support nahi karta, wahan jaisa phone hai waisa chalta hai.
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
#fs-btn{position:fixed;top:max(10px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));z-index:70;
 width:38px;height:38px;border-radius:10px;border:1px solid rgba(255,255,255,.5);background:rgba(0,0,0,.35);color:#fff;
 font:700 20px system-ui,sans-serif;line-height:1;padding:0}`;
  document.head.appendChild(css);

  const btn = document.createElement('button');
  btn.id = 'fs-btn';
  btn.textContent = '⛶';
  document.body.append(btn);

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

  // pehla tap => fullscreen + lock (touch mein browser pointerup par hi permission deta hai)
  window.addEventListener('pointerup', goFull, { once: true, capture: true });

  btn.addEventListener('pointerdown', (e) => e.stopPropagation());
  btn.addEventListener('touchstart', (e) => e.stopPropagation());
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (fsEl()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else goFull();
  });

  // phone ghoomne ya fullscreen badalne par screen ka size dobara set karo
  const refit = () => setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
  window.addEventListener('orientationchange', refit);
  document.addEventListener('fullscreenchange', refit);
  document.addEventListener('webkitfullscreenchange', refit);
  return api; // api.blocked hamesha false (main.js purani line ke liye)
}