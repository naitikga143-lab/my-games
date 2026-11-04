/*
  Cracker awaazein: sab Web Audio se banti hain (koi audio file nahi => halka, offline, copyright ka jhanjhat nahi).
   - Anaar  : "fsssss" ka tez hiss + chhote pop-pop, jo anaar ke saath fade hota hai
   - Chakri : ghoomta hua "wuwuwu-zzzz" (tremolo wala hiss) + halka motor jaisa tone
   - Rocket : "tsss" + upar chadhti seeti, aur phat par "tak!" + thump + taaron ki tin-tin
   - Bomb   : jalti fuse ka sizzle (tez hota jaata hai), phir gehra BOOM + gunj, phir skull ki bhootiya "whoooo"
  Doori se awaaz dheemi, aur dayein/bayein ke hisaab se stereo pan.
  Kunji M ya top-right ke speaker button se mute.
  Mobile par awaaz pehle tap/touch ke baad hi chalu hoti hai (browser ka rule).
*/
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const rnd = (a, b) => a + Math.random() * (b - a);
const NOP = { update() {}, stop() {} };

export class Sfx {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.voices = 0;
    this.L = { x: 0, y: 0, z: 0, rx: 1, rz: 0 }; // sunne wala (player) aur uska "daayan" disha
    this.muted = false;
    try { this.muted = localStorage.getItem('ch_mute') === '1'; } catch (e) { /* ignore */ }

