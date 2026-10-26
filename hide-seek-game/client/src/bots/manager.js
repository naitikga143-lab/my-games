import { createSquad } from './squad.js';
import { createFireworks } from '../sim/fireworks.js';
import { applyFx } from '../game/fx.js';
import { me } from '../player/self.js';
import { roomInfo } from '../game/roomstate.js';

export function createBots(scene, camera, total = 50, active = 5, room = 1) {
  roomInfo.total = total;
  roomInfo.botsLeft = total;
  const fw = createFireworks({
    humans: () => (me.alive ? [me] : []),
    applyFx: (_f, fx) => applyFx(fx),
  });
  const squad = createSquad(scene, total, {
    headless: false, grace: 5, active, room, fw,
    humans: () => (me.alive ? [me] : []),
    camPos: camera.position,
  });
  let t = 0;
  return {
    update(dt) {
      t += dt;
      fw.update(dt);
      squad.update(dt);
      roomInfo.botsLeft = squad.left();
      roomInfo.level = squad.level();
      roomInfo.grace = squad.grace();
      roomInfo.time = Math.max(0, 300 - Math.floor(t));
    },
  };
}