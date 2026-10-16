export const input = { moveX: 0, moveY: 0, lookX: 0, lookY: 0, run: false, crouch: false };
export const keys = {};

// run aur crouch ek saath on nahi ho sakte
export function toggle(name) {
  input[name] = !input[name];
  if (input[name]) input[name === 'run' ? 'crouch' : 'run'] = false;
  dispatchEvent(new Event('inputchange'));
}

addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyC' && !e.repeat) toggle('crouch');
});
addEventListener('keyup', (e) => (keys[e.code] = false));