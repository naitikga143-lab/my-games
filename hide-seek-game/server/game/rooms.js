const { Worker } = require('worker_threads');
const path = require('path');
const cfg = require('../config');
const players = require('../lobby/players');
const L = require('../lobby/lobbies');
const S = require('../lobby/service');

const WORKER = path.join(__dirname, '../../client/src/sim/worker.js');
const rooms = new Map();
const rounds = new Map();   // lobby code -> { list: [scores] }
let io;

const num = (v, d = 0) => (Number.isFinite(+v) ? +v : d);

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

// ---------- round khatam hone ka hisaab ----------
function maybeFinalize(code) {
  const open = [...rooms.values()].filter((r) => r.code === code);
  if (open.some((r) => !r.ended)) return;
  const rd = rounds.get(code);
  if (!rd) return;
  rounds.delete(code);

  const rank = rd.list
    .sort((a, b) => (b.kills - a.kills) || (b.hs - a.hs))
    .map((s, i) => ({ ...s, pos: i + 1 }));
  const payload = { rank: rank.slice(0, 8), top: rank.slice(0, 4).map((s) => s.pid) };

  for (const r of open) {
    io.to(r.key).emit('g:round', payload);
    for (const p of r.members.values()) p.game = null;
  }
  const lobby = L.get(code);
  if (lobby) {
    lobby.roundOn = false;
    lobby.running = false;
    for (const t of Object.values(lobby.teams)) t.started = false;
    S.state(lobby);
  }
  setTimeout(() => {
    for (const r of open) { rooms.delete(r.key); r.worker.terminate(); }
  }, 4000);
}

function roomEnded(R, d) {
  if (R.ended) return;
  R.ended = true;
  const rd = rounds.get(R.code) || { list: [] };
  rounds.set(R.code, rd);
  rd.list.push(...(d.scores || []));
  io.to(R.key).emit('g:roomdone', { reason: d.reason, room: R.room });
  maybeFinalize(R.code);
}

function dropRoom(R) {
  clearTimeout(R.closeT);
  if (rooms.get(R.key) !== R) return;
  rooms.delete(R.key);
  if (!R.ended) maybeFinalize(R.code);
}

// ---------- worker ----------
function onMsg(R, m) {
  const toP = (ev) => {
    const p = R.members.get(m.d.pid);
    if (p && p.sid) io.to(p.sid).emit(ev, m.d);
  };
  switch (m.t) {
    case 'snap': io.to(R.key).volatile.emit('g:snap', m.d); break;
    case 'tr': io.to(R.key).emit('g:tr', m.d); break;
    case 'fw': io.to(R.key).emit('g:fw', m.d); break;
    case 'kill': io.to(R.key).emit('g:kill', m.d); break;
    case 'dmg': toP('g:dmg'); break;
    case 'me': toP('g:me'); break;
    case 'fx': toP('g:fx'); break;
    case 'respawn': toP('g:respawn'); break;
    case 'corr': toP('g:corr'); break;
    case 'msg': toP('g:msg'); break;
    case 'end': roomEnded(R, m.d); break;
    default: break;
  }
}

function startWorker(R) {
  const worker = new Worker(WORKER, {
    workerData: {
      room: R.room,
      total: cfg.ROOM_CREATURES[R.room],
      active: cfg.ROOM_ACTIVE[R.room],
      respawn: cfg.RESPAWN,
      respawnMs: cfg.RESPAWN_SECONDS * 1000,
      grace: cfg.GRACE_START,
      roundSec: cfg.ROUND_SECONDS,
    },
  });
  R.worker = worker;
  worker.on('message', (m) => { if (R.worker === worker) onMsg(R, m); });
  worker.on('error', (e) => {
    console.error('[sim]', R.key, e);
    if (R.worker !== worker) return;
    if (++R.crashes > 5 || !R.members.size) { dropRoom(R); return; }
    startWorker(R);                                   // crash ke baad naya worker
    for (const p of R.members.values()) {
      R.worker.postMessage({ t: 'join', pid: p.pid, name: p.name, team: p.game.team });
    }
  });
  worker.on('exit', () => { if (R.worker === worker) dropRoom(R); });
}

function open(key, game) {
  const R = { key, code: game.code, room: game.room, worker: null, members: new Map(), closeT: null, crashes: 0, ended: false };
  startWorker(R);
  rooms.set(key, R);
  return R;
}

function join(p) {
  const key = `g:${p.game.code}:${p.game.room}`;
  const R = rooms.get(key) || open(key, p.game);
  clearTimeout(R.closeT);
  R.members.set(p.pid, p);
  p.gameKey = key;
  const sock = p.sid && io.sockets.sockets.get(p.sid);
  if (sock) sock.join(key);
  R.worker.postMessage({ t: 'join', pid: p.pid, name: p.name, team: p.game.team });
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
      dropRoom(R);
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