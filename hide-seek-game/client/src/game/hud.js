import { on } from './fighters.js';
import { me } from '../player/self.js';
import { roomInfo } from './roomstate.js';

const CSS = `
#hud{position:fixed;inset:0;pointer-events:none;z-index:7;font:bold 12px Arial;color:#ffe9c4;text-shadow:0 1px 2px #000}
#hpBox{position:absolute;left:calc(12px + env(safe-area-inset-left));top:calc(10px + env(safe-area-inset-top));display:flex;align-items:center;gap:6px}
#hpBar{width:110px;height:8px;border:1px solid rgba(255,220,160,.6);background:rgba(0,0,0,.45)}
#hpFill{display:block;height:100%;width:100%;background:#e0503a}
#infoBox{position:absolute;left:50%;top:calc(10px + env(safe-area-inset-top));transform:translateX(-50%);white-space:nowrap;opacity:.95}
#banner{position:absolute;left:0;right:0;top:calc(30px + env(safe-area-inset-top));text-align:center;font-size:20px;letter-spacing:4px;color:#7dffb0}
#feed{position:absolute;left:calc(12px + env(safe-area-inset-left));top:calc(34px + env(safe-area-inset-top));display:flex;flex-direction:column;gap:2px}
#hitMark{position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-9px 0 0 -9px;opacity:0;transition:opacity .15s}
#hitMark::before,#hitMark::after{content:"";position:absolute;left:8px;top:-2px;width:2px;height:22px;background:#fff}
#hitMark::before{transform:rotate(45deg)}
#hitMark::after{transform:rotate(-45deg)}
#hitMark.on{opacity:1;transition:none}
#hitMark.head::before,#hitMark.head::after{background:#ff4030}
#popup{position:absolute;left:0;right:0;top:56%;text-align:center;font-size:22px;letter-spacing:4px;color:#ff4030;opacity:0;transition:opacity .4s}
#popup.on{opacity:1;transition:none}
#dmgFlash{position:absolute;inset:0;background:radial-gradient(transparent 40%,rgba(200,0,0,.65));opacity:0;transition:opacity .35s}
#dmgFlash.on{opacity:1;transition:none}
#deadMsg{position:absolute;left:0;right:0;top:36%;text-align:center;font-size:26px;letter-spacing:3px;white-space:pre}
#exitBtn{position:absolute;top:calc(10px + env(safe-area-inset-top));right:150px;width:44px;height:30px;pointer-events:auto;
  border:1px solid rgba(255,200,120,.6);background:rgba(20,12,6,.55);color:#ffd9a0;font:bold 11px Arial;border-radius:4px}
`;

export function initHud({ onExit } = {}) {
  const st = document.createElement('style');
  st.textContent = CSS;
  document.head.appendChild(st);

  const root = document.createElement('div');
  root.id = 'hud';
  root.innerHTML = `
    <div id="hpBox"><div id="hpBar"><i id="hpFill"></i></div><span id="hpTxt">100</span></div>
    <div id="infoBox"></div>
    <div id="banner"></div>
    <div id="feed"></div>
    <div id="hitMark"></div>
    <div id="popup"></div>
    <div id="dmgFlash"></div>
    <div id="deadMsg"></div>
    <button id="exitBtn">EXIT</button>`;
  document.body.appendChild(root);

  const $ = (id) => document.getElementById(id);
  const hpFill = $('hpFill'), hpTxt = $('hpTxt'), info = $('infoBox'), banner = $('banner');
  const feed = $('feed'), hit = $('hitMark'), dmg = $('dmgFlash'), dead = $('deadMsg'), popup = $('popup');
  let hitT = 0, dmgT = 0, popT = 0, lastInfo = '', lastDead = '', lastHp = -1, lastBanner = '';

  $('exitBtn').onclick = () => {
    if (confirm('Game se bahar jaana hai?')) onExit?.();
  };

  const pop = (txt, color) => {
    popup.textContent = txt;
    popup.style.color = color;
    popup.classList.add('on');
    popT = 0.7;
  };

  on('damage', (v) => { if (v === me) { dmg.classList.add('on'); dmgT = 0.08; } });
  on('hit', (s, v, head) => {
    if (s !== me) return;
    hit.className = 'on' + (head ? ' head' : '');
    hitT = 0.12;
  });
  on('kill', (v, a, head) => {
    const d = document.createElement('div');
    d.textContent = `${a ? a.name : '-'} ${head ? '★' : '›'} ${v.name}`;
    if (a === me || v === me) d.style.color = '#ffd34d';
    feed.appendChild(d);
    while (feed.children.length > 4) feed.firstChild.remove();
    setTimeout(() => d.remove(), 5000);
    if (a === me && v !== me) pop(head ? 'HEADSHOT' : 'KILL', head ? '#ff4030' : '#ffe9c4');
  });

  return {
    update(dt) {
      if (hitT > 0 && (hitT -= dt) <= 0) hit.className = '';
      if (dmgT > 0 && (dmgT -= dt) <= 0) dmg.classList.remove('on');
      if (popT > 0 && (popT -= dt) <= 0) popup.classList.remove('on');

      const txt = `${roomInfo.botsLeft ? 'BOTS ' + roomInfo.botsLeft : 'ROOM CLEAR'} · KILLS ${me.kills} · HS ${me.headshots} · $${me.coins}`;
      if (txt !== lastInfo) { info.textContent = txt; lastInfo = txt; }

      const b = roomInfo.banner;
      if (b !== lastBanner) { banner.textContent = b; lastBanner = b; }

      if (me.hp !== lastHp) {
        lastHp = me.hp;
        hpFill.style.width = me.hp + '%';
        hpTxt.textContent = Math.round(me.hp);
      }

      const msg = me.alive ? '' : 'ELIMINATED\n' + (roomInfo.respawn ? 'respawning…' : 'EXIT dabake lobby me wapas jao');
      if (msg !== lastDead) { dead.textContent = msg; lastDead = msg; }
    },
  };
}