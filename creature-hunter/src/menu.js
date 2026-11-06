import './menu.css';
import './menuAddon.css';
import { getSfx } from './sfx.js';
import { setupLandscape } from './landscape.js';

// title/lobby bhi landscape mein: portrait mein "phone ghumao" screen, pehle tap par fullscreen
setupLandscape({ isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0 });
getSfx(); // gaana + awaaz: pehle tap par shuru, menu se game tak ek hi chalta hai



/* Title -> Lobby -> Countdown -> (main.js game) -> Result.
   main.js ko chhua nahi gaya: match shuru hone par ye use dynamic import karta hai. */

const WS_URL = import.meta.env.DEV
  ? `ws://${location.hostname}:3000/ws`
  : `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`;

/* ================== ADSTERRA BANNER (320x50) ================== */
const AD = {
  key: '2f567f3a00890cda803ca65a66cfa9e4',
  src: 'https://bauval.org/22/2f567f3a00890cda803ca65a66cfa9e4',
  width: 320,
  height: 50,
};
let adMounted = false;
function mountAd() {
  if (adMounted || import.meta.env.DEV) return;
  adMounted = true;
  const f = document.createElement('iframe');
  f.title = 'Advertisement';
  f.width = AD.width;
  f.height = AD.height;
  f.scrolling = 'no';
  f.setAttribute('frameborder', '0');
  f.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border:0;overflow:hidden;max-width:100%';
  f.srcdoc = '<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:transparent">'
    + '<scr' + 'ipt>atOptions = ' + JSON.stringify({ key: AD.key, format: 'iframe', height: AD.height, width: AD.width, params: {} }) + ';</scr' + 'ipt>'
    + '<scr' + 'ipt src="' + AD.src + '"></scr' + 'ipt></body></html>';
  document.getElementById('adSlot').appendChild(f);
}

const S = {
  ws: null,
  token: sessionStorage.getItem('ch_token') || '',
  welcomed: false,
  entered: false,   // player ne title par tap kiya
  room: null,       // server ka last 'lobby' message
  you: null,
  started: false,
  over: false,
  sheet: null,      // 'choose' | 'invite' | 'matching' | null
  seeking: false,   // Enter Match par intezar chal raha hai
  seekEnd: 0,
  seekTimer: 0,
  inviteCode: (new URLSearchParams(location.search).get('room') || '').trim().toUpperCase() || null,
};

/* ================== DOM ================== */
const root = document.createElement('div');
root.id = 'menu';
root.dataset.screen = 'title';
root.innerHTML = `
  <div id="menuUi">
    <canvas id="mFx"></canvas>
    <div class="hills"></div>
    <div class="vignette"></div>

    <section class="screen" id="sTitle">
      <h1 class="logo"><span>CREATURE</span><span>HUNTER</span></h1>
      <div class="sub"><i></i><b>DIWALI SPECIAL</b><i></i></div>
      <button class="tap" id="btnPlay">TAP TO PLAY</button>
    </section>

    <section class="screen" id="sHome" hidden>
      <div class="mini big">CREATURE HUNTER</div>
      <p class="tag">DIWALI SPECIAL</p>
      <div class="menu-opts">
        <button class="bigbtn" id="btnCreate"><span class="ic">&#9876;</span><span><b>Create Lobby</b><small>Apna room banao aur dost ko bulao</small></span></button>
        <button class="bigbtn alt" id="btnEnter"><span class="ic">&#9889;</span><span><b>Enter Match</b><small>Kisi ke lobby mein seedha pahucho</small></span></button>
      </div>
    </section>

    <section class="screen" id="sSeek" hidden>
      <div class="mini">CREATURE HUNTER</div>
      <div class="radar" id="radar"><i></i><i></i><i></i><b id="seekN">60</b></div>
      <h2 class="seek-t" id="seekT">Searching for a match...</h2>
      <p class="seek-s" id="seekS"></p>
      <button class="ghost wide" id="btnSeekCancel">Cancel</button>
    </section>

    <section class="screen" id="sLobby" hidden>
      <header class="lhead">
        <button class="ghost" id="btnLeave">&#8249; Leave</button>
        <div class="mini">CREATURE HUNTER</div>
        <div class="code">ROOM<b id="roomCode">-----</b></div>
      </header>
      <div class="arena" id="arena">
        <div class="slot red" id="slotRed"></div>
        <div class="vs">VS</div>
        <div class="slot blue" id="slotBlue"></div>
      </div>
      <p class="hint" id="lobbyHint"></p>
      <div class="startbar"><button class="tap" id="btnStart" disabled>START</button></div>
    </section>

    <div class="diyas">${'<span class="diya"><s></s></span>'.repeat(9)}</div>
    <div class="ad" id="adSlot">ADVERTISEMENT &middot; BANNER SPACE</div>

    <div class="sheet" id="sheet" hidden><div class="panel" id="panel"></div></div>
  </div>
  <div class="count" id="count" hidden><small>GET READY</small><b id="countN">3</b></div>
  <div class="end" id="end" hidden></div>
  <div class="toast" id="toast"></div>
`;
document.body.appendChild(root);

