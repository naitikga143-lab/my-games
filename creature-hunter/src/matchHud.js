/*
  Match HUD (sirf multiplayer/lobby match mein, window.MATCH ho tabhi bante hain):
   - upar beech mein: apne points | timer | opponent ke points
   - kill par server ko 'kill' bhejta hai (headshot 8, normal 5)
   - death par 'died' bhejta hai => apna score aur kills zero
   - server har kill/death par 'score' bhejta hai, wahi final sach hai
*/
const POINTS = { head: 8, body: 5 };

export class MatchHud {
  constructor(m) {
    this.you = m.you === 'blue' ? 'blue' : 'red';
    this.opp = this.you === 'red' ? 'blue' : 'red';
    this.endAt = performance.now() + (typeof m.leftMs === 'number' ? m.leftMs : (m.durationS || 420) * 1000);
    this.points = { red: 0, blue: 0 };
    this.kills = { red: 0, blue: 0 };
    this.heads = { red: 0, blue: 0 };
    this._sec = -1;

    const css = document.createElement('style');
    css.textContent = `
#mh{position:fixed;top:max(8px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);z-index:30;display:flex;gap:6px;
 align-items:stretch;pointer-events:none;font-family:system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000}
#mh .mh-side{min-width:74px;padding:4px 10px;border-radius:12px;text-align:center;background:rgba(0,0,0,.45);border:1.5px solid #ff4d5e}
#mh .mh-side.blue{border-color:#4da3ff}
#mh small{display:block;font-size:10px;letter-spacing:.16em;opacity:.85}
#mh b{display:block;font-size:22px;line-height:1.1}
#mh i{display:block;font-style:normal;font-size:10px;opacity:.7}
#mh .mh-mid{min-width:78px;padding:4px 10px;border-radius:12px;text-align:center;background:rgba(0,0,0,.45);border:1.5px solid rgba(255,255,255,.35)}
#mh .mh-mid span{display:block;font-size:22px;font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums}
#mh .mh-mid.low span{color:#ff6a5e;animation:mhblink 1s steps(2) infinite}
@keyframes mhblink{50%{opacity:.45}}
.mh-float{position:fixed;left:50%;top:40%;z-index:45;pointer-events:none;transform:translate(-50%,0);
 font:800 clamp(20px,4.5vw,34px) system-ui,sans-serif;text-shadow:0 2px 6px #000}`;
    document.head.appendChild(css);

    this.el = document.createElement('div');
    this.el.id = 'mh';
    this.el.innerHTML = `
      <div class="mh-side ${this.you}"><small>YOU</small><b data-me>0</b><i data-mei></i></div>
      <div class="mh-mid"><span data-t>07:00</span><small>MATCH</small></div>
      <div class="mh-side ${this.opp}"><small>OPP</small><b data-op>0</b><i data-opi></i></div>`;
    document.body.appendChild(this.el);
    this.q = (s) => this.el.querySelector(s);
    this.mid = this.q('.mh-mid');

    if (m.snap) this.apply(m.snap);
    else this._draw();
    if (window.NET) window.NET.on('score', (s) => this.apply(s));
  }

  // server ka score (final sach)
  apply(s) {
    if (s.points) this.points = { red: s.points.red, blue: s.points.blue };
    if (s.kills) this.kills = { red: s.kills.red, blue: s.kills.blue };
    if (s.heads) this.heads = { red: s.heads.red, blue: s.heads.blue };
    if (typeof s.leftMs === 'number') this.endAt = performance.now() + s.leftMs;
    this._draw();
  }

  _draw() {
    const y = this.you, o = this.opp;
    this.q('[data-me]').textContent = this.points[y];
    this.q('[data-op]').textContent = this.points[o];
    this.q('[data-mei]').textContent = `${this.kills[y]}K \u00b7 ${this.heads[y]}H`;
    this.q('[data-opi]').textContent = `${this.kills[o]}K \u00b7 ${this.heads[o]}H`;
  }

  update() {
    const sec = Math.max(0, Math.ceil((this.endAt - performance.now()) / 1000));
    if (sec === this._sec) return;
    this._sec = sec;
    const mm = String(Math.floor(sec / 60)).padStart(2, '0');
    const ss = String(sec % 60).padStart(2, '0');
    this.q('[data-t]').textContent = `${mm}:${ss}`;
    this.mid.classList.toggle('low', sec <= 30);
  }

  // creature mara: part = 'head' | 'body'
  kill(part) {
    const p = part === 'head' ? 'head' : 'body';
    const pts = POINTS[p];
    this.points[this.you] += pts; // turant dikhao, server ka score baad mein sahi kar dega
    this.kills[this.you] += 1;
    if (p === 'head') this.heads[this.you] += 1;
    this._draw();
    if (window.NET) window.NET.send({ t: 'kill', part: p });
    this._float(p === 'head' ? `+${pts}  HEADSHOT!` : `+${pts}  KILL`, p === 'head' ? '#ffd23a' : '#ffffff');
  }

  // player mara: score aur kills zero
  died() {
    this.points[this.you] = 0;
    this.kills[this.you] = 0;
    this.heads[this.you] = 0;
    this._draw();
    if (window.NET) window.NET.send({ t: 'died' });
  }

  hide() { this.el.style.display = 'none'; }

  _float(text, color) {
    const el = document.createElement('div');
    el.className = 'mh-float';
    el.textContent = text;
    el.style.color = color;
    document.body.appendChild(el);
    el.animate(
      [{ opacity: 1, transform: 'translate(-50%,0) scale(1.25)' }, { opacity: 0, transform: 'translate(-50%,-50px) scale(1)' }],
      { duration: 900, easing: 'ease-out' }
    ).onfinish = () => el.remove();
  }
}