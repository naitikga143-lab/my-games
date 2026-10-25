export const ROOMS = [
  { n: 1, c: 40, a: 4 }, { n: 2, c: 50, a: 6 }, { n: 3, c: 60, a: 8 }, { n: 4, c: 80, a: 10 },
];
export const TEAMS = 2;
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