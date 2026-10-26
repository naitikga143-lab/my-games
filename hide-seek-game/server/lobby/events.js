const cfg = require('../config');
const players = require('./players');
const L = require('./lobbies');
const S = require('./service');
const match = require('./match');
const exchange = require('./exchange');
const start = require('./start');
const game = require('../game/rooms');

function leave(p) {
  exchange.dropFor(p);
  match.cancelPool(p);
  game.end(p);
  if (p.lobbyCode) S.unseat(p);
}

function fullRemove(p) {
  leave(p);
  players.remove(p);
}

module.exports = function wire(socket) {
  const me = () => players.bySid(socket.id);
  const reply = (cb, d) => typeof cb === 'function' && cb(d);
  const need = (cb) => {
    const p = me();
    if (!p) reply(cb, { error: 'Pehle username do' });
    return p;
  };

  socket.on('player:register', (d, cb) => {
    const p = me();
    const r = players.checkName(d && d.name, p && p.token);
    if (r.error) return reply(cb, r);
    if (p && p.lobbyCode && r.name !== p.name) return reply(cb, { error: 'Pehle lobby chhodo' });
    let player = p;
    if (!player) player = players.create(socket.id, r.name);
    else if (r.name !== player.name) players.rename(player, r.name);
    reply(cb, { ok: true, token: player.token, name: player.name });
  });

  socket.on('session:resume', (d, cb) => {
    const p = players.get(d && d.token);
    if (!p) return reply(cb, { ok: false });
    clearTimeout(p.timer);
    p.timer = null;
    players.attach(p, socket.id);
    if (p.gameKey) socket.join(p.gameKey);
    reply(cb, { ok: true, name: p.name });
    const lobby = p.lobbyCode && L.get(p.lobbyCode);
    if (lobby) {
      socket.join(lobby.code);
      socket.emit('lobby:joined', { pid: p.pid, snap: L.snapshot(lobby) });
    }
    if (p.game) socket.emit('game:enter', { ...p.game, pid: p.pid, name: p.name });
  });

  socket.on('lobby:start', (_d, cb) => {
    const p = need(cb);
    if (!p) return;
    if (p.lobbyCode) return reply(cb, { ok: true });
    match.cancelPool(p);
    S.seat(p, L.createNew(), 0);
    reply(cb, { ok: true });
  });

  socket.on('lobby:join', (d, cb) => {
    const p = need(cb);
    if (!p) return;
    if (p.lobbyCode) return reply(cb, { ok: true });
    d = d || {};
    const lobby = L.getOrCreate(String(d.code || '').toLowerCase());
    if (!lobby) return reply(cb, { error: 'Invite link sahi nahi hai' });

    const team = Math.min(cfg.TEAMS, Math.max(1, Number(d.team) | 0));
    const wanted = L.slotIndex(team, Math.min(cfg.PLAYERS, Math.max(1, Number(d.player) | 0)));
    let idx = !lobby.slots[wanted].token ? wanted : -1;
    if (idx < 0) idx = L.emptyIn(lobby, team)[0] ?? L.emptyAny(lobby)[0] ?? -1;
    if (idx < 0) return reply(cb, { error: 'Lobby full hai' });

    match.cancelPool(p);
    S.seat(p, lobby, idx);
    reply(cb, { ok: true });
  });

  socket.on('lobby:leave', (_d, cb) => {
    const p = need(cb);
    if (!p) return;
    leave(p);
    reply(cb, { ok: true });
  });

  socket.on('match:enter', (_d, cb) => {
    const p = need(cb);
    if (p) reply(cb, match.enter(p));
  });

  socket.on('match:cancel', (_d, cb) => {
    const p = need(cb);
    if (!p) return;
    match.cancelPool(p);
    reply(cb, { ok: true });
  });

  socket.on('match:team', (d, cb) => {
    const p = need(cb);
    if (!p) return;
    const lobby = L.get(p.lobbyCode);
    const team = Number(d && d.team);
    if (!lobby || !(team >= 1 && team <= cfg.TEAMS)) return reply(cb, { error: 'Pehle lobby me aao' });
    reply(cb, match.startSearch(lobby, team));
  });

  socket.on('team:start', (_d, cb) => {
    const p = need(cb);
    if (p) reply(cb, start.startTeam(p));
  });

  socket.on('team:transfer', (d, cb) => {
    const p = need(cb);
    if (p) reply(cb, start.transfer(p, d && d.toPid));
  });

  exchange.register(socket);
  game.register(socket);

  socket.on('disconnect', () => {
    const p = me();
    if (!p) return;
    players.detach(p);
    if (p.pool) match.cancelPool(p);
    p.timer = setTimeout(() => fullRemove(p), cfg.GRACE_SECONDS * 1000);
  });
};