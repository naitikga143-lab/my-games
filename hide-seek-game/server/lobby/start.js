const L = require('./lobbies');
const S = require('./service');
const players = require('./players');

function enter(lobby, slot) {
  const p = players.get(slot.token);
  if (!p) return;
  p.game = { code: lobby.code, room: slot.room, team: slot.team };
  S.to(p.sid, 'game:enter', { ...p.game, pid: p.pid, name: p.name });
}

function startTeam(p) {
  const lobby = L.get(p.lobbyCode);
  if (!lobby) return { error: 'Pehle lobby me aao' };
  const slot = lobby.slots[p.slotIdx];
  const team = lobby.teams[slot.team];
  if (team.started) return { error: 'Team pehle se start ho chuki hai' };
  if (team.holder !== p.token) return { error: 'START button abhi tumhare paas nahi hai' };
  team.started = true;
  lobby.running = true;
  lobby.slots.filter((s) => s.team === slot.team && s.token).forEach((s) => enter(lobby, s));
  S.state(lobby);
  return { ok: true };
}

function transfer(p, toPid) {
  const lobby = L.get(p.lobbyCode);
  if (!lobby) return { error: 'Pehle lobby me aao' };
  const mine = lobby.slots[p.slotIdx];
  const team = lobby.teams[mine.team];
  if (team.holder !== p.token) return { error: 'START button tumhare paas nahi hai' };
  if (team.started) return { error: 'Team start ho chuki hai' };
  const to = lobby.slots.find((s) => s.pid === toPid && s.token && s.team === mine.team);
  if (!to) return { error: 'Sirf apni team ke player ko de sakte ho' };
  team.holder = to.token;
  S.state(lobby);
  return { ok: true };
}

module.exports = { enter, startTeam, transfer };