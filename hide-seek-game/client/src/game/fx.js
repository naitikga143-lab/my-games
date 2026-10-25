import { input } from '../player/input.js';

export const fxState = { slowK: 1 };

const CSS = `
#fxSmoke{position:fixed;inset:0;z-index:4;pointer-events:none;opacity:0;background:radial-gradient(circle,rgba(70,58,50,.2) 15%,rgba(38,30,26,.9) 100%)}
#fxFlash{position:fixed;inset:0;z-index:4;pointer-events:none;opacity:0;background:radial-gradient(circle,rgba(255,235,190,.9),rgba(255,170,70,.6))}
`;

let shake = 0, slowT = 0, smoke = 0, flash = 0;

export function applyFx(f) {
  shake = Math.max(shake, f.sh || 0);
  slowT = Math.max(slowT, f.sl || 0);
  smoke = Math.max(smoke, f.sm || 0);
  flash = Math.max(flash, f.fl || 0);
  if (f.kk) {                                    // view ko halka jhatka
    input.lookX += (Math.random() - 0.5) * f.kk * 2;
    input.lookY -= f.kk;
  }
}

export function initFx(camera) {
  const st = document.createElement('style');
  st.textContent = CSS;
  document.head.appendChild(st);
  const sm = document.createElement('div'); sm.id = 'fxSmoke';
  const fl = document.createElement('div'); fl.id = 'fxFlash';
  document.body.append(sm, fl);
  let t = 0;

  return {
    update(dt) {
      t += dt * 60;
      if (shake > 0.01) {
        camera.rotation.x += Math.sin(t * 1.7) * shake * 0.02;
        camera.rotation.y += Math.cos(t * 2.3) * shake * 0.02;
        shake *= Math.exp(-dt * 3.2);
      }
      slowT = Math.max(0, slowT - dt);
      fxState.slowK += ((slowT > 0 ? 0.62 : 1) - fxState.slowK) * Math.min(1, dt * 6);
      smoke = Math.max(0, smoke - dt * 0.6);
      sm.style.opacity = String(Math.min(0.8, smoke * 0.6));
      flash *= Math.exp(-dt * 7);
      fl.style.opacity = String(Math.min(0.3, flash));
    },
  };
}