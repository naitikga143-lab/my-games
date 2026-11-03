import * as THREE from 'three';
import { createGrass } from './grass.js';
import { Player } from './player.js';
import { TouchControls } from './touch.js';
import { createTrees } from './trees.js';
import { createCreatures } from './creature.js';
import { createMoon } from './moon.js';
import { CameraRig } from './cameraRig.js';
import { RocketSystem, WEAPON } from './weapon.js';
import { Fireworks } from './fireworks.js';
import { CrackerSystem, PlayerHealth } from './crackers.js';
import { setupLandscape } from './landscape.js';
import { MatchHud } from './matchHud.js'
import { RemotePlayer } from './remotePlayer.js';

const isTouch = TouchControls.isTouchDevice();

const _lead = new THREE.Vector3();

function popup(text, color) {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.cssText = `position:fixed;left:50%;top:34%;transform:translate(-50%,0);z-index:45;pointer-events:none;
    font:800 clamp(20px,4vw,34px) system-ui,sans-serif;color:${color};text-shadow:0 2px 6px #000`;
  document.body.appendChild(el);
  el.animate(
    [{ opacity: 1, transform: 'translate(-50%,0) scale(1.3)' }, { opacity: 0, transform: 'translate(-50%,-40px) scale(1)' }],
    { duration: 700, easing: 'ease-out' }
  ).onfinish = () => el.remove();
}

/* ================== CONFIG (yahan se tune karo) ================== */
const CFG = {
  exposure: 1.25,          // overall brightness
  moonIntensity: 2.2,      // chaand ki roshni (main light)
  ambientIntensity: 1.1,   // aasman ki halki roshni
  lanternIntensity: 40,    // player ki lantern
  fogNear: 25,
  fogFar: 140,
  fogColor: 0x16264d,

  starCount: isTouch ? 350 : 700,
  treeCount: isTouch ? 9 : 12,    // banyan bade hain, aur player ke paas hain
  treeMinDist: 26,
  treeArea: 85,                   // trees is radius ke andar (pehle 190)
  treeShadows: false,
  creatureCount: 5,
  creatureMaxRadius: 38,          // creatures player se is doori tak (pehle door the)
};

/* ================== RENDERER ================== */
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = CFG.exposure;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(CFG.fogColor);
scene.fog = new THREE.Fog(CFG.fogColor, CFG.fogNear, CFG.fogFar);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1200);

/* ================== SKY, STARS, MOON ================== */
const sky = new THREE.Group();
scene.add(sky);

const dome = new THREE.Mesh(
  new THREE.SphereGeometry(500, 32, 16),
  new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uTop: { value: new THREE.Color(0x040a1f) },
      uHorizon: { value: new THREE.Color(CFG.fogColor) },
    },
    vertexShader: /* glsl */ `
      varying vec3 vPos;
      void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop; uniform vec3 uHorizon; varying vec3 vPos;
      void main() {
        float h = clamp(normalize(vPos).y, 0.0, 1.0);
        gl_FragColor = vec4(mix(uHorizon, uTop, pow(h, 0.55)), 1.0);
        #include <colorspace_fragment>
      }
    `,
  })
);
dome.renderOrder = -2;
sky.add(dome);

{
  const N = CFG.starCount;
  const arr = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * 0.97 + 0.03;
    const r = Math.sqrt(1 - v * v);
    arr[i * 3] = Math.cos(u) * r * 450;
    arr[i * 3 + 1] = v * 450;
    arr[i * 3 + 2] = Math.sin(u) * r * 450;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  const stars = new THREE.Points(g, new THREE.PointsMaterial({
    color: 0xffffff, size: 1.8, sizeAttenuation: false, fog: false,
    transparent: true, opacity: 0.85, depthWrite: false,
  }));
  stars.renderOrder = -1;
  sky.add(stars);
}

const moonDir = new THREE.Vector3(-0.55, 0.65, 0.35).normalize();
sky.add(createMoon({ dir: moonDir, distance: 380, radius: 16 }).group);

