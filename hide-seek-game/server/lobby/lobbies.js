const cfg = require('../config');

const lobbies = new Map();

const validCode = (c) => /^[a-z0-9]{4,12}$/.test(c);
const slotIndex = (team, player) => (team - 1) * cfg.PLAYERS + (player - 1);

function makeSlots() {
  const slots = [];
  for (let t = 1; t <= cfg.TEAMS; t++) {
    for (let p = 1; p <= cfg.PLAYERS; p++) {
      slots.push({ team: t, player: p, room: p, pid: null, name: null, token: null });
    }
  }
  return slots;
}

function create(code) {
  const lobby = { code, slots: makeSlots(), searches: new Map() };
  lobbies.set(code, lobby);
  return lobby;
}

function createNew() {
  let code;
  do code = Math.random().toString(36).slice(2, 8); while (code.length < 4 || lobbies.has(code));
  return create(code);
}

// invite link purana ho (server restart) to usi code se nayi lobby ban jaati hai
function getOrCreate(code) {
  if (!validCode(code)) return null;
  return lobbies.get(code) || create(code);
}

function emptyIn(lobby, team) {
  const out = [];
  lobby.slots.forEach((s, i) => { if (s.team === team && !s.token) out.push(i); });
  return out;
}

function emptyAny(lobby) {
  const out = [];
  lobby.slots.forEach((s, i) => { if (!s.token) out.push(i); });
  return out;
}

function seat(lobby, p, idx) {
  const s = lobby.slots[idx];
  s.pid = p.pid; s.name = p.name; s.token = p.token;
  p.lobbyCode = lobby.code;
  p.slotIdx = idx;
}

function vacate(p) {
  const lobby = lobbies.get(p.lobbyCode);
  p.lobbyCode = null;
  const idx = p.slotIdx;
  p.slotIdx = -1;
  if (!lobby) return null;
  const s = lobby.slots[idx];
  if (s && s.token === p.token) { s.pid = null; s.name = null; s.token = null; }
  if (lobby.slots.every((x) => !x.token)) {
    for (const search of lobby.searches.values()) clearTimeout(search.timer);
    lobbies.delete(lobby.code);
  }
  return lobby;
}

function snapshot(lobby) {
  const searching = {};
  for (const [team, s] of lobby.searches) searching[team] = Math.max(0, s.endsAt - Date.now());
  return {
    code: lobby.code,
    slots: lobby.slots.map(({ team, player, room, pid, name }) => ({ team, player, room, pid, name })),
    searching,
  };
}

module.exports = {
  slotIndex, createNew, getOrCreate, emptyIn, emptyAny, seat, vacate, snapshot,
  get: (code) => lobbies.get(code),
  all: () => [...lobbies.values()],
};