import { el, show } from './dom.js';

export function rules(next) {
  const s = el('div', 'screen rules');
  const board = el('div', 'board');
  board.append(el('h2', '', 'RULES'));
  board.append(el('div', 'rules-body'));   // <- yahan baad me rules likhenge
  s.append(board);
  const b = el('button', 'btn big-btn', 'Continue');
  b.onclick = next;
  s.append(b);
  show(s);
}