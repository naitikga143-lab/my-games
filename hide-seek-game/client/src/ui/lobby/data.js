export const ROOMS = [
  { n: 1, bots: 16 }, { n: 2, bots: 18 }, { n: 3, bots: 20 }, { n: 4, bots: 24 },
];
export const TEAMS = 4;
export const PLAYERS = 4;
export const MATCH_SECONDS = 60;

const params = new URLSearchParams(location.search);

export const state = {
  code: params.get('lobby') || Math.random().toString(36).slice(2, 8),
  slots: [],
  me: null,
};

// who: null = khaali, 'me' = tum, baaki = doosre player ka naam
for (let t = 1; t <= TEAMS; t++) {
  for (let p = 1; p <= PLAYERS; p++) state.slots.push({ team: t, player: p, room: p, who: null });
}

export const getSlot = (t, p) => state.slots[(t - 1) * PLAYERS + (p - 1)];
export const notify = () => dispatchEvent(new Event('lobbychange'));

export function seatMe(t, p) {
  if (state.me) state.me.who = null;
  state.me = getSlot(t, p);
  state.me.who = 'me';
  notify();
}

export function seatOther(t, p, name) {
  getSlot(t, p).who = name;
  notify();
}

export function swapRooms(a, b) {
  [a.room, b.room] = [b.room, a.room];
  notify();
}

// invite link se aaya ho to usi slot me baitho
const join = (params.get('join') || '1-1').split('-').map(Number);
seatMe(join[0] || 1, join[1] || 1);

// ?demo=1 se kuch nakli players baith jaate hain (exchange test karne ke liye)
if (params.get('demo')) {
  if (state.me.team === 1) { seatOther(1, 2, 'Ren'); seatOther(1, 3, 'Aoi'); }
  else seatOther(state.me.team, state.me.player === 4 ? 3 : 4, 'Ren');
  seatOther(2, 1, 'Kai');
}