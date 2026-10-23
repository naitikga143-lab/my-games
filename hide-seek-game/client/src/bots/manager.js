import { createSquad } from './squad.js';
import { BOTS } from './config.js';
import { me } from '../player/self.js';
import { roomInfo } from '../game/roomstate.js';

export function createBots(scene, camera, total = BOTS.COUNT) {
  roomInfo.total = total;
  roomInfo.botsLeft = total;
  const squad = createSquad(scene, total, {
    headless: false,
    humans: () => (me.alive ? [me] : []),
    camPos: camera.position,
  });
  return {
    update(dt) {
      squad.update(dt);
      roomInfo.botsLeft = squad.left();
    },
  };
}