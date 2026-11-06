import { randomBytes, randomInt } from 'node:crypto';
import { Match, RULES } from './match.js';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 0/O, 1/I jaise confusing akshar nahi
const NAMES = { red: 'Red', blue: 'Blue' };
const other = (c) => (c === 'red' ? 'blue' : 'red');
const STATE_KEYS = ['x', 'y', 'z', 'f', 'cy', 'ax', 'ay', 'az', 'vy', 'hs'];
const AMMO = new Set(['ready', 'empty', 'reload']);
const SEEK_MS = 60 * 1000; // "Enter Match" par kitni der intezar

// Dono clients ko same trees dene ke liye server hi params deta hai
// (mobile/desktop ka alag treeCount ab nahi chalega).
const TREE_PARAMS = { count: 12, nearCount: 3, area: 85, minDist: 26, clearRadius: 9 };

function send(p, obj) {
  const ws = p && p.ws;
  if (ws && ws.readyState === 1) ws.send(JSON.stringify(obj));
}

export class Lobby {
  constructor() {
    this.sessions = new Map(); // token -> player
    this.rooms = new Map();    // code -> room
    this.queue = [];           // match dhoondhne wale rooms ke codes
    this.seekers = [];         // "Enter Match" wale players (room ke bina, 60s tak intezar)
    const t = setInterval(() => this.tick(), 250);
    if (t.unref) t.unref();
  }

  /* ---------- connection ---------- */
  connect(ws, token) {
    let p = token ? this.sessions.get(token) : null;
    if (p && p.ws && p.ws !== ws) { try { p.ws.close(); } catch { /* ignore */ } }
    if (!p) {
      p = {
        id: randomBytes(4).toString('hex'), token: randomBytes(16).toString('hex'),
        ws: null, room: null, color: null, dropAt: null, lastState: 0,
      };
      this.sessions.set(p.token, p);
    }
    p.ws = ws;
    ws.player = p;
    send(p, { t: 'welcome', id: p.id, token: p.token });

    if (p.room) {
      const room = p.room;
      if (room.match && !room.match.ended) {
        p.dropAt = null;
        send(p, { ...this._startPayload(room, p.color), t: 'resume', snap: room.match.snapshot() });
        send(room.players[other(p.color)], { t: 'oppStatus', connected: true });
      } else {
        this._pushRoom(room);
      }
    }
    return p;
  }

  disconnect(ws) {
    const p = ws.player;
    if (!p || p.ws !== ws) return; // purana socket (naya tab/reconnect aa chuka)
    p.ws = null;
    this._unseek(p);
    const room = p.room;
    if (room && room.match && !room.match.ended) {
      p.dropAt = Date.now() + RULES.RECONNECT_GRACE_S * 1000;
      send(room.players[other(p.color)], { t: 'oppStatus', connected: false });
    } else {
      this.leave(p);
      this.sessions.delete(p.token);
    }
  }

  /* ---------- messages ---------- */
  handle(p, msg) {
    if (!p || !msg || typeof msg.t !== 'string') return;
    switch (msg.t) {
      case 'create': return this.create(p);
      case 'join': return typeof msg.code === 'string' ? this.join(p, msg.code) : undefined;
      case 'queue': return this.queueUp(p);
      case 'start': return this.startRoom(p);
      case 'seek': return this.seek(p);
      case 'unseek': return this._unseek(p);
      case 'unqueue': return this.unqueue(p);
      case 'leave': return this.leave(p);
      case 'kill': return this._kill(p, msg);
      case 'died': return this._died(p);
      case 'pstate': return this._relayState(p, msg);
      default: return undefined;
    }
  }

  // Host (Red) "START" dabata hai: dono hon to turant, akele ho to (sirf ALLOW_SOLO par) solo match
  startRoom(p) {
    const room = p.room;
    if (!room || p.color !== 'red' || room.match || room.countdown) return;
    const both = !!(room.players.red && room.players.blue);
    if (!both && !RULES.ALLOW_SOLO) return;
    room.solo = !both;
    this._unqueueRoom(room);
    this._startCountdown(room);
  }

