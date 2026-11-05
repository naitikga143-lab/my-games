import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { Lobby } from './lobby.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist'); // `vite build` ka output
const PORT = process.env.PORT || 3000;          // Render PORT khud deta hai

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.aac': 'audio/aac', '.ogg': 'audio/ogg', '.wav': 'audio/wav',
  '.glb': 'model/gltf-binary', '.woff2': 'font/woff2', '.map': 'application/json',
};
const AUDIO = new Set(['.mp3', '.m4a', '.aac', '.ogg', '.wav']);

// Gaana: Range request (206) chahiye, warna iPhone Safari <audio> nahi chalata. 1 din cache.
function sendAudio(req, res, file, st) {
  const type = MIME[path.extname(file)] || 'application/octet-stream';
  const base = { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'public, max-age=86400' };
  const range = req.headers.range;
  let start = 0;
  let end = st.size - 1;
  if (range) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!m || (m[1] === '' && m[2] === '')) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); res.end(); return; }
    if (m[1] === '') { // "bytes=-500" => aakhri 500 bytes
      start = Math.max(0, st.size - parseInt(m[2], 10));
    } else {
      start = parseInt(m[1], 10);
      if (m[2] !== '') end = Math.min(parseInt(m[2], 10), st.size - 1);
    }
    if (start > end || start >= st.size) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); res.end(); return; }
    res.writeHead(206, { ...base, 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Content-Length': end - start + 1 });
  } else {
    res.writeHead(200, { ...base, 'Content-Length': st.size });
  }
  if (req.method === 'HEAD') { res.end(); return; }
  const stream = fs.createReadStream(file, { start, end });
  stream.on('error', () => res.destroy());
  stream.pipe(res);
}

function sendFile(req, res, file, st) {
  if (AUDIO.has(path.extname(file))) { sendAudio(req, res, file, st); return; }
  fs.readFile(file, (e, data) => {
    if (e) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(file);
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      // hashed assets cache ho sakte hain, index.html nahi
      'Cache-Control': file.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch { res.writeHead(400); res.end(); return; }

  if (pathname === '/healthz') { res.writeHead(200); res.end('ok'); return; }

  const file = path.join(DIST, pathname);
  if (file !== DIST && !file.startsWith(DIST + path.sep)) { res.writeHead(403); res.end(); return; }

  fs.stat(file, (err, st) => {
    if (!err && st.isFile()) { sendFile(req, res, file, st); return; }
    // invite link ?room=XXXX yahin aata hai
    const index = path.join(DIST, 'index.html');
    fs.stat(index, (e2, st2) => {
      if (e2 || !st2.isFile()) { res.writeHead(404); res.end('Not found'); return; }
      sendFile(req, res, index, st2);
    });
  });
});

const lobby = new Lobby();
const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 8 * 1024 });

wss.on('connection', (ws, req) => {
  const token = new URL(req.url, 'http://x').searchParams.get('token');
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });
  lobby.connect(ws, token);

  ws.on('message', (data) => {
    let msg;
    try { msg = JSON.parse(data.toString()); } catch { return; }
    if (msg && typeof msg === 'object') lobby.handle(ws.player, msg);
  });
  ws.on('close', () => lobby.disconnect(ws));
  ws.on('error', () => {});
});

// har 30s ping: mare hue connections hatao, aur Render ka proxy connection zinda rakho
setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.isAlive) { ws.terminate(); continue; }
    ws.isAlive = false;
    ws.ping();
  }
}, 30000).unref();

server.listen(PORT, () => console.log(`Creature Hunter server on :${PORT}`));