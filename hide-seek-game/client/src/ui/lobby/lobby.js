import { el, toast } from '../dom.js';
import { ROOMS, TEAMS, PLAYERS, state, getSlot, mySlot } from './data.js';
import { slotMenu, exchangeMenu, incomingExchange, startTeamMatch } from './menu.js';
import { req } from './net.js';

let grid = null;
let liveEl = null;

function draw() {
  const me = mySlot();
  if (!grid || !grid.isConnected || !state.snap || !me) return;
  liveEl.classList.toggle('hide', !state.snap.running);
  grid.replaceChildren();
  grid.append(el('div', 'corner'));
  ROOMS.forEach((r) => grid.append(el('div', 'roomhead', `Room ${r.n} . ${r.c} rakshas`)));
  grid.append(el('div', 'corner'));

  for (let t = 1; t <= TEAMS; t++) {
    const tm = state.snap.teams[t];
    grid.append(el('div', 'teamhead', `TEAM<b>${t}</b>`));
    for (let p = 1; p <= PLAYERS; p++) {
      const s = getSlot(t, p);
      const full = !!s.pid;
      const kind = s.pid === state.pid ? 'me' : !full ? 'empty' : t === me.team ? 'mate' : 'foe';
      const star = tm.holder && tm.holder === s.pid ? ' ★' : '';
      const c = el('button', 'cell ' + kind + (s.out ? ' out' : ''),
        `<span class="rm">ROOM ${s.room}</span><span class="pl${full ? ' u' : ''}"></span><span class="nm">Team ${t} Player ${p}${star}</span>`);
      c.querySelector('.pl').textContent = full ? s.name : '+';
      c.onclick = () => {
        if (kind === 'me') return toast('Ye tumhara slot hai');
        if (kind === 'empty') return slotMenu(s);
        if (kind === 'mate') return exchangeMenu(mySlot(), s);
        toast(`${s.name} (opponent)`);
      };
      grid.append(c);
    }
    const ctl = el('div', 'ctl');
    const m = el('button', 'mbtn');
    m.dataset.team = t;
    m.onclick = () => startTeamMatch(t);
    const sb = el('button', 'sbtn');
    sb.dataset.team = t;
    sb.onclick = async () => {
      const r = await req('team:start');
      if (r.error) toast(r.error);
    };
    ctl.append(m, sb);
    grid.append(ctl);
  }
  tick();
}

function tick() {
  if (!grid || !grid.isConnected || !state.snap) return;
  grid.querySelectorAll('.mbtn').forEach((b) => {
    const t = Number(b.dataset.team);
    const empties = state.snap.slots.filter((s) => s.team === t && !s.pid).length;
    const end = state.endsAt[t];
    if (end) {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      b.innerHTML = `SEARCH<br>${left}s`;
      b.className = 'mbtn busy';
      b.disabled = true;
    } else if (!empties) {
      b.textContent = 'FULL';
      b.className = 'mbtn full';
      b.disabled = true;
    } else {
      b.textContent = 'MATCH';
      b.className = 'mbtn';
      b.disabled = false;
    }
  });
  grid.querySelectorAll('.sbtn').forEach((b) => {
    const tm = state.snap.teams[Number(b.dataset.team)];
    if (tm.started) { b.textContent = state.snap.roundOn ? 'LIVE' : 'READY'; b.className = 'sbtn live'; b.disabled = true; }
    else if (tm.holder && tm.holder === state.pid) { b.textContent = 'START'; b.className = 'sbtn'; b.disabled = false; }
    else { b.textContent = 'START'; b.className = 'sbtn lock'; b.disabled = true; }
  });
}

setInterval(tick, 1000);
addEventListener('lobbychange', draw);
addEventListener('ps:exchange-in', (e) => incomingExchange(e.detail));

export function lobbyScreen() {
  document.body.classList.add('in-lobby');
  const root = el('div', 'screen lobby');
  const top = el('div', 'lob-top');
  top.append(el('div', 'lob-title', `<i class="pulse"></i>ORBITAL LOBBY<small>CODE ${state.snap.code}</small>`));
  liveEl = el('span', 'gl hide', '● GAME LIVE');
  top.append(liveEl);
  const leave = el('button', 'btn ghost leave', 'Exit');
  leave.onclick = async () => {
    await req('lobby:leave');
    state.snap = null;
    state.pid = null;
    dispatchEvent(new Event('ps:left'));
  };
  top.append(leave);
  grid = el('div', 'grid');
  root.append(top, grid);
  draw();
  return root;
}