  create(p) {
    this._unseek(p);
    if (p.room) this.leave(p);
    let code;
    do {
      code = Array.from({ length: 5 }, () => CODE_CHARS[randomInt(CODE_CHARS.length)]).join('');
    } while (this.rooms.has(code));
    const room = { code, players: { red: p, blue: null }, queued: false, match: null, countdown: null };
    this.rooms.set(code, room);
    p.room = room;
    p.color = 'red';
    this._pushRoom(room);
  }

  join(p, rawCode) {
    const code = rawCode.trim().toUpperCase().slice(0, 8);
    const room = this.rooms.get(code);
    if (!room) return send(p, { t: 'error', code: 'room_not_found' });
    if (p.room === room) return this._pushRoom(room);
    if (room.match || room.countdown) return send(p, { t: 'error', code: 'room_started' });
    if (room.players.blue) return send(p, { t: 'error', code: 'room_full' });

    this._unseek(p);
    if (p.room) this.leave(p);
    this._unqueueRoom(room);
    room.players.blue = p;
    p.room = room;
    p.color = 'blue';
    this._pushRoom(room);
    this._startCountdown(room);
  }

  // "Match opponent": koi aur wait kar raha ho to uske room mein, warna queue mein
  queueUp(p) {
    const room = p.room;
    if (!room || room.players.blue || room.match) return;
    // pehle "Enter Match" par intezar karte player ko uthao
    const seeker = this.seekers.find((x) => x.ws && x.ws.readyState === 1);
    if (seeker) { this._unseek(seeker); this.join(seeker, room.code); return; }
    const waitingCode = this.queue.find((c) => c !== room.code && this.rooms.has(c));
    if (waitingCode) {
      this.leave(p); // apna khaali room hata do
      this.join(p, waitingCode);
      return;
    }
    if (!room.queued) { room.queued = true; this.queue.push(room.code); }
    this._pushRoom(room);
  }

  // "Enter Match":
  //  1) koi lobby opponent maang rahi ho to seedha wahan
  //  2) koi aur bhi "Enter Match" par ruka ho to dono ka auto lobby (pehle wala Red, naya Blue)
  //  3) warna 60s intezar
  seek(p) {
    if (p.room && p.room.match && !p.room.match.ended) return;
    if (p.room) this.leave(p);
    this._unseek(p);

    const waitingCode = this.queue.find((c) => {
      const r = this.rooms.get(c);
      return r && !r.players.blue && !r.match;
    });
    if (waitingCode) { this.join(p, waitingCode); return; }

    const now = Date.now();
    const mate = this.seekers.find((x) => x !== p && x.ws && x.ws.readyState === 1 && x.seekUntil > now);
    if (mate) {
      this._unseek(mate);
      this.create(mate);             // pehle intezar karne wala Red (host)
      this.join(p, mate.room.code);  // naya aane wala Blue => countdown apne aap shuru
      return;
    }

    p.seekUntil = Date.now() + SEEK_MS;
    this.seekers.push(p);
    send(p, { t: 'seeking', ms: SEEK_MS });
  }

  _unseek(p) {
    this.seekers = this.seekers.filter((x) => x !== p);
    p.seekUntil = 0;
  }

  unqueue(p) {
    if (!p.room) return;
    this._unqueueRoom(p.room);
    this._pushRoom(p.room);
  }

  leave(p) {
    const room = p.room;
    if (!room) return;
    if (room.match && !room.match.ended) { room.match.forfeit(p.color); return; } // endMatch sab saaf karega
    this._cancelCountdown(room);
    room.players[p.color] = null;
    p.room = null;
    p.color = null;
    const left = room.players.red || room.players.blue;
    if (!left) {
      this._unqueueRoom(room);
      this.rooms.delete(room.code);
      return;
    }
    if (room.players.blue) { // host gaya => dusra Red ban jaata hai
      room.players.red = room.players.blue;
      room.players.blue = null;
      room.players.red.color = 'red';
    }
    this._pushRoom(room);
  }

  /* ---------- internals ---------- */
  _unqueueRoom(room) {
    room.queued = false;
    this.queue = this.queue.filter((c) => c !== room.code);
  }