const $ = (id) => document.getElementById(id);
const ui = $('menuUi');

/* ================== helpers ================== */
let toastT = 0;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), 2600);
}

function send(obj) {
  if (S.ws && S.ws.readyState === 1) S.ws.send(JSON.stringify(obj));
}

function show(screen) {
  root.dataset.screen = screen;
  if (screen !== 'title') mountAd();
  $('sTitle').hidden = screen !== 'title';
  $('sHome').hidden = screen !== 'home';
  $('sSeek').hidden = screen !== 'seek';
  $('sLobby').hidden = screen !== 'lobby';
}

const listeners = {};
window.NET = {
  send,
  on(type, fn) { (listeners[type] ||= []).push(fn); },
  get you() { return S.you; },
};

/* ================== connection ================== */
function connect() {
  const ws = new WebSocket(WS_URL + (S.token ? `?token=${S.token}` : ''));
  S.ws = ws;
  ws.onmessage = (e) => {
    let m;
    try { m = JSON.parse(e.data); } catch { return; }
    onMsg(m);
  };
  ws.onclose = () => {
    if (S.ws !== ws || S.over) return;
    S.welcomed = false;
    if (S.seeking) { stopSeek(); toast('Opponent mil gaya!'); }
    else if (S.entered) toast('Connection lost, reconnecting...');
    setTimeout(connect, 1500);
  };
  ws.onerror = () => {};
}

function tryEnter() {
  if (!S.entered || !S.welcomed || S.room || S.started) return;
  if (S.inviteCode) send({ t: 'join', code: S.inviteCode });
  else send({ t: 'create' });
}

const ERRORS = {
  room_not_found: 'Invite link purana hai, room nahi mila',
  room_full: 'Room pehle se bhara hua hai',
  room_started: 'Match shuru ho chuka hai',
};

function onMsg(m) {
  switch (m.t) {
    case 'welcome':
      S.token = m.token;
      sessionStorage.setItem('ch_token', m.token);
      S.welcomed = true;
      setTimeout(tryEnter, 350); // agar server ne room wapas push kar diya to S.room set ho jayega
      break;
    case 'lobby':
      if (S.seeking) stopSeek();
      S.entered = true;
      S.room = m;
      S.you = m.you;
      if (S.inviteCode) { S.inviteCode = null; history.replaceState(null, '', location.pathname); }
      renderLobby();
      break;
    case 'seeking':
      S.seekEnd = Date.now() + m.ms;
      break;
    case 'seekFail':
      stopSeek();
      setSeekUi('fail');
      setTimeout(() => { if (root.dataset.screen === 'seek' && !S.seeking) show('home'); }, 2800);
      break;
    case 'countdown':
      showCount(m.n);
      break;
    case 'start':
    case 'resume':
      startGame(m);
      break;
    case 'error':
      toast(ERRORS[m.code] || 'Kuch gadbad hui');
      if (S.inviteCode) { S.inviteCode = null; history.replaceState(null, '', location.pathname); send({ t: 'create' }); }
      break;
    case 'end':
      showEnd(m);
      break;
    default:
      break;
  }
  (listeners[m.t] || []).forEach((fn) => fn(m));
}

