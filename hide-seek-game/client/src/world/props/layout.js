import { FLOOR_Y } from '../dims.js';
import { makeTable } from './table.js';
import { makeCupboard } from './cupboard.js';
import { makeMachine } from './machine.js';

const P = Math.PI, H = P / 2;

const HALL = {
  tables: [[-5, 8, 0.25], [5, 8, -0.3], [0, 0, 0.5], [-6, -7, P + 0.3], [6, -9, P - 0.25], [14, 9, -H + 0.3]],
  cupboards: [
    [-19.5, 7, H], [-19.5, 13.2, H], [-14, 14.5, P], [-5, 14.5, P], [5, 14.5, P], [14, 14.5, P],
    [19.5, 7, -H], [19.5, 13.2, -H], [-5, -14.5, 0], [6, -14.5, 0], [-2.5, -8, 0.3], [3, 4.5, P + 0.25],
  ],
  machines: [[-1.5, -14.4, 0], [19.4, 10, -H], [-19.4, 10, H]],
};
const LEFT = {
  tables: [[-13.4, -2.3, H + 0.2], [-13.4, 2.3, H - 0.2], [-17, 0, H + 0.1], [-18.4, 2.8, 0.3]],
  cupboards: [[-19.5, -2.6, H], [-15.5, -3.55, 0]],
  machines: [],
};
const RIGHT = {
  tables: [[13.4, -2.3, -H - 0.2], [13.4, 2.3, -H + 0.2], [17.5, 0, -H]],
  cupboards: [[19.5, -2.6, -H], [15.5, -3.55, 0]],
  machines: [[19.4, 2.6, -H]],
};
const CORNER = {
  tables: [[14.2, -13.2, -H + 0.2], [17.5, -8.6, P + 0.2]],
  cupboards: [[19.5, -12, -H], [15.5, -14.55, 0]],
  machines: [],
};

function place(scene, y, s) {
  s.tables.forEach(([x, z, r]) => makeTable(scene, x, y, z, r));
  s.cupboards.forEach(([x, z, r]) => makeCupboard(scene, x, y, z, r));
  s.machines.forEach(([x, z, r]) => makeMachine(scene, x, y, z, r));
}

export function placeProps(scene) {
  for (const y of [0, FLOOR_Y]) [HALL, LEFT, RIGHT].forEach((s) => place(scene, y, s));
  place(scene, 0, CORNER);
}