  _pushRoom(room) {
    const slots = {
      red: room.players.red ? { name: NAMES.red } : null,
      blue: room.players.blue ? { name: NAMES.blue } : null,
    };
    const both = !!(slots.red && slots.blue);
    for (const color of ['red', 'blue']) {
      // START sirf host (Red) ke liye; akele tab hi jab ALLOW_SOLO on ho
      const canStart = color === 'red' && !room.match && !room.countdown && (both || RULES.ALLOW_SOLO);
      send(room.players[color], { t: 'lobby', code: room.code, you: color, queued: room.queued, slots, canStart });
    }
  }

  _broadcast(room, obj) {
    send(room.players.red, obj);
    send(room.players.blue, obj);
  }

  _startCountdown(room) {
    if (room.countdown) return;
    let n = RULES.COUNTDOWN_S;
    this._broadcast(room, { t: 'countdown', n });
    room.countdown = setInterval(() => {
      n -= 1;
      if (n > 0) return this._broadcast(room, { t: 'countdown', n });
      clearInterval(room.countdown);
      room.countdown = null;
      return this._startMatch(room);
    }, 1000);
    this._pushRoom(room); // countdown shuru => START button band
  }

  _cancelCountdown(room) {
    room.solo = false;
    if (!room.countdown) return;
    clearInterval(room.countdown);
    room.countdown = null;
    this._broadcast(room, { t: 'countdown', n: null });
  }

  _startPayload(room, color) {
    const m = room.match;
    return {
      t: 'start',
      you: color,
      seed: m.seed,
      durationS: RULES.DURATION_S,
      leftMs: Math.max(0, m.endsAt - Date.now()),
      rules: { total: RULES.TOTAL_CREATURES, active: RULES.ACTIVE_CREATURES },
      trees: { ...TREE_PARAMS, seed: m.seed },
    };
  }

  _startMatch(room) {
    if (!room.players.red) return;
    if (!room.solo && !room.players.blue) return;
    this._unqueueRoom(room);
    const seed = randomInt(1, 2 ** 31 - 1);
    room.match = new Match(seed, (result) => this._endMatch(room, result));
    for (const color of ['red', 'blue']) send(room.players[color], this._startPayload(room, color));
  }

  _endMatch(room, result) {
    this._broadcast(room, { t: 'end', ...result });
    for (const color of ['red', 'blue']) {
      const p = room.players[color];
      if (!p) continue;
      p.room = null;
      p.color = null;
      p.dropAt = null;
      if (!p.ws) this.sessions.delete(p.token);
    }
    this.rooms.delete(room.code);
  }

  // abhi sirf position relay hoti hai. Creatures/rockets ka server logic agla step.
  _relayState(p, msg) {
    const room = p.room;
    if (!room || !room.match || room.match.ended) return;
    const now = Date.now();
    if (now - p.lastState < 30) return; // ~33/sec se zyada nahi
    p.lastState = now;
    const out = { t: 'opp' };
    for (const k of STATE_KEYS) out[k] = Number.isFinite(msg[k]) ? msg[k] : 0;
    out.am = AMMO.has(msg.am) ? msg.am : 'ready';
    send(room.players[other(p.color)], out);
  }

  // client ne creature maara (headshot 8, body 5 points). Bahut tez kills ignore.
  _kill(p, msg) {
    const room = p.room;
    const m = room && room.match;
    if (!m || m.ended) return;
    const now = Date.now();
    if (now - (p.lastKill || 0) >= 350) {
      p.lastKill = now;
      m.registerKill(p.color, msg.part === 'head' ? 'head' : 'body');
    }
    if (!m.ended) this._pushScore(room);
  }

  // player mara => uska score zero
  _died(p) {
    const room = p.room;
    const m = room && room.match;
    if (!m || m.ended) return;
    m.registerDeath(p.color);
    this._pushScore(room);
  }

  _pushScore(room) {
    this._broadcast(room, { t: 'score', ...room.match.snapshot() });
  }

  tick() {
    const now = Date.now();
    for (const sk of [...this.seekers]) {
      if (now > sk.seekUntil) { this._unseek(sk); send(sk, { t: 'seekFail' }); }
    }
    for (const room of [...this.rooms.values()]) {
      const m = room.match;
      if (!m || m.ended) continue;
      m.tick(now);
      if (m.ended) continue;
      for (const color of ['red', 'blue']) {
        const p = room.players[color];
        if (p && p.dropAt && now > p.dropAt) { m.forfeit(color); break; }
      }
    }
  }
}