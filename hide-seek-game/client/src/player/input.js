export const input = {
  moveX: 0, moveY: 0, lookX: 0, lookY: 0,
  run: false, crouch: false,
  view: 2,                       // 1 = peeche se, 2 = aankh se, 3 = saamne se (chehra)
  peekLock: false, peekDir: 0, peekHeld: 0,
  fire: false, weapon: 0,
};
export const keys = {};

const WEAPON_COUNT = 2;
const changed = () => dispatchEvent(new Event('inputchange'));

export function toggle(name) {
  input[name] = !input[name];
  if (input[name]) input[name === 'run' ? 'crouch' : 'run'] = false;
  changed();
}

export function setView(n) {
  input.view = n;
  changed();
}
export const cycleView = () => setView(input.view === 2 ? 1 : input.view === 1 ? 3 : 2);

export function peekPress(dir) {
  if (input.peekLock) input.peekDir = input.peekDir === dir ? 0 : dir;
  else input.peekHeld = dir;
  changed();
}
export function peekRelease(dir) {
  if (!input.peekLock && input.peekHeld === dir) input.peekHeld = 0;
  changed();
}
export function togglePeekLock() {
  input.peekLock = !input.peekLock;
  input.peekDir = 0;
  input.peekHeld = 0;
  changed();
}
export const peekValue = () => (input.peekLock ? input.peekDir : input.peekHeld);

export function setWeapon(i) {
  input.weapon = (i + WEAPON_COUNT) % WEAPON_COUNT;
  changed();
}

addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.repeat) return;
  if (e.code === 'KeyC') toggle('crouch');
  if (e.code === 'KeyV') cycleView();
  if (e.code === 'KeyQ') peekPress(-1);
  if (e.code === 'KeyE') peekPress(1);
  if (e.code === 'KeyZ') togglePeekLock();
  if (e.code === 'Digit1') setWeapon(0);
  if (e.code === 'Digit2') setWeapon(1);
});
addEventListener('keyup', (e) => {
  keys[e.code] = false;
  if (e.code === 'KeyQ') peekRelease(-1);
  if (e.code === 'KeyE') peekRelease(1);
});

document.addEventListener('mousedown', (e) => {
  if (document.pointerLockElement && e.button === 0) input.fire = true;
});
document.addEventListener('mouseup', (e) => {
  if (e.button === 0) input.fire = false;
});
addEventListener('wheel', (e) => {
  if (document.pointerLockElement) setWeapon(input.weapon + (e.deltaY > 0 ? 1 : -1));
});