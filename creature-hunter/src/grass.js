import * as THREE from 'three';

/**
 * Forest-style grass: ek-saman carpet nahi, balki JHUND (tufts) door-door par.
 * Beech mein khaali zameen, aur kuch ilaake poore ghaas-rahit.
 * Hawa mein hilti hain, player ke paas se daab jaati hain, aur player ke saath "wrap" hoti hain.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform vec3 uPlayer;
  attribute vec2 aOffset;
  attribute vec3 aRand;
  varying float vY;
  varying float vRand;
  varying vec2 vWorld;
  #include <fog_pars_vertex>

  void main() {
    float y = position.y;

    // player ke around wrap karo (infinite grass)
    vec2 rel = mod(aOffset - uPlayer.xz + uSize * 0.5, uSize) - uSize * 0.5;
    vec2 world = rel + uPlayer.xz;
    float dist = length(rel);
    float fade = 1.0 - smoothstep(uSize * 0.32, uSize * 0.48, dist);

    float height = (0.35 + aRand.x * 0.7) * fade;
    float w = position.x * 0.085 * (1.0 - y * 0.9);
    float ca = cos(aRand.y * 6.2831);
    float sa = sin(aRand.y * 6.2831);

    vec3 pos = vec3(world.x + w * ca, y * height, world.y + w * sa);

    // hawa
    float bend = y * y;
    float wind = sin(uTime * 1.6 + world.x * 0.30 + world.y * 0.22 + aRand.z * 6.2831) * 0.10
               + sin(uTime * 0.6 + world.x * 0.05 - world.y * 0.07) * 0.14;
    float lean = (aRand.z - 0.5) * 0.25;
    pos.x += (wind + lean) * bend * height * 1.4;
    pos.z += (wind * 0.6 - lean) * bend * height * 1.4;

    // player ke paas ghaas daab jaye
    vec2 d = world - uPlayer.xz;
    float dl = length(d);
    float push = 1.0 - smoothstep(0.0, 1.5, dl);
    pos.xz += (d / max(dl, 0.001)) * push * bend * height * 0.9;
    pos.y -= push * bend * height * 0.35;

    vY = y;
    vRand = aRand.x;
    vWorld = world;

    vec4 mvPosition = viewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uTip;
  uniform vec3 uPlayer;
  varying float vY;
  varying float vRand;
  varying vec2 vWorld;
  #include <fog_pars_fragment>

  void main() {
    vec3 col = mix(uBase, uTip, pow(vY, 0.8));
    col *= 0.75 + vRand * 0.5;
    col = mix(col, col * vec3(1.25, 1.1, 0.65), vRand * 0.3);
    col += vec3(0.03, 0.06, 0.12) * vY;
    float glow = 1.0 - smoothstep(0.0, 18.0, distance(vWorld, uPlayer.xz));
    col += vec3(1.0, 0.78, 0.45) * glow * 0.32 * (0.25 + vY);

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;

/*
  count     : total blades
  size      : grass tile ka size (player ke saath wrap hota hai)
  tuftSize  : ek jhund mein kitne blades (bada = kam jhund, ghane)
  tuftGap   : do jhund ke beech kam se kam doori (metres)
  spread    : ek jhund kitna phaila (gaussian sigma, metres)
*/
export function createGrass({ count = 30000, size = 60, tuftSize = 140, tuftGap = 2.2, spread = 0.4 } = {}) {
  const blade = new THREE.PlaneGeometry(1, 1, 1, 4);
  blade.translate(0, 0.5, 0);

  const geo = new THREE.InstancedBufferGeometry();
  geo.index = blade.index;
  geo.setAttribute('position', blade.attributes.position);
  geo.instanceCount = count;

  const TAU = Math.PI * 2;
  // bade ilaake: kahin ghaas, kahin khaali (periodic => tile ke kinaare par bhi seamless)
  const mask = (x, z) => {
    const u = (x / size) * TAU, v = (z / size) * TAU;
    return 0.5 + 0.25 * Math.sin(u * 2 + 1.3) * Math.cos(v * 3 + 0.4) + 0.25 * Math.sin(u * 3 - v * 2 + 2.1);
  };

  // jhund ke centers: door-door, khaali ilaakon mein nahi
  const nTufts = Math.max(1, Math.floor(count / tuftSize));
  const cell = tuftGap;
  const grid = new Map();
  const key = (cx, cz) => `${cx},${cz}`;
  const centers = [];
  for (let tries = 0; centers.length < nTufts && tries < nTufts * 60; tries++) {
    const x = Math.random() * size, z = Math.random() * size;
    if (mask(x, z) < 0.42) continue;
    const cx = Math.floor(x / cell), cz = Math.floor(z / cell);
    let ok = true;
    for (let i = -1; i <= 1 && ok; i++) {
      for (let j = -1; j <= 1 && ok; j++) {
        const arr = grid.get(key(cx + i, cz + j));
        if (!arr) continue;
        for (const c of arr) {
          const dx = c.x - x, dz = c.z - z;
          if (dx * dx + dz * dz < tuftGap * tuftGap) { ok = false; break; }
        }
      }
    }
    if (!ok) continue;
    const c = { x, z, h: Math.pow(Math.random(), 1.4), r: 0.7 + Math.random() * 0.8 };
    centers.push(c);
    const k = key(cx, cz);
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(c);
  }
  if (!centers.length) centers.push({ x: size / 2, z: size / 2, h: 0.5, r: 1 });

  const gauss = () => {
    const u = 1 - Math.random(), v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
  };

  const offsets = new Float32Array(count * 2);
  const rands = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const c = centers[i % centers.length];
    const gx = THREE.MathUtils.clamp(gauss(), -2.2, 2.2) * spread * c.r;
    const gz = THREE.MathUtils.clamp(gauss(), -2.2, 2.2) * spread * c.r;
    offsets[i * 2] = c.x + gx;      // tile ke bahar jaana theek hai: shader mein mod() hai
    offsets[i * 2 + 1] = c.z + gz;
    rands[i * 3] = THREE.MathUtils.clamp(c.h * 0.75 + Math.random() * 0.25, 0, 1); // jhund ka height
    rands[i * 3 + 1] = Math.random();
    rands[i * 3 + 2] = Math.random();
  }
  geo.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 2));
  geo.setAttribute('aRand', new THREE.InstancedBufferAttribute(rands, 3));

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uTime: { value: 0 },
        uSize: { value: size },
        uPlayer: { value: new THREE.Vector3() },
        uBase: { value: new THREE.Color(0x14401f) },
        uTip: { value: new THREE.Color(0x5fae4d) },
      },
    ]),
  });

  const mesh = new THREE.Mesh(geo, material);
  mesh.frustumCulled = false;

  return {
    mesh,
    update(time, playerPos) {
      material.uniforms.uTime.value = time;
      material.uniforms.uPlayer.value.copy(playerPos);
    },
  };
}