    const unlock = () => {
      this._init();
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    };
    for (const ev of ['pointerup', 'touchend', 'click', 'keydown']) window.addEventListener(ev, unlock, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (!this.ctx) return;
      if (document.hidden) this.ctx.suspend(); else this.ctx.resume();
    });
    window.addEventListener('keydown', (e) => { if (e.code === 'KeyM' && !e.repeat) this.toggleMute(); });
    this._button();
  }

  /* ---------------- setup ---------------- */
  _button() {
    const css = document.createElement('style');
    css.textContent = `#snd-btn{position:fixed;top:calc(max(10px,env(safe-area-inset-top)) + 46px);right:max(10px,env(safe-area-inset-right));
 z-index:70;width:38px;height:38px;border-radius:10px;border:1px solid rgba(255,255,255,.5);background:rgba(0,0,0,.35);
 color:#fff;font:700 18px system-ui,sans-serif;line-height:1;padding:0}`;
    document.head.appendChild(css);
    const b = document.createElement('button');
    b.id = 'snd-btn';
    b.setAttribute('aria-label', 'Sound');
    b.addEventListener('pointerdown', (e) => e.stopPropagation());
    b.addEventListener('touchstart', (e) => e.stopPropagation());
    b.addEventListener('click', () => this.toggleMute());
    document.body.appendChild(b);
    this.btn = b;
    this._paint();
  }

  _paint() { this.btn.textContent = this.muted ? '\u{1F507}' : '\u{1F50A}'; }

  toggleMute() {
    this.muted = !this.muted;
    try { localStorage.setItem('ch_mute', this.muted ? '1' : '0'); } catch (e) { /* ignore */ }
    if (this.master) this.master.gain.setTargetAtTime(this.muted ? 0 : 0.9, this.ctx.currentTime, 0.02);
    this._paint();
  }

  _init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const c = new AC();
    this.ctx = c;
    const sr = c.sampleRate;

    const comp = c.createDynamicsCompressor(); // bade dhamake se awaaz na phate
    comp.threshold.value = -16; comp.knee.value = 24; comp.ratio.value = 6;
    comp.attack.value = 0.003; comp.release.value = 0.2;
    this.master = c.createGain();
    this.master.gain.value = this.muted ? 0 : 0.9;
    this.master.connect(comp);
    comp.connect(c.destination);

    // safed shor (2 sec)
    this.noise = c.createBuffer(1, sr * 2, sr);
    const nd = this.noise.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

    // chhote pop-pop (3 sec): kabhi kabhi ek tez click
    this.crackleBuf = c.createBuffer(1, sr * 3, sr);
    const cd = this.crackleBuf.getChannelData(0);
    for (let i = 0; i < cd.length; i++) {
      if (Math.random() < 0.0009) {
        const amp = 0.4 + Math.random() * 0.6;
        const len = 4 + Math.floor(Math.random() * 8);
        for (let k = 0; k < len && i + k < cd.length; k++) cd[i + k] += amp * (Math.random() * 2 - 1) * (1 - k / len);
      }
    }

    // gunj (reverb) ke liye impulse
    const rl = Math.floor(sr * 1.4);
    const imp = c.createBuffer(2, rl, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = imp.getChannelData(ch);
      for (let i = 0; i < rl; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / rl, 2.5);
    }
    this.verb = c.createConvolver();
    this.verb.buffer = imp;
    const vo = c.createGain();
    vo.gain.value = 0.5;
    this.verb.connect(vo);
    vo.connect(this.master);

    // boom ko "bhaari" banane ke liye soft clip
    const N = 1024;
    this.clipCurve = new Float32Array(N);
    for (let i = 0; i < N; i++) this.clipCurve[i] = Math.tanh(((i * 2) / N - 1) * 2.2);
  }

  setListener(x, y, z, rx, rz) {
    const L = this.L;
    L.x = x; L.y = y; L.z = z; L.rx = rx; L.rz = rz;
  }

  /* ---------------- helpers ---------------- */
  _ok() {
    return !!this.ctx && this.ctx.state === 'running' && !this.muted && this.voices < 36;
  }

  // doori => awaaz, dayein/bayein => pan
  _sp(p, boost = 1) {
    const L = this.L;
    const dx = p.x - L.x, dy = (p.y || 0) - L.y, dz = p.z - L.z;
    const d = Math.hypot(dx, dy, dz);
    return { vol: boost / (1 + d * 0.09), pan: clamp((dx * L.rx + dz * L.rz) / Math.max(d, 1), -1, 1) * 0.85 };
  }

  _chain(vol, pan) {
    const c = this.ctx;
    const g = c.createGain();
    g.gain.value = vol;
    let last = g;
    let p = null;
    if (c.createStereoPanner) {
      p = c.createStereoPanner();
      p.pan.value = pan;
      g.connect(p);
      last = p;
    }
    last.connect(this.master);
    return { g, p };
  }

  _noise(loop) {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    s.loop = loop;
    return s;
  }

  _crackle(loop = true) {
    const s = this.ctx.createBufferSource();
    s.buffer = this.crackleBuf;
    s.loop = loop;
    return s;
  }

  _filter(type, freq, q = 1) {
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    return f;
  }

  _env(param, t, peak, attack, decay) {
    param.cancelScheduledValues(t);
    param.setValueAtTime(0.0001, t);
    param.linearRampToValueAtTime(peak, t + attack);
    param.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  _run(node, t, dur, off) {
    if (off === undefined) node.start(t); else node.start(t, off);
    node.stop(t + dur);
    this.voices += 1;
    node.onended = () => { this.voices -= 1; try { node.disconnect(); } catch (e) { /* ignore */ } };
  }

  // lagatar chalne wali awaaz ka handle: update(pos, k, progress) / stop()
  _handle(srcs, ch, base, extra) {
    const c = this.ctx;
    this.voices += srcs.length;
    let done = false;
    return {
      update: (pos, k = 1, prog = 0) => {
        if (done) return;
        const now = c.currentTime;
        const { vol, pan } = this._sp(pos, 1);
        ch.g.gain.setTargetAtTime(base * vol * k, now, 0.06);
        if (ch.p) ch.p.pan.setTargetAtTime(pan, now, 0.06);
        if (extra) extra(prog, now);
      },
      stop: () => {
        if (done) return;
        done = true;
        const now = c.currentTime;
        ch.g.gain.cancelScheduledValues(now);
        ch.g.gain.setTargetAtTime(0, now, 0.06);
        for (const s of srcs) { try { s.stop(now + 0.4); } catch (e) { /* ignore */ } }
        this.voices -= srcs.length;
      },
    };
  }

  /* ---------------- sab crackers: phenkte waqt ---------------- */
  toss(pos, type) {
    if (!this._ok()) return;
    const c = this.ctx, t = c.currentTime;
    const { vol, pan } = this._sp(pos, 1);
    const ch = this._chain(0.0001, pan);
    const n = this._noise(false);
    const bp = this._filter('bandpass', 450, 1.1);
    bp.frequency.setValueAtTime(450, t);
    bp.frequency.exponentialRampToValueAtTime(type === 'rocket' ? 2600 : 1600, t + 0.22);
    n.connect(bp); bp.connect(ch.g);
    this._env(ch.g.gain, t, 0.35 * vol, 0.05, 0.22);
    this._run(n, t, 0.3);
  }

  // zameen par girne ka "tuk" (bomb ke liye bhaari)
  thud(pos, k = 1) {
    if (!this._ok()) return;
    const c = this.ctx, t = c.currentTime;
    const { vol, pan } = this._sp(pos, 1);
    const ch = this._chain(0.0001, pan);
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(130, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.12);
    const n = this._noise(false);
    const lp = this._filter('lowpass', 500, 0.7);
    n.connect(lp); lp.connect(ch.g);
    o.connect(ch.g);
    this._env(ch.g.gain, t, 0.55 * k * vol, 0.004, 0.14);
    this._run(o, t, 0.2);
    this._run(n, t, 0.15);
  }

  // fuse jalne ki "tsss" + pop
  fuse(pos) {
    if (!this._ok()) return;
    const c = this.ctx, t = c.currentTime;
    const { vol, pan } = this._sp(pos, 1);
    const ch = this._chain(0.0001, pan);
    const cr = this._crackle(false);
    const hp = this._filter('highpass', 1800);
    cr.connect(hp); hp.connect(ch.g);
    const n = this._noise(false);
    const bp = this._filter('bandpass', 5000, 0.8);
    const hg = c.createGain();
    hg.gain.value = 0.25;
    n.connect(bp); bp.connect(hg); hg.connect(ch.g);
    this._env(ch.g.gain, t, 0.4 * vol, 0.02, 0.35);
    this._run(cr, t, 0.4, Math.random() * 2);
    this._run(n, t, 0.4);
  }

  /* ---------------- 1. ANAAR ---------------- */
  anarLoop(pos) {
    if (!this._ok()) return NOP;
    const c = this.ctx, t = c.currentTime;
    const { pan } = this._sp(pos, 1);
    const ch = this._chain(0.0001, pan);
    // "fsssss" hiss, shuru mein neeche se upar chadhta
    const n = this._noise(true);
    const bp = this._filter('bandpass', 1200, 0.6);
    bp.frequency.setValueAtTime(1200, t);
    bp.frequency.exponentialRampToValueAtTime(3200, t + 0.5);
    const hg = c.createGain();
    hg.gain.value = 0.7;
    n.connect(bp); bp.connect(hg); hg.connect(ch.g);
    // pop-pop
    const cr = this._crackle();
    const hp = this._filter('highpass', 1400);
    const cg = c.createGain();
    cg.gain.value = 1.0;
    cr.connect(hp); hp.connect(cg); cg.connect(ch.g);
    n.start(t, Math.random() * 1.5);
    cr.start(t, Math.random() * 2.5);
    return this._handle([n, cr], ch, 0.6);
  }

  /* ---------------- 2. CHAKRI ---------------- */
  chakriLoop(pos) {
    if (!this._ok()) return NOP;
    const c = this.ctx, t = c.currentTime;
    const { pan } = this._sp(pos, 1);
    const ch = this._chain(0.0001, pan);
    // ghoomta hiss: tremolo (~14 baar/sec) se "wuwuwu"
    const n = this._noise(true);
    const bp = this._filter('bandpass', 1800, 1.4);
    const am = c.createGain();
    am.gain.value = 0.55;
    n.connect(bp); bp.connect(am); am.connect(ch.g);
    const lfo = c.createOscillator();
    lfo.frequency.value = 14;
    const lg = c.createGain();
    lg.gain.value = 0.4;
    lfo.connect(lg); lg.connect(am.gain);
    // hiss ki pitch halki hilti hai
    const dr = c.createOscillator();
    dr.frequency.value = 0.7;
    const dg = c.createGain();
    dg.gain.value = 450;
    dr.connect(dg); dg.connect(bp.frequency);
    // halka motor tone, tez hota hua
    const mo = c.createOscillator();
    mo.type = 'sawtooth';
    mo.frequency.setValueAtTime(150, t);
    mo.frequency.linearRampToValueAtTime(220, t + 2.5);
    const ml = this._filter('lowpass', 700);
    const mg = c.createGain();
    mg.gain.value = 0.05;
    mo.connect(ml); ml.connect(mg); mg.connect(ch.g);
    // chingaari ke pop
    const cr = this._crackle();
    const hp = this._filter('highpass', 1200);
    const cg = c.createGain();
    cg.gain.value = 0.7;
    cr.connect(hp); hp.connect(cg); cg.connect(ch.g);
    n.start(t, Math.random() * 1.5);
    cr.start(t, Math.random() * 2.5);
    lfo.start(t); dr.start(t); mo.start(t);
    return this._handle([n, cr, lfo, dr, mo], ch, 0.65);
  }

  /* ---------------- 3. ROCKET ---------------- */
  rocketFly(pos) {
    if (!this._ok()) return NOP;
    const c = this.ctx, t = c.currentTime;
    const { pan } = this._sp(pos, 1);
    const ch = this._chain(0.0001, pan);
    // "fsssshh" upar chadhta
    const n = this._noise(true);
    const bp = this._filter('bandpass', 900, 0.9);
    bp.frequency.setValueAtTime(900, t);
    bp.frequency.exponentialRampToValueAtTime(3400, t + 1.2);
    const hg = c.createGain();
    hg.gain.value = 0.8;
    n.connect(bp); bp.connect(hg); hg.connect(ch.g);
    // seeti (whistle)
    const wh = c.createOscillator();
    wh.type = 'sine';
    wh.frequency.setValueAtTime(1100, t);
    wh.frequency.exponentialRampToValueAtTime(2600, t + 1.2);
    const vib = c.createOscillator();
    vib.frequency.value = 26;
    const vg = c.createGain();
    vg.gain.value = 35;
    vib.connect(vg); vg.connect(wh.frequency);
    const wg = c.createGain();
    wg.gain.value = 0.1;
    wh.connect(wg); wg.connect(ch.g);
    // chingaari ke pop
    const cr = this._crackle();
    const hp = this._filter('highpass', 2600);
    const cg = c.createGain();
    cg.gain.value = 0.5;
    cr.connect(hp); hp.connect(cg); cg.connect(ch.g);
    n.start(t, Math.random() * 1.5);
    cr.start(t, Math.random() * 2.5);
    wh.start(t); vib.start(t);
    return this._handle([n, cr, wh, vib], ch, 0.55);
  }

  // phatna: crack + thump + taaron ki tin-tin + chingaari ki sarsaraahat
  rocketBang(pos) {
    if (!this._ok()) return;
    const c = this.ctx, t = c.currentTime;
    const { vol, pan } = this._sp(pos, 1.7);
    const ch = this._chain(vol, pan);

    const n = this._noise(false);
    const bp = this._filter('bandpass', 2600, 0.4);
    const g1 = c.createGain();
    n.connect(bp); bp.connect(g1); g1.connect(ch.g);
    this._env(g1.gain, t, 0.9, 0.002, 0.07);
    this._run(n, t, 0.1);

    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(190, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.2);
    const g2 = c.createGain();
    o.connect(g2); g2.connect(ch.g);
    this._env(g2.gain, t, 0.7, 0.004, 0.2);
    this._run(o, t, 0.28);

    for (let i = 0; i < 6; i++) { // taare jhilmilate hain
      const st = t + 0.1 + i * 0.11 + Math.random() * 0.03;
      const p = c.createOscillator();
      p.type = 'sine';
      p.frequency.value = rnd(3200, 6200);
      const pg = c.createGain();
      p.connect(pg); pg.connect(ch.g);
      this._env(pg.gain, st, 0.07, 0.003, 0.14);
      this._run(p, st, 0.2);
    }

    const cr = this._crackle(false);
    const hp = this._filter('highpass', 2500);
    const g3 = c.createGain();
    cr.connect(hp); hp.connect(g3); g3.connect(ch.g);
    this._env(g3.gain, t + 0.04, 0.3, 0.03, 0.9);
    this._run(cr, t + 0.04, 1.0, Math.random() * 2);
  }

  /* ---------------- 4. BOMB ---------------- */
  // jalti fuse: sizzle + pop, jaise jaise phatne ka waqt aata hai tez aur unchi
  bombFuse(pos) {
    if (!this._ok()) return NOP;
    const c = this.ctx, t = c.currentTime;
    const { pan } = this._sp(pos, 1);
    const ch = this._chain(0.0001, pan);
    const cr = this._crackle();
    const hp = this._filter('highpass', 1800);
    const cg = c.createGain();
    cg.gain.value = 0.9;
    cr.connect(hp); hp.connect(cg); cg.connect(ch.g);
    const n = this._noise(true);
    const bp = this._filter('bandpass', 3500, 3);
    const hg = c.createGain();
    hg.gain.value = 0.35;
    n.connect(bp); bp.connect(hg); hg.connect(ch.g);
    cr.start(t, Math.random() * 2.5);
    n.start(t, Math.random() * 1.5);
    return this._handle([cr, n], ch, 0.7, (prog, now) => {
      bp.frequency.setTargetAtTime(3000 + prog * 3500, now, 0.1);
      hg.gain.setTargetAtTime(0.25 + 0.6 * prog, now, 0.1);
    });
  }

  // BOOM: tez crack + gehra boom + gadgadaahat + gunj, phir skull ki "whoooo"
  bombBoom(pos) {
    if (!this._ok()) return;
    const c = this.ctx, t = c.currentTime;
    const { vol, pan } = this._sp(pos, 2.4);
    const ch = this._chain(vol, pan);
    const send = c.createGain();
    send.gain.value = 0.45;
    ch.g.connect(send); send.connect(this.verb);

    const n1 = this._noise(false);
    const hp = this._filter('highpass', 900);
    const g1 = c.createGain();
    n1.connect(hp); hp.connect(g1); g1.connect(ch.g);
    this._env(g1.gain, t, 1.0, 0.002, 0.06);
    this._run(n1, t, 0.1);

    const ws = c.createWaveShaper();
    ws.curve = this.clipCurve;
    const g2 = c.createGain();
    ws.connect(g2); g2.connect(ch.g);
    const o1 = c.createOscillator();
    o1.type = 'sine';
    o1.frequency.setValueAtTime(120, t);
    o1.frequency.exponentialRampToValueAtTime(30, t + 0.6);
    const o2 = c.createOscillator();
    o2.type = 'triangle';
    o2.frequency.setValueAtTime(78, t);
    o2.frequency.exponentialRampToValueAtTime(28, t + 0.7);
    o1.connect(ws); o2.connect(ws);
    this._env(g2.gain, t, 0.9, 0.005, 0.9);
    this._run(o1, t, 1.0);
    this._run(o2, t, 1.0);

    const n2 = this._noise(false);
    const lp = this._filter('lowpass', 240, 1);
    const g3 = c.createGain();
    n2.connect(lp); lp.connect(g3); g3.connect(ch.g);
    this._env(g3.gain, t, 0.8, 0.01, 1.3);
    this._run(n2, t, 1.5, Math.random() * 0.4);

    this._skullFx(pos, t + 0.5);
  }

  // skull banne par bhootiya "whoooo"
  _skullFx(pos, st) {
    const c = this.ctx;
    const { vol, pan } = this._sp(pos, 1.2);
    const ch = this._chain(0.0001, pan);
    const n = this._noise(false);
    const bp = this._filter('bandpass', 700, 5);
    bp.frequency.setValueAtTime(700, st);
    bp.frequency.exponentialRampToValueAtTime(220, st + 0.9);
    const g = c.createGain();
    n.connect(bp); bp.connect(g); g.connect(ch.g);
    this._env(g.gain, st, 0.9, 0.25, 0.7);
    this._run(n, st, 1.0, Math.random() * 0.8);

    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(240, st);
    o.frequency.exponentialRampToValueAtTime(170, st + 0.9);
    const vib = c.createOscillator();
    vib.frequency.value = 6;
    const vg = c.createGain();
    vg.gain.value = 8;
    vib.connect(vg); vg.connect(o.frequency);
    const og = c.createGain();
    o.connect(og); og.connect(ch.g);
    this._env(og.gain, st, 0.35, 0.2, 0.7);
    this._run(o, st, 1.0);
    this._run(vib, st, 1.0);
    ch.g.gain.cancelScheduledValues(st);
    ch.g.gain.setValueAtTime(0.3 * vol, st);
  }
}