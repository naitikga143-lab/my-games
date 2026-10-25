const cfg = require('../config');

const lobbies = new Map();
let seq = 0;

const validCode = (c) => /^[a-z0-9]{4,12}$/.test(c);
const slotIndex = (team, player) => (team - 1) * cfg.PLAYERS + (player - 1);

function makeSlots() {
  const slots = [];
  for (let t = 1; t <= cfg.TEAMS; t++) {
    for (let p = 1; p <= cfg.PLAYERS; p++) {
      slots.push({ team: t, player: p, room: p, pid: null, name: null, token: null, at: 0, out: null });
    }
  }
  return slots;
}

function create(code) {
  const teams = {};
  for (let t = 1; t <= cfg.TEAMS; t++) teams[t] = { started: false, holder: null };
  const lobby = { code, slots: makeSlots(), searches: new Map(), teams, running: false, cleared: {}, roundOn: false };
  lobbies.set(code, lobby);
  return lobby;
}

function createNew() {
  let code;
  do code = Math.random().toString(36).slice(2, 8); while (code.length < 4 || lobbies.has(code));
  return create(code);
}

function getOrCreate(code) {
  if (!validCode(code)) return null;
  return lobbies.get(code) || create(code);
}

// har team ka START holder: team me sabse pehle baitha hua player
function fixHolders(lobby) {
  for (const t of Object.keys(lobby.teams)) {
    const team = lobby.teams[t];
    const seated = lobby.slots.filter((s) => s.team === Number(t) && s.token).sort((a, b) => a.at - b.at);
    if (!seated.find((s) => s.token === team.holder)) team.holder = seated[0] ? seated[0].token : null;
    if (!seated.length) team.started = false;
  }
  lobby.running = Object.values(lobby.teams).some((t) => t.started);
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
  s.pid = p.pid; s.name = p.name; s.token = p.token; s.at = ++seq; s.out = null;
  p.lobbyCode = lobby.code;
  p.slotIdx = idx;
  fixHolders(lobby);
}

function vacate(p) {
  const lobby = lobbies.get(p.lobbyCode);
  p.lobbyCode = null;
  const idx = p.slotIdx;
  p.slotIdx = -1;
  if (!lobby) return null;
  const s = lobby.slots[idx];
  if (s && s.token === p.token) { s.pid = null; s.name = null; s.token = null; }
  fixHolders(lobby);
  if (lobby.slots.every((x) => !x.token)) {
    for (const search of lobby.searches.values()) clearTimeout(search.timer);
    lobbies.delete(lobby.code);
  }
  return lobby;
}

function snapshot(lobby) {
  const searching = {};
  for (const [team, s] of lobby.searches) searching[team] = Math.max(0, s.endsAt - Date.now());
  const teams = {};
  for (const [t, v] of Object.entries(lobby.teams)) {
    const h = lobby.slots.find((s) => s.token && s.token === v.holder);
    teams[t] = { started: v.started, holder: h ? h.pid : null };
  }
  return {
    code: lobby.code,
    running: lobby.running,
    roundOn: lobby.roundOn,
    teams,
    cleared: lobby.cleared,
    slots: lobby.slots.map(({ team, player, room, pid, name, out }) => ({ team, player, room, pid, name, out })),
    searching,
  };
}

module.exports = {
  slotIndex, createNew, getOrCreate, emptyIn, emptyAny, seat, vacate, snapshot, fixHolders,
  get: (code) => lobbies.get(code),
  all: () => [...lobbies.values()],
};