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
import { initTracers, updateTracers } from './game/tracers.js';
import { initHud } from './game/hud.js';
import { createBots } from './bots/manager.js';

export function startGame() {
  document.body.classList.add('ingame');
  document.getElementById('adTop')?.remove();   // game me ad nahi
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

  setupTouch();
  const controls = createControls(camera, renderer.domElement, avatar);
  const bots = createBots(scene, camera);
  const hud = initHud();

  startLoop(
    (dt) => {
      controls.update(dt);
      bots.update(dt);
      updateTracers(dt);
      hud.update(dt);
    },
    () => renderer.render(scene, camera)
  );
}