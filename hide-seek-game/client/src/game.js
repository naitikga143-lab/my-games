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
import { initNet } from './game/netsync.js';
import { me } from './player/self.js';

const ROOM_BOTS = { 1: 16, 2: 18, 3: 20, 4: 24 };

// d = server se aaya {room, team, pid, name}; ?dev=game me d nahi hota
export function startGame(d = null) {
  document.body.classList.add('ingame');
  document.body.classList.remove('in-lobby');
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

  if (d) { me.id = d.pid; me.name = d.name; }
  setupTouch();
  const controls = createControls(camera, renderer.domElement, avatar, d ? d.team - 1 : 0);
  const bots = createBots(scene, camera, d ? ROOM_BOTS[d.room] : 16);
  const net = d ? initNet(scene, controls) : null;
  const hud = initHud();

  startLoop(
    (dt) => {
      controls.update(dt);
      bots.update(dt);
      net?.update(dt);
      updateTracers(dt);
      hud.update(dt);
    },
    () => renderer.render(scene, camera)
  );
}