/* ================== LIGHTS (main light pehle jaisi) ================== */
scene.add(new THREE.HemisphereLight(0x6f8fd8, 0x1c3a28, CFG.ambientIntensity));

const moonLight = new THREE.DirectionalLight(0xaec4ff, CFG.moonIntensity);
moonLight.castShadow = true;
moonLight.shadow.mapSize.set(isTouch ? 1024 : 2048, isTouch ? 1024 : 2048);
const sc = moonLight.shadow.camera;
sc.left = -20; sc.right = 20; sc.top = 20; sc.bottom = -20; sc.near = 1; sc.far = 200;
moonLight.shadow.bias = -0.0005;
moonLight.shadow.normalBias = 0.05;
scene.add(moonLight);
scene.add(moonLight.target);

/* ================== GROUND ================== */
function groundTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#b9cdb9';
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 5000; i++) {
    const v = 90 + Math.random() * 165;
    g.fillStyle = `rgba(${v * 0.75},${v},${v * 0.7},0.35)`;
    g.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(150, 150);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(1200, 1200),
  new THREE.MeshStandardMaterial({ color: 0x2a6a38, map: groundTexture(), roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

/* ================== GRASS (jhund, door-door) ================== */
const grass = createGrass({
  count: isTouch ? 50000 : 140000,
  size: 90,
  tuftSize: 140,   // bada = kam jhund, ghane
  tuftGap: 2.2,    // jhundon ke beech kam se kam doori
});
scene.add(grass.mesh);

/* ================== BANYAN TREES (player ke paas) ================== */
const TP = window.MATCH && window.MATCH.trees; // server ke params => dono ko same trees
const trees = createTrees(TP
  ? {
      count: TP.count, minDist: TP.minDist, area: TP.area, clearRadius: TP.clearRadius,
      nearCount: TP.nearCount, seed: TP.seed, castShadow: CFG.treeShadows,
    }
  : {
      count: CFG.treeCount, minDist: CFG.treeMinDist, area: CFG.treeArea, clearRadius: 9,
      nearCount: 3, castShadow: CFG.treeShadows,
    });
scene.add(trees.group);

// Red bayein, Blue dayein. Solo/offline mein beech mein.
function spawnPoint() {
  const side = window.MATCH ? (window.MATCH.you === 'blue' ? 1 : -1) : 0;
  return { x: side * 6 + (Math.random() - 0.5) * 3, z: (Math.random() - 0.5) * 4 };
}

/* ================== FIREWORKS + CREATURES ================== */
const fireworks = new Fireworks(scene);
/* ================== PLAYER HP + CRACKERS ================== */
const health = new PlayerHealth({
  max: 100,
  respawnS: 5,
  onDeath: () => { if (matchHud) matchHud.died(); }, // score zero
  onRespawn: () => {
    const sp = spawnPoint();
    player.root.position.set(sp.x, 0, sp.z);
    player.velocity.set(0, 0, 0);
    crackers.clear();
  },
});
const crackers = new CrackerSystem(scene, {
  onHit: (dmg, kind) => {
    if (health.damage(dmg, kind)) {
      player.hurt = 1;
      crackers.shake = Math.max(crackers.shake, 0.3);
    }
  },
  onHeal: (n) => health.heal(n),
});

const matchHud = window.MATCH ? new MatchHud(window.MATCH) : null; // sirf lobby match mein
let matchOver = false;
let celebT = 0;
const _cel = new THREE.Vector3();

const creatures = createCreatures({
  count: CFG.creatureCount,
  clearRadius: 12,
  maxRadius: CFG.creatureMaxRadius,
  fireworks,
  crackers,
  respawnTime: 8,
});
scene.add(creatures.group);

/* ================== ROCKETS ================== */
const rockets = new RocketSystem(scene, {
  hit: (p) => trees.hit(p),
  creatureHit: (a, b) => creatures.hitSegment(a, b),
  bubbleHit: (a, b) => crackers.bubbleHit(a, b),
  onCreatureHit: (info) => {
    const killed = creatures.hit(info, player.root.position); // 'head' | 'body' | null
    rig.pulse();
    popup(info.part === 'head' ? 'HEADSHOT!' : 'HIT', info.part === 'head' ? '#ffd23a' : '#ffffff');
    if (killed && matchHud && !health.dead && !matchOver) matchHud.kill(killed); // points
  },
});

/* ================== PLAYER ================== */
const player = new Player();
player.rockets = rockets;
scene.add(player.root);

let remote = null;
let netT = 0;
if (window.NET && window.MATCH) {
  const oppColor = window.MATCH.you === 'red' ? 'blue' : 'red';
  remote = new RemotePlayer(scene, oppColor, (o, d) => {
    rockets.launch(o, d, true); // sirf dikhane ke liye
    rockets.blast(o, d);
  });
  window.NET.on('opp', (m) => remote.setState(m));
  window.NET.on('oppStatus', (m) => remote.setVisible(m.connected));
}

const lantern = new THREE.PointLight(0xffd9a8, CFG.lanternIntensity, 30, 2);
lantern.position.set(0, 3.0, 0.4);
player.root.add(lantern);

/* ================== INPUT ================== */
const keys = {};
const touch = new TouchControls();
const rig = new CameraRig(camera, { mode: 'third', dist: 4.3 });
{
  // shuru mein apni side par, ek-doosre ki taraf muh
  const sp = spawnPoint();
  player.root.position.set(sp.x, 0, sp.z);
  if (window.MATCH) {
    rig.yaw = window.MATCH.you === 'blue' ? Math.PI / 2 : -Math.PI / 2;
    player.facing = rig.yaw + Math.PI;
    player.root.rotation.y = player.facing;
  }
}
const landscape = setupLandscape({ isTouch });
const applyFov = () => {
  // landscape mein screen bahut chaudi hoti hai, isliye vertical FOV kam
  rig.fovOffset = isTouch && window.innerWidth > window.innerHeight ? -12 : 0;
};
applyFov();

let mouseFire = false;
let touchFire = false;

window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyV' && !e.repeat) rig.toggle(); // camera mode badlo
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });
window.addEventListener('blur', () => {
  for (const k in keys) keys[k] = false;
  mouseFire = false;
});

// mouse: left click = fire
window.addEventListener('contextmenu', (e) => e.preventDefault());
window.addEventListener('mousedown', (e) => {
  if (document.pointerLockElement !== renderer.domElement) return;
  if (e.button === 0) mouseFire = true;
});
window.addEventListener('mouseup', (e) => {
  if (e.button === 0) mouseFire = false;
});

// touch buttons (AIM button hata diya)
touch.addButton({
  label: 'FIRE', slot: 'main',
  onPress: () => { touchFire = true; },
  onRelease: () => { touchFire = false; },
});
touch.addButton({ label: 'CAM', slot: 1, onPress: () => rig.toggle() });

const getInput = () => {
  if (health.dead || matchOver) return { forward: 0, right: 0, sprint: false, jump: false, fire: false, reload: false };
  const kb = {
    forward: (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0),
    right: (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0),
    sprint: !!(keys.ShiftLeft || keys.ShiftRight),
    jump: !!keys.Space,
  };
  const t = touch.input;
  return {
    forward: THREE.MathUtils.clamp(kb.forward + t.forward, -1, 1),
    right: THREE.MathUtils.clamp(kb.right + t.right, -1, 1),
    sprint: kb.sprint || t.sprint,
    jump: kb.jump || t.jump,
    fire: mouseFire || touchFire,
    reload: !!keys.KeyR,
  };
};

/* ================== CAMERA / MOUSE ================== */
const overlay = document.getElementById('overlay');
if (touch.enabled && overlay) overlay.style.display = 'none';
overlay?.addEventListener('click', () => renderer.domElement.requestPointerLock());
document.addEventListener('pointerlockchange', () => {
  if (touch.enabled || !overlay) return;
  overlay.style.display = document.pointerLockElement === renderer.domElement ? 'none' : 'flex';
});
document.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement !== renderer.domElement) return;
  rig.addLook(e.movementX * 0.0025, e.movementY * 0.0025);
});
window.addEventListener('wheel', (e) => rig.zoom(e.deltaY * 0.004));

