const cfg = require('../config');
const players = require('./players');
const L = require('./lobbies');
const S = require('./service');

const pending = new Map();
let seq = 0;

function settle(id, accepted, message) {
  const e = pending.get(id);
  if (!e) return;
  clearTimeout(e.timer);
  pending.delete(id);

  if (accepted) {
    const lobby = L.get(e.from.lobbyCode);
    if (lobby && e.to.lobbyCode === e.from.lobbyCode) {
      const a = lobby.slots[e.from.slotIdx], b = lobby.slots[e.to.slotIdx];
      [a.room, b.room] = [b.room, a.room];
      S.state(lobby);
    } else {
      accepted = false;
      message = 'Lobby badal gayi, exchange nahi hua';
    }
  }
  S.to(e.from.sid, 'exchange:result', { id, accepted, message });
}

function dropFor(p) {
  for (const [id, e] of [...pending]) {
    if (e.from === p || e.to === p) settle(id, false, 'Player lobby chhod gaya');
  }
}

function register(socket) {
  const me = () => players.bySid(socket.id);
  const reply = (cb, d) => typeof cb === 'function' && cb(d);

  socket.on('exchange:request', (d, cb) => {
    const p = me();
    const lobby = p && L.get(p.lobbyCode);
    if (!lobby) return reply(cb, { error: 'Pehle lobby me aao' });
    const mine = lobby.slots[p.slotIdx];
    const slot = lobby.slots.find((s) => s.pid === (d && d.toPid) && s.token);
    if (!slot || slot.team !== mine.team || slot.token === p.token) {
      return reply(cb, { error: 'Exchange sirf apni team ke player se ho sakta hai' });
    }
    for (const e of pending.values()) {
      if (e.from === p) return reply(cb, { error: 'Pehli request ka jawab abhi baaki hai' });
    }
    const target = players.get(slot.token);
    if (!target || !target.sid) return reply(cb, { error: 'Wo player abhi online nahi hai' });

    const id = ++seq;
    const timer = setTimeout(() => settle(id, false, 'Jawab nahi aaya, room nahi badla'), cfg.EXCHANGE_SECONDS * 1000);
    pending.set(id, { from: p, to: target, timer });
    S.to(target.sid, 'exchange:incoming', {
      id, fromName: p.name, fromRoom: mine.room, toRoom: slot.room,
    });
    reply(cb, { ok: true });
  });

  socket.on('exchange:respond', (d, cb) => {
    const p = me();
    const e = d && pending.get(d.id);
    if (!p || !e || e.to !== p) return reply(cb, { error: 'Request ab valid nahi hai' });
    settle(d.id, !!d.accept, d.accept ? 'Room exchange ho gaya' : `${p.name} ne request accept nahi ki`);
    reply(cb, { ok: true });
  });
}

module.exports = { register, dropFor };