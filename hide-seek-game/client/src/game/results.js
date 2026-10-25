import { me } from '../player/self.js';
import { roomInfo } from './roomstate.js';
import { req } from '../ui/lobby/net.js';

export function roomDone(reason) {
  roomInfo.banner = reason === 'clear' ? 'ROOM CLEAR! Baaki rooms ka intezaar…' : 'TIME UP! Result aa raha hai…';
}

export function showRound(d) {
  const box = document.createElement('div');
  box.style.cssText = 'position:fixed;inset:0;z-index:80;background:rgba(5,3,2,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#ffe9c4;font:14px Arial;padding:12px;overflow:auto';
  const h = document.createElement('div');
  h.textContent = 'ROUND OVER';
  h.style.cssText = 'font:bold 24px Arial;letter-spacing:5px;color:#ffc247;margin-bottom:6px';
  box.append(h);
  d.rank.forEach((s, i) => {
    const row = document.createElement('div');
    const top = d.top.includes(s.pid);
    row.textContent = `${i + 1}. ${s.name}  (Team ${s.team}, Room ${s.room})  ·  ${s.kills} kills  ·  ${s.hs} HS${top ? '   ★ TOP 4' : ''}`;
    row.style.cssText = `padding:5px 10px;min-width:min(420px,92vw);border-left:3px solid ${top ? '#ffc247' : '#5a3d25'};background:${s.pid === me.id ? '#3b2410' : 'transparent'}`;
    box.append(row);
  });
  const note = document.createElement('div');
  note.textContent = 'Top 4 final military map me jayenge (agla step).';
  note.style.cssText = 'opacity:.7;margin:8px 0;font-size:12px';
  const b = document.createElement('button');
  b.textContent = 'LOBBY';
  b.style.cssText = 'padding:10px 28px;border:1px solid #c9a45a;background:#3a2412;color:#f0d9a0;font:bold 14px Arial';
  b.onclick = async () => { await req('lobby:leave'); location.reload(); };
  box.append(note, b);
  document.body.append(box);
}