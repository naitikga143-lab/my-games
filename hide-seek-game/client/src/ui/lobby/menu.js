import { el } from '../dom.js';
import { state, MATCH_SECONDS, seatOther, swapRooms } from './data.js';
import { nativeShare, whatsappUrl, copyLink } from './invite.js';
import { findMatch, requestExchange } from './net.js';

export function toast(msg) {
  const t = el('div', 'toast', msg);
  document.body.append(t);
  setTimeout(() => t.remove(), 2200);
}

function btn(label, fn, cls = '') {
  const b = el('button', 'btn ' + cls, label);
  b.onclick = fn;
  return b;
}

function modal(title, onClose) {
  const back = el('div', 'modal-back');
  const box = el('div', 'modal');
  box.append(el('h3', '', title));
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

export function slotMenu(slot) {
  const own = slot.team === state.me.team;
  const { box, close } = modal(label(slot));
  box.append(el('p', 'sub', own ? 'Apni team ka slot' : 'Opponent team ka slot (voice chat nahi hogi)'));
  box.append(btn(own ? 'Invite teammate' : 'Invite opponent', () => { close(); inviteMenu(slot); }));
  box.append(btn(own ? 'Find teammate (match)' : 'Match opponent', () => { close(); matchMenu(slot); }));
  box.append(btn('Cancel', close, 'ghost'));
}

export function inviteMenu(slot) {
  const { box, close } = modal('Invite: ' + label(slot));
  box.append(el('p', 'sub', 'Jo is link se aayega wo seedha isi slot me baithega.'));
  box.append(btn('Share (WhatsApp, Instagram...)', async () => {
    if (!(await nativeShare(slot))) toast('Is device pe share sheet nahi hai, WhatsApp ya Copy use karo');
  }));
  const wa = el('a', 'btn', 'WhatsApp');
  wa.href = whatsappUrl(slot);
  wa.target = '_blank';
  wa.rel = 'noopener';
  box.append(wa);
  box.append(btn('Copy link', async () => { if (await copyLink(slot)) toast('Link copy ho gaya'); }));
  box.append(btn('Close', close, 'ghost'));
}

export function matchMenu(slot) {
  let timer = null, cancel = null;
  const stop = () => { clearInterval(timer); cancel?.(); };
  const { box, close } = modal('Match: ' + label(slot), stop);
  const msg = el('p', 'big');
  const again = btn('Try again', () => run(), 'hide');
  box.append(msg, again, btn('Close', close, 'ghost'));

  function run() {
    again.classList.add('hide');
    let left = MATCH_SECONDS;
    msg.textContent = `Searching… ${left}s`;
    cancel = findMatch(slot, (who) => {
      clearInterval(timer);
      if (!who) { msg.textContent = 'Match not found'; again.classList.remove('hide'); return; }
      seatOther(slot.team, slot.player, who);
      close();
    });
    timer = setInterval(() => {
      left--;
      if (left >= 0) msg.textContent = `Searching… ${left}s`;
    }, 1000);
  }
  run();
}

export function exchangeMenu(me, other) {
  let cancel = null;
  const { box, close } = modal(`${label(other)} (${other.who})`, () => cancel?.());
  box.append(el('p', 'sub', `Tumhara Room ${me.room} ↔ unka Room ${other.room}`));
  const status = el('p', 'big');
  const send = btn('Send exchange request', () => {
    send.classList.add('hide');
    status.textContent = 'Request bheji, jawab ka intezaar…';
    cancel = requestExchange(me, other, (ok) => {
      cancel = null;
      if (ok) { swapRooms(me, other); toast('Room exchange ho gaya'); close(); }
      else status.textContent = 'Request accept nahi hui, room nahi badla.';
    });
  });
  box.append(status, send, btn('Close', close, 'ghost'));
}