import { input } from './input.js';

export const WEAPONS = [
  { name: 'PISTOL', delay: 0.3, auto: false, kick: 0.03, body: 25, head: 70, range: 60, spread: 0.004 },
  { name: 'SMG', delay: 0.09, auto: true, kick: 0.012, body: 12, head: 36, range: 45, spread: 0.02 },
];

let cool = 0, was = false;

// goli chale to true deta hai
export function updateWeapon(dt) {
  cool -= dt;
  const press = input.fire && (!was || WEAPONS[input.weapon].auto);
  was = input.fire;
  if (press && cool <= 0) {
    cool = WEAPONS[input.weapon].delay;
    return true;
  }
  return false;
}