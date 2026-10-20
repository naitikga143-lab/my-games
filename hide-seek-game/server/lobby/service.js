const L = require('./lobbies');

let io;

exports.init = (i) => { io = i; };
exports.to = (target, ev, data) => { if (target) io.to(target).emit(ev, data); };
exports.state = (lobby) => io.to(lobby.code).emit('lobby:state', L.snapshot(lobby));

exports.seat = (p, lobby, idx) => {
  L.seat(lobby, p, idx);
  const sock = p.sid && io.sockets.sockets.get(p.sid);
  if (sock) {
    sock.join(lobby.code);
    sock.emit('lobby:joined', { pid: p.pid, snap: L.snapshot(lobby) });
  }
  exports.state(lobby);
};

exports.unseat = (p) => {
  const code = p.lobbyCode;
  const sock = p.sid && io.sockets.sockets.get(p.sid);
  if (sock && code) sock.leave(code);
  const lobby = L.vacate(p);
  if (lobby && L.get(lobby.code)) exports.state(lobby);
};