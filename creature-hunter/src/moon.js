import * as THREE from 'three';

/*
  createMoon({ dir, distance, radius })
  Sirf dikhne wala chaand (texture + glow). Asli roshni (DirectionalLight) main.js mein
  pehle jaisi hi hai, isliye lighting mein koi farak nahi padega.
  `group` ko sky group mein add karo.
*/
export function createMoon({ dir, distance = 380, radius = 16 } = {}) {
  const group = new THREE.Group();

  /* ---------- texture (maria + craters) ---------- */
  const W = 512, H = 256;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');

  let seed = 12345;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  ctx.fillStyle = '#efe6cc';
  ctx.fillRect(0, 0, W, H);

  // x ke dono taraf bhi draw karte hain taaki texture ka seam na dikhe
  const wrap = (fn) => { fn(0); fn(-W); fn(W); };

  // bade dhabbe (maria)
  for (let i = 0; i < 10; i++) {
    const x = rnd() * W, y = 50 + rnd() * (H - 100), r = 28 + rnd() * 40, a = 0.22 + rnd() * 0.18;
    wrap((o) => {
      const g = ctx.createRadialGradient(x + o, y, 0, x + o, y, r);
      g.addColorStop(0, `rgba(112,112,128,${a})`);
      g.addColorStop(1, 'rgba(112,112,128,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x + o, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // craters
  for (let i = 0; i < 90; i++) {
    const x = rnd() * W, y = 12 + rnd() * (H - 24), r = 2 + rnd() * rnd() * 14;
    wrap((o) => {
      ctx.fillStyle = 'rgba(95,95,112,0.32)';
      ctx.beginPath();
      ctx.arc(x + o, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,252,238,0.35)';
      ctx.lineWidth = Math.max(1, r * 0.18);
      ctx.beginPath();
      ctx.arc(x + o - r * 0.12, y - r * 0.12, r, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 40, 20),
    new THREE.MeshBasicMaterial({ map: tex, color: 0xfff2d0, fog: false, toneMapped: false })
  );
  group.add(mesh);

  /* ---------- glow (andar ka + bahar ka halo) ---------- */
  const glowTex = (stops) => {
    const g = document.createElement('canvas');
    g.width = g.height = 128;
    const x = g.getContext('2d');
    const grd = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    stops.forEach(([p, col]) => grd.addColorStop(p, col));
    x.fillStyle = grd;
    x.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(g);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };

  const makeGlow = (tex2, scale, opacity) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex2, transparent: true, depthWrite: false, fog: false, toneMapped: false,
      blending: THREE.AdditiveBlending, opacity,
    }));
    sp.scale.setScalar(scale);
    return sp;
  };

  group.add(makeGlow(glowTex([
    [0, 'rgba(255,248,220,0.9)'], [0.25, 'rgba(200,220,255,0.35)'], [1, 'rgba(150,180,255,0)'],
  ]), radius * 9, 0.75));
  group.add(makeGlow(glowTex([
    [0, 'rgba(170,195,255,0.35)'], [1, 'rgba(120,150,255,0)'],
  ]), radius * 20, 0.35));

  if (dir) group.position.copy(dir).normalize().multiplyScalar(distance);

  return { group, mesh };
}