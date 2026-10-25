import { createSquad } from '../bots/squad.js';
import { fighters } from '../game/fighters.js';

export function createDirector(scene, total, { grace, active, room, fw }) {
  return createSquad(scene, total, {
    headless: true, grace, active, room, fw,
    humans: () => fighters.filter((f) => f.human && f.alive),
    camPos: { x: 0, y: 0, z: 0 },
  });
}