/* ================== lobby ================== */
function slotHtml(color, data, mine) {
  if (data) {
    return `<div class="avatar">${data.name[0]}</div><div class="nm">${data.name}</div>${mine ? '<span class="you">YOU</span>' : ''}<div class="st">Ready</div>`;
  }
  return `<button class="plus" id="btnPlus" aria-label="Add opponent">+</button><div class="nm dim">Waiting for opponent</div>`;
}

function renderLobby() {
  const r = S.room;
  if (!r) return;
  show('lobby');
  $('roomCode').textContent = r.code;
  const red = $('slotRed'), blue = $('slotBlue');
  red.innerHTML = slotHtml('red', r.slots.red, r.you === 'red');
  blue.innerHTML = slotHtml('blue', r.slots.blue, r.you === 'blue');
  red.classList.toggle('empty', !r.slots.red);
  blue.classList.toggle('empty', !r.slots.blue);

  const full = !!(r.slots.red && r.slots.blue);
  $('lobbyHint').textContent = full
    ? 'Opponent mil gaya. Match shuru ho raha hai!'
    : r.queued ? 'Opponent dhoondh rahe hain...'
    : r.canStart ? 'Dost ko bulao, ya akele khelne ke liye START dabao'
    : 'Dost ko invite karo ya random opponent se bhido';
  $('btnStart').disabled = !r.canStart;
  if (full) closeSheet(true);
  else if (S.sheet === 'matching' && !r.queued) openSheet('choose');
}

function goLobby() {
  S.entered = true;
  if (S.room) renderLobby(); else show('lobby');
  tryEnter();
}

// Title -> Home. Invite link se aaya player (ya purane room wala) seedha Lobby mein jaata hai.
$('btnPlay').addEventListener('click', () => {
  if (S.room || S.inviteCode) goLobby(); else show('home');
});
$('btnCreate').addEventListener('click', goLobby);
$('btnEnter').addEventListener('click', () => startSeek());

$('btnLeave').addEventListener('click', () => {
  closeSheet(true);
  S.room = null;
  S.inviteCode = null;
  S.entered = false;
  send({ t: 'leave' });
  show('home');
});

$('btnStart').addEventListener('click', () => {
  if (S.room && S.room.canStart) send({ t: 'start' });
});

/* ---------- Enter Match: 60 second tak kisi lobby ka intezar ---------- */
function setSeekUi(state) {
  const fail = state === 'fail';
  $('radar').classList.toggle('fail', fail);
  $('seekT').textContent = fail ? 'Match not found' : 'Searching for a match...';
  $('seekS').textContent = fail
    ? 'Abhi koi opponent nahi mila. Home pe wapas ja rahe hain...'
    : 'Koi aur bhi Enter Match dabaye, ya koi lobby opponent maange, to turant match ban jayega';
  $('btnSeekCancel').hidden = fail;
  if (fail) $('seekN').textContent = '\u2715';
}

function startSeek() {
  if (!S.welcomed) { toast('Server se connect ho raha hai, ek second...'); return; }
  S.seeking = true;
  S.seekEnd = Date.now() + 60000;
  setSeekUi('search');
  $('seekN').textContent = '60';
  show('seek');
  send({ t: 'seek' });
  clearInterval(S.seekTimer);
  S.seekTimer = setInterval(() => {
    $('seekN').textContent = Math.max(0, Math.ceil((S.seekEnd - Date.now()) / 1000));
  }, 250);
}

function stopSeek() {
  S.seeking = false;
  clearInterval(S.seekTimer);
}

$('btnSeekCancel').addEventListener('click', () => {
  send({ t: 'unseek' });
  stopSeek();
  show('home');
});

$('arena').addEventListener('click', (e) => {
  if (e.target.closest('#btnPlus')) openSheet('choose');
});

/* ---------- invite / match sheet ---------- */
function inviteLink() { return `${location.origin}/?room=${S.room.code}`; }

