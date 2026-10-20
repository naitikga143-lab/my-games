let cleanup = null;

export function el(tag, cls = '', html = '') {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

// onLeave: screen badalte waqt chalta hai (avatar band karne ke liye)
export function show(node, onLeave) {
  cleanup?.();
  cleanup = onLeave || null;
  document.getElementById('app').replaceChildren(node);
}

export function toast(msg) {
  const t = el('div', 'toast');
  t.textContent = msg;
  document.body.append(t);
  setTimeout(() => t.remove(), 2600);
}