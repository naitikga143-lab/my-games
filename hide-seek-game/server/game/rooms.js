const players = require('../lobby/players');

// damage server ke paas hai, client sirf "kisko maara, head ya body" batata hai
const W = [{ delay: 0.3, body: 25, head: 70 }, { delay: 0.09, body: 12, head: 36 }];
let io;

const num = (v) => (Number.isFinite(+v) ? +v : 0);
const keyOf = (p) => (p.game ? `g:${p.game.code}:${p.game.room}` : null);
const brief = (p) => ({ pid: p.pid, name: p.name, team: p.game.team });
const members = (key) =>
  [...(io.sockets.adapter.rooms.get(key) || [])].map((id) => players.bySid(id)).filter((p) => p && p.game);

exports.init = (i) => { io = i; };

exports.drop = (p) => {
  if (!p.gameKey) return;
  io.to(p.gameKey).emit('g:left', { pid: p.pid });
  const sock = p.sid && io.sockets.sockets.get(p.sid);
  if (sock) sock.leave(p.gameKey);
  p.gameKey = null;
};

exports.end = (p) => { exports.drop(p); p.game = null; };

exports.register = (socket) => {
  const me = () => players.bySid(socket.id);
  const ok = (cb, d) => typeof cb === 'function' && cb(d);

  socket.on('g:join', (_d, cb) => {
    const p = me();
    const key = p && keyOf(p);
    if (!key) return ok(cb, { error: 'Tum game me nahi ho' });
    socket.join(key);
    p.gameKey = key;
    socket.emit('g:roster', members(key).filter((o) => o !== p).map(brief));
    socket.to(key).emit('g:joined', brief(p));
    ok(cb, { ok: true });
  });

  socket.on('g:state', (d) => {
    const p = me();
    if (!p || !p.gameKey || !d) return;
    socket.to(p.gameKey).volatile.emit('g:state', {
      pid: p.pid, x: num(d.x), y: num(d.y), z: num(d.z), yaw: num(d.yaw), pitch: num(d.pitch),
      c: d.c ? 1 : 0, r: d.r ? 1 : 0, w: d.w === 1 ? 1 : 0, l: num(d.l), hp: num(d.hp), a: d.a ? 1 : 0,
    });
  });

  socket.on('g:shot', (d) => {
    const p = me();
    if (p && p.gameKey) socket.to(p.gameKey).emit('g:shot', { pid: p.pid, w: d && d.w === 1 ? 1 : 0 });
  });

  socket.on('g:hit', (d) => {
    const p = me();
    if (!p || !p.gameKey || !d) return;
    const victim = members(p.gameKey).find((o) => o.pid === d.victim);
    if (!victim || victim === p || victim.game.team === p.game.team) return;   // team-kill band
    const w = W[d.w === 1 ? 1 : 0];
    const now = Date.now();
    if (now - (p.lastHit || 0) < w.delay * 700) return;                          // bahut tez fire = ignore
    p.lastHit = now;
    io.to(victim.sid).emit('g:damage', { from: p.pid, dmg: d.head ? w.head : w.body, head: !!d.head });
  });

  socket.on('g:dead', (d) => {
    const p = me();
    if (!p || !p.gameKey) return;
    io.to(p.gameKey).emit('g:kill', {
      victim: p.pid, killer: d && d.killer ? String(d.killer) : null,
      killerName: String((d && d.killerName) || '').slice(0, 16), head: !!(d && d.head),
    });
  });
};