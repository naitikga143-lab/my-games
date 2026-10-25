const cfg = require('../config');
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
  if (lobby.roundOn) return { error: 'Round chal raha hai' };
  const slot = lobby.slots[p.slotIdx];
  const team = lobby.teams[slot.team];
  if (team.started) return { error: 'Team pehle se READY hai' };
  if (team.holder !== p.token) return { error: 'START button abhi tumhare paas nahi hai' };

  const filled = Object.keys(lobby.teams).filter((t) => lobby.slots.some((s) => s.team === Number(t) && s.token));
  if (filled.length < cfg.TEAMS) return { error: 'Opponent team me kam se kam 1 player chahiye' };

  team.started = true;
  if (Object.values(lobby.teams).every((t) => t.started)) {
    lobby.roundOn = true;
    lobby.slots.filter((s) => s.token).forEach((s) => enter(lobby, s));
  }
  lobby.running = true;
  S.state(lobby);
  return { ok: true, waiting: !lobby.roundOn };
}

function transfer(p, toPid) {
  const lobby = L.get(p.lobbyCode);
  if (!lobby) return { error: 'Pehle lobby me aao' };
  const mine = lobby.slots[p.slotIdx];
  const team = lobby.teams[mine.team];
  if (team.holder !== p.token) return { error: 'START button tumhare paas nahi hai' };
  if (team.started) return { error: 'Team READY ho chuki hai' };
  const to = lobby.slots.find((s) => s.pid === toPid && s.token && s.team === mine.team);
  if (!to) return { error: 'Sirf apni team ke player ko de sakte ho' };
  team.holder = to.token;
  S.state(lobby);
  return { ok: true };
}

module.exports = { enter, startTeam, transfer };