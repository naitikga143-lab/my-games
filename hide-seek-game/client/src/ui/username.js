import { el, show } from './dom.js';
import { req, register } from './lobby/net.js';
import { session } from './lobby/net.js';
import { mountAvatar } from './avatarView.js';

function waiting() {
  const s = el('div', 'screen userpage');
  s.append(el('div', 'lob-title', '<i class="pulse"></i>SEARCHING'));
  s.append(el('p', 'sub', 'Teams ka match dhoondh rahe hain.<br>Jaise hi koi team Match dabayegi, tumhe seedha wahan bhej diya jayega.'));
  const b = el('button', 'btn big-btn ghost', 'Cancel');
  b.onclick = async () => { await req('match:cancel'); usernamePage(); };
  s.append(b);
  show(s);
}

export function usernamePage({ invite = null, note = '' } = {}) {
  document.body.classList.add('in-lobby');
  const s = el('div', 'screen userpage');
  s.append(el('div', 'lob-title', '<i class="pulse"></i>IDENTIFY'));

  let stop = null;
  if (!invite) {
    const box = el('div', 'avatar-box');
    s.append(box);
    show(s, null);            // pehle DOM me lagao, phir avatar
    stop = mountAvatar(box);
  } else {
    s.append(el('p', 'sub', `Invite mila hai: Team ${invite.team} Player ${invite.player}`));
  }

  const input = el('input', 'uinput');
  input.maxLength = 14;
  input.placeholder = 'Username';
  input.value = session.name || '';
  input.autocomplete = 'off';
  input.autocapitalize = 'off';
  input.spellcheck = false;
  const err = el('p', 'err');
  err.textContent = note;
  const hint = el('p', 'hint',
    invite ? 'Username likho aur seedha lobby me jao.' :
      'Enter match: jahan teams match dhoondh rahi hain wahan seedha bhejega. Start Lobby: apni nayi lobby banao. (Kuch players AI ho sakte hain.)');
  const wrap = el('div', 'ubtns');
  s.append(input, err, wrap, hint);

  const buttons = [];
  const add = (label, fn, cls = '') => {
    const b = el('button', 'btn ' + cls, label);
    b.onclick = async () => {
      err.textContent = '';
      buttons.forEach((x) => (x.disabled = true));
      try { await fn(); } finally { buttons.forEach((x) => (x.disabled = false)); }
    };
    buttons.push(b);
    wrap.append(b);
  };

  const needName = async () => {
    const r = await register(input.value);
    if (r.error) { err.textContent = r.error; return false; }
    return true;
  };

  if (invite) {
    add('Join lobby', async () => {
      if (!(await needName())) return;
      const r = await req('lobby:join', invite);
      if (r.error) usernamePage({ note: r.error + ' (invite kaam nahi kiya, normal mode me aao)' });
    });
  } else {
    add('Enter match', async () => {
      if (!(await needName())) return;
      const r = await req('match:enter');
      if (r.error) err.textContent = r.error;
      else if (r.status === 'waiting') waiting();
    });
    add('Start Lobby', async () => {
      if (!(await needName())) return;
      const r = await req('lobby:start');
      if (r.error) err.textContent = r.error;
    });
  }

  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') buttons[0].click(); });
  show(s, stop);
}