/* ================== LOOP ================== */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  applyFov();
});

if (window.NET) {
  window.NET.on('end', () => {
    matchOver = true;
    crackers.clear();
    touch.setVisible(false); // warna touch zones result button ke upar aa jaate hain
    if (matchHud) matchHud.hide();
    health.hud.style.display = 'none';
    health.msgEl.style.display = 'none';
    rig._crosshair.style.display = 'none';
  });
}

const clock = new THREE.Clock();
function tick() {
  requestAnimationFrame(tick);
  if (landscape.blocked) { clock.getDelta(); return; } // portrait mein game pause
  const dt = Math.min(clock.getDelta(), 0.05);
  const time = clock.elapsedTime;

  const look = touch.consumeLook();
  rig.addLook(look.x, look.y);

  player.update(dt, getInput(), rig.yaw, time);
  trees.collide(player.root.position, 0.45);
  creatures.update(dt, time, player.root.position, (p, r) => trees.collide(p, r), camera);
  rig.update(dt, player);
  health.update(dt);
  crackers.enabled = !health.dead && !matchOver;
  crackers.update(dt, time, player.root.position, camera, health.hp);

  if (matchHud) matchHud.update();

  if (remote) {
    remote.update(dt, time);
    netT -= dt;
    if (netT <= 0 && !matchOver) {
      netT = 0.05; // 20 baar/sec
      const q = (v) => Math.round(v * 100) / 100;
      const pp = player.root.position, ap = player.aimPoint;
      window.NET.send({
        t: 'pstate', x: q(pp.x), y: q(pp.y), z: q(pp.z), f: q(player.facing), cy: q(rig.yaw),
        ax: q(ap.x), ay: q(ap.y), az: q(ap.z), vy: q(player.velocity.y), hs: q(player.hSpeed), am: player.ammo,
      });
    }
  }

  // celebration: jeet ke baad aasman mein skyshots
  if (matchOver) {
    celebT -= dt;
    if (celebT <= 0) {
      celebT = 1.6;
      _cel.copy(player.root.position).addScaledVector(rig.dir, 22 + Math.random() * 14);
      _cel.x += (Math.random() - 0.5) * 30;
      _cel.z += (Math.random() - 0.5) * 30;
      _cel.y = 0;
      fireworks.show(fireworks.plan(player.root.position, _cel));
    }
  }

  // crosshair ke aage creature? => laal crosshair, aur rocket seedha creature par
  const target = creatures.raycast(camera.position, rig.dir, 120);
  rig.setTargeting(target ? target.part : false);
  if (target) {
    player.aimPoint.copy(target.point);
    // chalte creature par thoda aage ka nishana
    target.creature.getVelocity(_lead);
    const flight = Math.max(1, target.point.distanceTo(player.root.position)) / WEAPON.SPEED;
    player.aimPoint.addScaledVector(_lead, flight);
  }

  rockets.update(dt, time, camera);
  fireworks.update(dt, camera);

  // dhamake ka camera shake
  const shk = Math.max(rockets.shake, crackers.shake);
  if (shk > 0) {
    const k = shk * 0.12;
    camera.position.x += (Math.random() - 0.5) * k;
    camera.position.y += (Math.random() - 0.5) * k;
    camera.position.z += (Math.random() - 0.5) * k;
  }

  // moon light + shadow player ke saath chalte hain
  const pp = player.root.position;
  moonLight.position.copy(pp).addScaledVector(moonDir, 80);
  moonLight.target.position.copy(pp);

  grass.update(time, pp);
  sky.position.copy(camera.position);

  renderer.render(scene, camera);
}
tick();