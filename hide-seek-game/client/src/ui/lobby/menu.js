import { el, toast } from '../dom.js';
import { mySlot } from './data.js';
import { nativeShare, whatsappUrl, copyLink } from './invite.js';
import { req } from './net.js';

function btn(label, fn, cls = '') {
  const b = el('button', 'btn ' + cls, label);
  b.onclick = fn;
  return b;
}

export function modal(title, onClose) {
  const back = el('div', 'modal-back');
  const box = el('div', 'modal');
  const h = el('h3');
  h.textContent = title;
  box.append(h);
  back.append(box);
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    back.remove();
    onClose?.();
  };
  back.addEventListener('pointerdown', (e) => { if (e.target === back) close(); });
  document.body.append(back);
  return { box, close };
}

const label = (s) => `Team ${s.team} Player ${s.player}`;

export async function startTeamMatch(team) {
  const r = await req('match:team', { team });
  toast(r.error || `Team ${team} ke liye match dhoondh rahe hain…`);
}

export function slotMenu(slot) {
  const me = mySlot();
  const own = me && slot.team === me.team;
  const { box, close } = modal(label(slot));
  box.append(el('p', 'sub', own ? 'Apni team ka slot' : 'Opponent team ka slot (voice chat nahi hogi)'));
  box.append(btn(own ? 'Invite teammate' : 'Invite opponent', () => { close(); inviteMenu(slot); }));
  box.append(btn(own ? 'Find teammates (match)' : 'Match opponents', () => { close(); startTeamMatch(slot.team); }));
  box.append(btn('Cancel', close, 'ghost'));
}

export function inviteMenu(slot) {
  const { box, close } = modal('Invite: ' + label(slot));
  box.append(el('p', 'sub', 'Jo is link se aayega wo seedha isi slot me baithega.'));
  box.append(btn('Share (WhatsApp, Instagram...)', async () => {
    if (!(await nativeShare(slot))) toast('Share sheet nahi hai, WhatsApp ya Copy use karo');
  }));
  const wa = el('a', 'btn', 'WhatsApp');
  wa.href = whatsappUrl(slot);
  wa.target = '_blank';
  wa.rel = 'noopener';
  box.append(wa);
  box.append(btn('Copy link', async () => { if (await copyLink(slot)) toast('Link copy ho gaya'); }));
  box.append(btn('Close', close, 'ghost'));
}

export function exchangeMenu(me, other) {
  let off = null;
  const { box, close } = modal(`${label(other)} (${other.name})`, () => off?.());
  box.append(el('p', 'sub', `Tumhara Room ${me.room} ↔ unka Room ${other.room}`));
  const status = el('p', 'big');
  const send = btn('Send exchange request', async () => {
    send.classList.add('hide');
    status.textContent = 'Request bheji, jawab ka intezaar…';
    const onRes = (e) => {
      off?.(); off = null;
      if (e.detail.accepted) { toast('Room exchange ho gaya'); close(); }
      else status.textContent = e.detail.message || 'Request accept nahi hui, room nahi badla.';
    };
    addEventListener('ps:exchange-result', onRes);
    off = () => removeEventListener('ps:exchange-result', onRes);
    const r = await req('exchange:request', { toPid: other.pid });
    if (r.error) { off?.(); off = null; status.textContent = r.error; }
  });
  box.append(status, send, btn('Close', close, 'ghost'));
}

// teammate ki request aane par
export function incomingExchange(d) {
  let done = false;
  const answer = (accept) => {
    if (done) return;
    done = true;
    req('exchange:respond', { id: d.id, accept });
    close();
  };
  const { box, close } = modal('Room exchange request', () => answer(false));
  const p = el('p', 'sub');
  p.textContent = `${d.fromName} (Room ${d.fromRoom}) tumhara Room ${d.toRoom} lena chahta hai. Room badlein?`;
  box.append(p, btn('Accept', () => answer(true)), btn('Decline', () => answer(false), 'ghost'));
  setTimeout(() => answer(false), 20000);
}