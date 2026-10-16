import './style.css';
import { createRenderer } from './core/renderer.js';
import { startLoop } from './core/loop.js';
import { addLights } from './world/lights.js';
import { buildHall } from './world/hall.js';
import { buildRooms } from './world/rooms.js';
import { buildStairs } from './world/stairs.js';
import { placeProps } from './world/props/layout.js';
import { buildLamps } from './world/lamps.js';
import { mergeStatic } from './world/merge.js';
import { createControls } from './player/controls.js';
import { setupTouch } from './player/touch.js';

const { renderer, scene, camera } = createRenderer();
addLights(scene);
buildHall(scene);
buildRooms(scene);
buildStairs(scene);
placeProps(scene);
buildLamps(scene);
mergeStatic(scene);

setupTouch();
const controls = createControls(camera, renderer.domElement);
startLoop((dt) => controls.update(dt), () => renderer.render(scene, camera));

//cd hide-seek-game/client