import { box } from './builders.js';
import { mats } from './materials.js';
import { T } from './dims.js';
import { makeDoor } from './props/door.js';

const POST = 0.4, GAP = 4, DOOR_H = 2.4;

export function wall(p, x1, z1, x2, z2, y0, h, solid = true) {
  const alongX = z1 === z2;
  const len = alongX ? Math.abs(x2 - x1) : Math.abs(z2 - z1);
  if (len < 0.01) return;
  const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2, cy = y0 + h / 2;

  box(p, alongX ? len : T, h, alongX ? T : len, cx, cy, cz, mats.plank, solid);

  const bx = alongX ? len : T + 0.1;
  const bz = alongX ? T + 0.1 : len;
  box(p, bx, 0.25, bz, cx, y0 + h - 0.125, cz, mats.post);
  box(p, bx, 0.15, bz, cx, y0 + 1.0, cz, mats.post);
  box(p, bx, 0.3, bz, cx, y0 + 0.15, cz, mats.post);

  const n = Math.max(1, Math.round(len / GAP));
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    box(p, POST, h, POST, x1 + (x2 - x1) * t, cy, z1 + (z2 - z1) * t, mats.post);
  }
}

// at = darwaaze ki jagah (x ya z), x1<x2 aur z1<z2 rakhna
export function wallWithDoor(p, x1, z1, x2, z2, y0, h, at, dw = 2.2) {
  const alongX = z1 === z2;
  const hw = dw / 2;
  const top = h - DOOR_H;
  if (alongX) {
    wall(p, x1, z1, at - hw, z2, y0, h);
    wall(p, at + hw, z1, x2, z2, y0, h);
    box(p, dw, top, T, at, y0 + DOOR_H + top / 2, z1, mats.plank);
    makeDoor(p, at, y0, z1, 0);
  } else {
    wall(p, x1, z1, x2, at - hw, y0, h);
    wall(p, x1, at + hw, x2, z2, y0, h);
    box(p, T, top, dw, x1, y0 + DOOR_H + top / 2, at, mats.plank);
    makeDoor(p, x1, y0, at, Math.PI / 2);
  }
}