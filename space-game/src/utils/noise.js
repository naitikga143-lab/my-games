function hash(x, y, s) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(s, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
const smooth = t => t * t * (3 - 2 * t);

function valueNoise(x, y, px, py, seed) {
  const x0 = Math.floor(x), y0 = Math.floor(y);
  const fx = smooth(x - x0), fy = smooth(y - y0);
  const xa = ((x0 % px) + px) % px, xb = (xa + 1) % px;
  const ya = ((y0 % py) + py) % py, yb = (ya + 1) % py;
  const a = hash(xa, ya, seed), b = hash(xb, ya, seed);
  const c = hash(xa, yb, seed), d = hash(xb, yb, seed);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

// u, v: 0..1. Result tiles seamlessly.
export function fbm(u, v, baseX, baseY, octaves, seed) {
  let sum = 0, amp = 0.5, total = 0, fx = baseX, fy = baseY;
  for (let o = 0; o < octaves; o++) {
    sum += amp * valueNoise(u * fx, v * fy, fx, fy, seed + o);
    total += amp;
    amp *= 0.5; fx *= 2; fy *= 2;
  }
  return sum / total;
}