function openSheet(mode) {
  S.sheet = mode;
  const p = $('panel');
  if (mode === 'choose') {
    p.innerHTML = `
      <h3>Opponent chuno</h3>
      <button class="opt" data-act="invite"><span class="ic">&#9993;</span><span><b>Invite opponent</b><small>WhatsApp ya link se dost ko bulao</small></span></button>
      <button class="opt" data-act="match"><span class="ic">&#9876;</span><span><b>Match opponent</b><small>Random player dhoondho</small></span></button>
      <button class="link-btn" data-act="close">Cancel</button>`;
  } else if (mode === 'invite') {
    p.innerHTML = `
      <h3>Dost ko bulao</h3>
      <div class="linkbox">${inviteLink()}</div>
      <button class="opt wa" data-act="wa"><span class="ic">&#9742;</span><span><b>WhatsApp se invite</b><small>Link seedha chat mein bhejo</small></span></button>
      <button class="opt" data-act="copy"><span class="ic">&#10697;</span><span><b>Link copy karo</b><small>Kahin bhi paste karo</small></span></button>
      <div class="wait">Dost ke judte hi match shuru hoga...</div>
      <button class="link-btn" data-act="back">Back</button>`;
  } else if (mode === 'matching') {
    p.innerHTML = `
      <h3>Match opponent</h3>
      <div class="spin"></div>
      <div class="wait">Opponent dhoondh rahe hain...</div>
      <button class="link-btn" data-act="cancelMatch">Cancel</button>`;
  }
  $('sheet').hidden = false;
}

function closeSheet(silent) {
  if (!silent && S.sheet === 'matching') send({ t: 'unqueue' });
  S.sheet = null;
  $('sheet').hidden = true;
}

