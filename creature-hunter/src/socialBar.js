/*
  Social Bar ad: sirf menu ki screens par (title, home, searching, lobby, customize), match ke andar kabhi nahi.

  Social Bar ki script apne aap page par apna bar laga deti hai, aur use hatane ka koi tareeka nahi deti.
  Isliye hum ye karte hain:
   1. Script ko sirf tab load karte hain jab menu dikhta hai.
   2. Jo bhi element ye (kisi doosri website ki) script page mein daalti hai, use pehchan kar `data-social-bar`
      laga dete hain. Pehchan: DOM mein daalne wale code ke stack mein hamare domain se alag kisi site ka link ho.
      Hamare apne code (menu, HUD, touch buttons) par ye kabhi nahi lagta.
   3. Match shuru hote hi (countdown ke saath) saare aise elements chhup jate hain, aur match ke andar baad mein
      naye bane elements bhi chhup jate hain. "Back to lobby" par page reload hota hai, to menu mein bar wapas aa jata hai.

  SRC mein Adsterra se mila <script src="..."> ka link daalo. Khali ho to kuch nahi hota.
*/
const SRC = 'https://bauval.org/14/72da908a92cb60b3904a42d730db809c'; // Adsterra Social Bar script

let patched = false;
let loaded = false;
let ended = false;

const OWN_HOST = location.host;

// DOM mein daalne wala code kisi doosri website ki script se chal raha hai?
function fromThirdParty() {
  const lim = Error.stackTraceLimit;
  Error.stackTraceLimit = 30;
  const st = new Error().stack || '';
  Error.stackTraceLimit = lim;
  const urls = st.match(/https?:\/\/[^\s)'"]+/g);
  if (!urls) return false;
  return urls.some((u) => {
    try { return new URL(u).host !== OWN_HOST; } catch (e) { return false; }
  });
}

function patchDom() {
  if (patched) return;
  patched = true;
  const wrap = (proto, name) => {
    const orig = proto[name];
    if (typeof orig !== 'function') return;
    proto[name] = function (...args) {
      if (!fromThirdParty() || !document.body) return orig.apply(this, args);
      const before = new Set(document.body.children);
      const r = orig.apply(this, args);
      for (const el of document.body.children) if (!before.has(el)) el.setAttribute('data-social-bar', '1');
      return r;
    };
  };
  for (const n of ['appendChild', 'insertBefore']) wrap(Node.prototype, n);
  for (const n of ['append', 'prepend', 'before', 'after', 'replaceWith', 'insertAdjacentElement', 'insertAdjacentHTML']) wrap(Element.prototype, n);

  const st = document.createElement('style');
  st.textContent = 'html.sb-off [data-social-bar]{display:none!important}';
  document.head.appendChild(st);
}

function load() {
  if (loaded || ended || !SRC || (import.meta.env && import.meta.env.DEV)) return; // laptop par test ke waqt ad nahi
  loaded = true;
  patchDom();
  const s = document.createElement('script');
  s.src = SRC;
  s.async = true;
  s.setAttribute('data-cfasync', 'false'); // Adsterra ke code mein jaisa tha waisa
  document.body.appendChild(s);
}

// menu ki screens par true (dikhao), countdown par false (chhupao)
export function setSocialBar(visible) {
  if (ended) return;
  document.documentElement.classList.toggle('sb-off', !visible);
  if (visible) load();
}

// match shuru: bar hamesha ke liye hata do (page reload tak)
export function endSocialBar() {
  ended = true;
  document.documentElement.classList.add('sb-off');
  for (const el of document.querySelectorAll('[data-social-bar]')) el.remove();
}