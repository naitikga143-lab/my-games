import { createRenderer } from './core/renderer.js';
import { startLoop } from './core/loop.js';
import { addLights } from './world/lights.js';
import { buildHall } from './world/hall.js';
import { buildRooms } from './world/rooms.js';
import { buildStairs } from './world/stairs.js';
import { placeProps } from './world/props/layout.js';
import { buildLamps } from './world/lamps.js';
import { buildDecor } from './world/decor.js';
import { mergeStatic } from './world/merge.js';
import { createControls } from './player/controls.js';
import { createCharacter } from './player/model.js';
import { setupTouch } from './player/touch.js';
import { setWeapon, setScope } from './player/input.js';
import { initTracers, updateTracers } from './game/tracers.js';
import { initHud } from './game/hud.js';
import { initVfx } from './game/vfx.js';
import { initShop } from './game/shopui.js';
import { initCrosshair } from './game/crosshair.js';
import { initScopeUi } from './game/scopeui.js';
import { eco } from './game/economy.js';
import { WEAPONS, SCOPES } from './game/weapondata.js';
import { createBots } from './bots/manager.js';
import { initNet } from './game/netsync.js';
import { req } from './ui/lobby/net.js';
import { toast } from './ui/dom.js';
import { me } from './player/self.js';
import { initFwVfx } from './game/fwvfx.js';
import { initFx } from './game/fix.js';

// dev mode (?dev=game) me shop ka local hisaab
function localBuy(i) {
  const w = WEAPONS[i];
  if (eco.owned[i]) return;
  if (me.coins < w.price) return toast(`${w.name} ke liye ${w.price} coins chahiye`);
  me.coins -= w.price;
  eco.owned[i] = true;
  setWeapon(i);
}
function localBuyScope(i) {
  const s = SCOPES[i];
  if (eco.scopes[i]) return;
  if (me.coins < s.price) return toast(`${s.name} ke liye ${s.price} coins chahiye`);
  me.coins -= s.price;
  eco.scopes[i] = true;
  setScope(i);
}

export function startGame(d = null) {
  document.body.classList.add('ingame');
  document.body.classList.remove('in-lobby');
  document.getElementById('adTop')?.remove();
  document.getElementById('app')?.remove();

  const { renderer, scene, camera } = createRenderer();
  addLights(scene);
  buildHall(scene);
  buildRooms(scene);
  buildStairs(scene);
  placeProps(scene);
  buildLamps(scene);
  buildDecor(scene);
  mergeStatic(scene);

  scene.add(camera);
  initTracers(scene);
  const avatar = createCharacter();
  scene.add(avatar.group);

  if (d) { me.id = d.pid; me.name = d.name; }
  setupTouch();
  const controls = createControls(camera, renderer.domElement, avatar, d ? d.team - 1 : 0, !!d);
  const bots = d ? null : createBots(scene, camera, 40, 4, 1);
  const net = d ? initNet(scene, controls) : null;
  const vfx = initVfx(scene, camera);
  const fwv = initFwVfx(scene, camera);
  const fx = initFx(camera);
  const xh = initCrosshair();
  const scp = initScopeUi();
  const shop = initShop(
    d ? (i) => req('g:buy', { i }) : localBuy,
    d ? (i) => req('g:buyscope', { i }) : localBuyScope
  );
  const hud = initHud({
    onExit: async () => {
      if (d) await req('lobby:leave');
      location.reload();
    },
  });

  startLoop(
    (dt) => {
      controls.update(dt);
      bots?.update(dt);
      net?.update(dt);
      updateTracers(dt);
      vfx.update(dt);
      fwv.update(dt);
      fx.update(dt);
      const ads = controls.ads();
      xh.update(dt, ads);
      scp.update(ads);
      shop.update(dt);
      hud.update(dt);
    },
    () => renderer.render(scene, camera)
  );
}