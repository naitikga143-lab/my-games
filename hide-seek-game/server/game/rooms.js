const { Worker } = require('worker_threads');
const path = require('path');
const cfg = require('../config');
const players = require('../lobby/players');
const L = require('../lobby/lobbies');
const S = require('../lobby/service');
const start = require('../lobby/start');

const WORKER = path.join(__dirname, '../../client/src/sim/worker.js');
const rooms = new Map();
let io;

const num = (v, d = 0) => (Number.isFinite(+v) ? +v : d);

// token bucket: p.rl[kind] = { t, n }
function allow(p, kind, perSec, burst) {
  const now = Date.now();
  p.rl = p.rl || {};
  const b = p.rl[kind] || (p.rl[kind] = { t: now, n: burst });
  b.n = Math.min(burst, b.n + ((now - b.t) / 1000) * perSec);
  b.t = now;
  if (b.n < 1) return false;
  b.n -= 1;
  return true;
}

function open(key, game) {
  const worker = new Worker(WORKER, {
    workerData: {
      room: game.room,
      total: cfg.ROOM_BOTS[game.room],
      respawn: cfg.RESPAWN,
      respawnMs: cfg.RESPAWN_SECONDS * 1000,
    },
  });
  const R = { key, code: game.code, room: game.room, worker, members: new Map(), closeT: null };
  worker.on('message', (m) => onMsg(R, m));
  worker.on('error', (e) => { console.error('[sim]', key, e); rooms.delete(key); });
  worker.on('exit', () => { if (rooms.get(key) === R) rooms.delete(key); });
  rooms.set(key, R);
  return R;
}

function humanDied(R, pid) {
  const p = R.members.get(pid);
  const lobby = L.get(R.code);
  const s = p && lobby && lobby.slots[p.slotIdx];
  if (s) S.feed(lobby, `Team ${s.team} Player ${s.player} killed`);
}

function roomClear(R, d) {
  const lobby = L.get(R.code);
  if (!lobby) return;
  lobby.cleared[R.room] = true;
  io.to(R.key).emit('g:clear', { room: R.room, team: d.team });
  S.feed(lobby, `Room ${R.room} clear!`);
  // jis team ne start nahi dabaya, uske is room wale player auto killed
  for (const slot of lobby.slots) {
    if (slot.room === R.room && slot.token && !lobby.teams[slot.team].started) start.autoKill(lobby, slot);
  }
  S.state(lobby);
}

function onMsg(R, m) {
  const to = (ev) => {
    const p = R.members.get(m.d.pid);
    if (p && p.sid) io.to(p.sid).emit(ev, m.d);
  };
  switch (m.t) {
    case 'snap': io.to(R.key).volatile.emit('g:snap', m.d); break;
    case 'tr': io.to(R.key).emit('g:tr', m.d); break;
    case 'kill':
      io.to(R.key).emit('g:kill', m.d);
      if (m.d.vpid) humanDied(R, m.d.vpid);
      break;
    case 'dmg': to('g:dmg'); break;
    case 'me': to('g:me'); break;
    case 'respawn': to('g:respawn'); break;
    case 'corr': to('g:corr'); break;
    case 'msg': to('g:msg'); break;
    case 'clear': roomClear(R, m.d); break;
    default: break;
  }
}

function join(p) {
  if (p.game.room !== 1) return false;               // baaki rooms abhi temporary hain
  const key = `g:${p.game.code}:${p.game.room}`;
  const R = rooms.get(key) || open(key, p.game);
  clearTimeout(R.closeT);
  R.members.set(p.pid, p);
  p.gameKey = key;
  const sock = p.sid && io.sockets.sockets.get(p.sid);
  if (sock) sock.join(key);
  R.worker.postMessage({ t: 'join', pid: p.pid, name: p.name, team: p.game.team });
  return true;
}

function drop(p) {
  const key = p.gameKey;
  if (!key) return;
  p.gameKey = null;
  const sock = p.sid && io.sockets.sockets.get(p.sid);
  if (sock) sock.leave(key);
  io.to(key).emit('g:left', { pid: p.pid });
  const R = rooms.get(key);
  if (!R) return;
  R.members.delete(p.pid);
  R.worker.postMessage({ t: 'leave', pid: p.pid });
  if (!R.members.size) {
    R.closeT = setTimeout(() => {
      if (R.members.size) return;
      R.worker.terminate();
      rooms.delete(key);
    }, 15000);
  }
}

exports.init = (i) => { io = i; };
exports.drop = drop;
exports.end = (p) => { drop(p); p.game = null; };

exports.register = (socket) => {
  const me = () => players.bySid(socket.id);
  const ok = (cb, d) => typeof cb === 'function' && cb(d);
  const roomOf = (p) => p && p.gameKey && rooms.get(p.gameKey);

  socket.on('g:join', (_d, cb) => {
    const p = me();
    if (!p || !p.game) return ok(cb, { error: 'Tum game me nahi ho' });
    join(p);
    ok(cb, { ok: true });
  });

  socket.on('g:state', (d) => {
    const p = me();
    const R = roomOf(p);
    if (!R || !d || !allow(p, 'st', 40, 10)) return;
    R.worker.postMessage({
      t: 'state', pid: p.pid,
      x: num(d.x), y: num(d.y), z: num(d.z), yaw: num(d.yaw), pitch: num(d.pitch),
      c: d.c ? 1 : 0, r: d.r ? 1 : 0, w: num(d.w) | 0, l: num(d.l),
    });
  });

  socket.on('g:shoot', (d) => {
    const p = me();
    const R = roomOf(p);
    if (!R || !d || !allow(p, 'sh', 25, 8)) return;
    R.worker.postMessage({ t: 'shoot', pid: p.pid, o: d.o, d: d.d, w: num(d.w) | 0 });
  });

  socket.on('g:buy', (d, cb) => {
    const p = me();
    const R = roomOf(p);
    if (!R || !allow(p, 'buy', 4, 4)) return ok(cb, { error: 'Dheere' });
    R.worker.postMessage({ t: 'buy', pid: p.pid, i: num(d && d.i) | 0 });
    ok(cb, { ok: true });
  });

  socket.on('g:buyscope', (d, cb) => {
    const p = me();
    const R = roomOf(p);
    if (!R || !allow(p, 'buy', 4, 4)) return ok(cb, { error: 'Dheere' });
    R.worker.postMessage({ t: 'buyscope', pid: p.pid, i: num(d && d.i) | 0 });
    ok(cb, { ok: true });
  });
};