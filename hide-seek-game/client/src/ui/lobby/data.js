export const ROOMS = [
  { n: 1, bots: 16 }, { n: 2, bots: 18 }, { n: 3, bots: 20 }, { n: 4, bots: 24 },
];
export const TEAMS = 4;
export const PLAYERS = 4;

export const state = { snap: null, pid: null, endsAt: {} };

export const mySlot = () => state.snap?.slots.find((s) => s.pid === state.pid) || null;
export const getSlot = (t, p) => state.snap.slots[(t - 1) * PLAYERS + (p - 1)];

export function setSnap(snap) {
  state.snap = snap;
  state.endsAt = {};
  for (const [t, left] of Object.entries(snap.searching || {})) state.endsAt[t] = Date.now() + left;
  dispatchEvent(new Event('lobbychange'));
}