import { ADS } from '../config.js';

const SOCIAL_H = 110; // height of the strip at the top for the social bar

// Ads are normal HTML (not drawn inside the game canvas).
// They are shown ONLY on the Home page and removed when the game starts.
export class Ads {
  constructor() {
    this.top = document.createElement('div');
    Object.assign(this.top.style, {
      position: 'fixed', top: '0', left: '0', right: '0', height: SOCIAL_H + 'px',
      zIndex: '20', display: 'none', overflow: 'hidden', boxSizing: 'border-box',
      paddingTop: 'env(safe-area-inset-top)',
    });
    this.bottom = document.createElement('div');
    Object.assign(this.bottom.style, {
      position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: '20',
      display: 'none', justifyContent: 'center', alignItems: 'flex-end',
      paddingBottom: 'env(safe-area-inset-bottom)',
    });
    document.body.append(this.top, this.bottom);
  }

  // the ad code runs inside its own iframe so it cannot disturb the game
  frame(html, w, h) {
    const f = document.createElement('iframe');
    f.width = String(w);
    f.height = String(h);
    f.setAttribute('scrolling', 'no');
    Object.assign(f.style, { border: '0', display: 'block', maxWidth: '100%' });
    f.srcdoc = `<!doctype html><html><head><meta charset="utf-8"></head>` +
      `<body style="margin:0;overflow:hidden;background:transparent">${html}</body></html>`;
    return f;
  }

  // grey box shown until you paste your real ad code in config.js
  placeholder(label, w, h) {
    const d = document.createElement('div');
    d.textContent = label;
    Object.assign(d.style, {
      width: typeof w === 'number' ? w + 'px' : w, height: h + 'px', maxWidth: '100%',
      margin: '8px auto 0', border: '2px dashed rgba(255,255,255,.35)',
      background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.65)',
      font: 'bold 13px Arial, sans-serif', display: 'flex', alignItems: 'center',
      justifyContent: 'center', boxSizing: 'border-box',
    });
    return d;
  }

  // run <script> tags from pasted ad code in the main page
  injectScripts(parent, html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    for (const old of tmp.querySelectorAll('script')) {
      const s = document.createElement('script');
      for (const a of old.attributes) s.setAttribute(a.name, a.value);
      s.text = old.textContent;
      parent.appendChild(s);
    }
  }

  show() {
    if (!ADS.enabled) return;
    this.hide();

    // bottom: banner (728x90 on wide screens if you set bannerWideHtml, else 320x50)
    const wide = window.innerWidth >= 760 && ADS.bannerWideHtml.trim() !== '';
    const bw = wide ? 728 : 320, bh = wide ? 90 : 50;
    const bannerHtml = (wide ? ADS.bannerWideHtml : ADS.bannerHtml).trim();
    this.bottom.style.display = 'flex';
    this.bottom.appendChild(bannerHtml ? this.frame(bannerHtml, bw, bh) : this.placeholder('BANNER AD', bw, bh));

    // top: social bar
    const socialHtml = ADS.socialHtml.trim();
    this.top.style.display = 'block';
    if (!socialHtml) this.top.appendChild(this.placeholder('SOCIAL BAR AD', '92%', 56));
    else if (ADS.socialMode === 'page') this.injectScripts(this.top, socialHtml);
    else this.top.appendChild(this.frame(socialHtml, '100%', SOCIAL_H));
  }

  hide() {
    this.top.replaceChildren();
    this.bottom.replaceChildren();
    this.top.style.display = 'none';
    this.bottom.style.display = 'none';
  }
}