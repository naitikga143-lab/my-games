const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const config = require('./config');
const service = require('./lobby/service');
const game = require('./game/rooms');
const wire = require('./lobby/events');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: true }, maxHttpBufferSize: 1e5 });
service.init(io);
game.init(io);

app.get('/health', (_req, res) => res.send('ok'));
app.use(express.static(path.join(__dirname, '../client/dist')));

io.on('connection', (socket) => {
  // har socket ke liye rate limit (spam/flood se bachav)
  let tokens = 150, last = Date.now();
  socket.use((_pkt, next) => {
    const n = Date.now();
    tokens = Math.min(150, tokens + ((n - last) / 1000) * 90);
    last = n;
    if (tokens < 1) return next(new Error('rate limit'));
    tokens -= 1;
    next();
  });
  wire(socket);
});

server.listen(config.PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${config.PORT}`);
});