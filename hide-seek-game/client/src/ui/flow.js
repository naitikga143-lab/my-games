import { splash } from './splash.js';
import { rules } from './rules.js';
import { lobbyScreen } from './lobby/lobby.js';
import { show } from './dom.js';

export function startFlow() {
  splash(() => rules(() => show(lobbyScreen())));
}