import { io } from 'socket.io-client';
import { state, setSnap } from './data.js';
import { toast } from '../dom.js';

export const session = { name: '', token: sessionStorage.getItem('ps_token') || '' };

// dev me server 3000 pe, live me same origin
export const socket = io(import.meta.env.DEV ? `http://${location.hostname}:3000` : undefined);

export const req = (ev, data = {}) =>
  new Promise((resolve) => {
    socket.timeout(8000).emit(ev, data, (err, res) =>
      resolve(err ? { error: 'Server se jawab nahi aaya, dobara try karo' } : res));
  });

export async function register(name) {
  const r = await req('player:register', { name });
  if (r.ok) {
    session.name = r.name;
    session.token = r.token;
    sessionStorage.setItem('ps_token', r.token);
  }
  return r;
}

socket.on('connect', async () => {
  if (!session.token) return;
  const r = await req('session:resume', { token: session.token });
  if (r.ok) session.name = r.name;
  else { session.token = ''; sessionStorage.removeItem('ps_token'); }
});

socket.on('lobby:joined', ({ pid, snap }) => {
  state.pid = pid;
  setSnap(snap);
  dispatchEvent(new Event('ps:joined'));
});
socket.on('lobby:state', setSnap);
socket.on('match:result', (r) => toast(r.message));
socket.on('exchange:incoming', (d) => dispatchEvent(new CustomEvent('ps:exchange-in', { detail: d })));
socket.on('exchange:result', (d) => dispatchEvent(new CustomEvent('ps:exchange-result', { detail: d })));
socket.on('game:enter', (d) => dispatchEvent(new CustomEvent('ps:game', { detail: d })));