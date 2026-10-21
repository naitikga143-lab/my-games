const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const config = require('./config');
const service = require('./lobby/service');
const game = require('./game/rooms')
const wire = require('./lobby/events');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: true } });
service.init(io);
game.init(io);

app.get('/health', (_req, res) => res.send('ok'));   // UptimeRobot isi ko ping karega
app.use(express.static(path.join(__dirname, '../client/dist')));

io.on('connection', (socket) => wire(socket));

server.listen(config.PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${config.PORT}`);
});