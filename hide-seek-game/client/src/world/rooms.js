import { wall, wallWithDoor } from './wall.js';
import { FLOOR_Y, SLAB, ROOF_Y } from './dims.js';

// walls = side deewarein, front = hall wali deewar [x1,z1,x2,z2,darwaaza]
const ROOMS = {
  left: { walls: [[-20, -4, -11, -4], [-20, 4, -11, 4]], front: [-11, -4, -11, 4, 0] },
  right: { walls: [[11, -4, 20, -4], [11, 4, 20, 4]], front: [11, -4, 11, 4, 0] },
  corner: { walls: [[11, -7, 20, -7]], front: [11, -15, 11, -7, -11] },
};

function buildRoom(scene, r, y0, h) {
  r.walls.forEach(([a, b, c, d]) => wall(scene, a, b, c, d, y0, h));
  const [a, b, c, d, at] = r.front;
  wallWithDoor(scene, a, b, c, d, y0, h, at);
}

export function buildRooms(scene) {
  const low = FLOOR_Y - SLAB;
  const high = ROOF_Y - FLOOR_Y;
  buildRoom(scene, ROOMS.left, 0, low);
  buildRoom(scene, ROOMS.right, 0, low);
  buildRoom(scene, ROOMS.corner, 0, low);
  buildRoom(scene, ROOMS.left, FLOOR_Y, high);
  buildRoom(scene, ROOMS.right, FLOOR_Y, high);
}