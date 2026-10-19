import { el } from '../dom.js';
import { ROOMS, TEAMS, PLAYERS, state, getSlot } from './data.js';
import { slotMenu, exchangeMenu, toast } from './menu.js';

export function lobbyScreen() {
  document.body.classList.add('in-lobby');
  const root = el('div', 'screen lobby');
  root.append(el('div', 'lob-title', `<i class="pulse"></i>ORBITAL LOBBY<small>CODE ${state.code}</small>`));
  const grid = el('div', 'grid');
  root.append(grid);

  function draw() {
    grid.replaceChildren();
    grid.append(el('div', 'corner'));
    ROOMS.forEach((r) => grid.append(el('div', 'roomhead', `Room ${r.n} with ${r.bots} bots`)));

    for (let t = 1; t <= TEAMS; t++) {
      grid.append(el('div', 'teamhead', `TEAM<b>${t}</b>`));
      for (let p = 1; p <= PLAYERS; p++) {
        const s = getSlot(t, p);
        const kind = s === state.me ? 'me' : !s.who ? 'empty' : t === state.me.team ? 'mate' : 'foe';
        const mid = kind === 'empty' ? '+' : kind === 'me' ? 'YOU' : s.who;
        const c = el('button', 'cell ' + kind,
          `<span class="rm">ROOM ${s.room}</span><span class="pl">${mid}</span><span class="nm">Team ${t} Player ${p}</span>`);
        c.onclick = () => {
          if (kind === 'me') return toast('Ye tumhara slot hai');
          if (kind === 'empty') return slotMenu(s);
          if (kind === 'mate') return exchangeMenu(state.me, s);
          toast('Opponent player');
        };
        grid.append(c);
      }
    }
  }
  draw();
  addEventListener('lobbychange', draw);
  return root;
}