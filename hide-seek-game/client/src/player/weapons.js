import { input } from './input.js';
import { WEAPONS } from '../game/weapondata.js';
import { eco } from '../game/economy.js';
import { roomInfo } from '../game/roomstate.js';

export { WEAPONS };

let cool = 0, was = false;

export function updateWeapon(dt) {
  cool -= dt;
  if (roomInfo.grace > 0) { was = input.fire; return false; }
  const w = WEAPONS[input.weapon];
  const press = input.fire && (!was || w.auto);
  was = input.fire;
  if (press && cool <= 0 && eco.owned[input.weapon]) {
    cool = w.delay;
    return true;
  }
  return false;
}