$('sheet').addEventListener('click', async (e) => {
  if (e.target.id === 'sheet') { closeSheet(); return; }
  const b = e.target.closest('[data-act]');
  if (!b || !S.room) return;
  switch (b.dataset.act) {
    case 'invite': openSheet('invite'); break;
    case 'match': send({ t: 'queue' }); openSheet('matching'); break;
    case 'wa': {
      const text = `Creature Hunter (Diwali Special) mein 1v1 ladai! Aa ja: ${inviteLink()}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      break;
    }
    case 'copy':
      try { await navigator.clipboard.writeText(inviteLink()); toast('Link copy ho gaya'); }
      catch { toast('Copy nahi hua, link ko dabake copy karo'); }
      break;
    case 'back': openSheet('choose'); break;
    case 'cancelMatch': send({ t: 'unqueue' }); openSheet('choose'); break;
    case 'close': closeSheet(); break;
    default: break;
  }
});

/* ================== countdown / game / result ================== */
function showCount(n) {
  const c = $('count');
  if (n === null || n === undefined) { c.hidden = true; return; }
  c.hidden = false;
  const el = $('countN');
  el.textContent = n;
  el.classList.remove('pop');
  void el.offsetWidth; // animation dobara chalane ke liye
  el.classList.add('pop');
}

async function startGame(m) {
  if (S.started) return;
  S.started = true;
  S.you = m.you;
  window.MATCH = m; // seed, trees params, rules, you
  closeSheet(true);
  $('count').hidden = true;
  fx.stop();
  ui.classList.add('out');
  setTimeout(() => { ui.hidden = true; }, 520);

  const ov = document.getElementById('overlay'); // "Click karke khelo"
  if (ov) ov.style.display = 'flex';
  try {
    await import('./main.js');
  } catch (err) {
    console.error(err);
    toast('Game load nahi hua');
  }
}

const REASON = { all_killed: 'Saare creatures khatam!', time: 'Time khatam', forfeit: 'Opponent match chhod gaya' };
const BY = { points: 'zyada points se', headshots: 'headshots ke tie-break se', draw: 'bilkul barabar', forfeit: '' };
const CELEB_S = 30; // celebration kitne second (15-30 ke beech tune kar sakte ho)

function showEnd(m) {
  S.over = true;
  if (document.exitPointerLock) document.exitPointerLock();
  sessionStorage.removeItem('ch_token');
  const win = m.winner === S.you;
  const draw = m.winner === 'draw';
  const title = draw ? 'DRAW' : win ? 'VICTORY' : 'DEFEAT';
  const wname = draw ? 'DRAW' : `${m.winner.toUpperCase()} WINS!${win ? ' (YOU)' : ''}`;
  const by = BY[m.by] ? ` ${BY[m.by]}` : '';
  const pts = m.points || { red: 0, blue: 0 };
  const side = (c, label) => `
    <div class="${c} ${S.you === c ? 'me' : ''}">
      <small>${label}${S.you === c ? ' \u00b7 YOU' : ''}</small><b>${pts[c]}</b>
      <i>${m.kills[c]} kills \u00b7 ${m.heads[c]} headshots</i>
    </div>`;
  const e = $('end');
  e.innerHTML = `
    <div class="card">
      <div class="left">
        <h2 class="${win || draw ? '' : 'lose'}">${title}</h2>
        <div class="winner ${draw ? '' : m.winner}">${wname}</div>
        <p>${REASON[m.reason] || ''}${draw ? '' : by ? ' &middot;' + by : ''}</p>
      </div>
      <div class="right">
        <div class="sc">${side('red', 'RED')}${side('blue', 'BLUE')}</div>
        <button class="tap" id="btnBack">BACK TO LOBBY</button>
        <small class="auto" id="autoExit"></small>
      </div>
    </div>`;
  e.hidden = false;

  const goBack = () => { location.href = location.pathname; };
  $('btnBack').addEventListener('click', goBack);
  let left = CELEB_S;
  const au = $('autoExit');
  au.textContent = `Lobby mein apne aap wapas: ${left}s`;
  const timer = setInterval(() => {
    left -= 1;
    au.textContent = `Lobby mein apne aap wapas: ${Math.max(0, left)}s`;
    if (left <= 0) { clearInterval(timer); goBack(); }
  }, 1000);
  if (S.ws) S.ws.close();
}

/* ================== background fireworks ================== */
function createFx(canvas) {
  const ctx = canvas.getContext('2d');
  const COLORS = ['#ffd27a', '#ff7a45', '#ff4d8d', '#6fe3ff', '#b6ff6a', '#c79bff'];
  const rockets = [], sparks = [];
  let W = 0, H = 0, running = true, last = performance.now(), wait = 0.4;

  const resize = () => {
    const d = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * d; canvas.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const burst = (x, y, c) => {
    const k = Math.min(W, H) / 700 + 0.55;
    for (let i = 0; i < 64; i++) {
      const a = Math.random() * Math.PI * 2, s = (60 + Math.random() * 150) * k;
      sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: 0.9 + Math.random() * 0.7, c });
    }
    if (sparks.length > 700) sparks.splice(0, sparks.length - 700);
  };

  const frame = (now) => {
    if (!running) return;
    requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    wait -= dt;
    if (wait <= 0 && rockets.length < 4) {
      wait = 0.7 + Math.random() * 1.2;
      rockets.push({
        x: W * (0.1 + Math.random() * 0.8), y: H * 0.8, vy: -H * (0.55 + Math.random() * 0.25),
        top: H * (0.1 + Math.random() * 0.3), c: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy * dt;
      ctx.globalAlpha = 1; ctx.fillStyle = '#ffe9b0';
      ctx.beginPath(); ctx.arc(r.x, r.y, 2, 0, 6.283); ctx.fill();
      if (r.y <= r.top) { burst(r.x, r.y, r.c); rockets.splice(i, 1); }
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life += dt;
      if (s.life >= s.max) { sparks.splice(i, 1); continue; }
      s.vx *= 0.985; s.vy = s.vy * 0.985 + 110 * dt;
      s.x += s.vx * dt; s.y += s.vy * dt;
      ctx.globalAlpha = 1 - s.life / s.max;
      ctx.fillStyle = s.c;
      ctx.beginPath(); ctx.arc(s.x, s.y, 1.8, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
  };
  requestAnimationFrame(frame);
  return { stop() { running = false; window.removeEventListener('resize', resize); } };
}
const fx = createFx($('mFx'));

connect();