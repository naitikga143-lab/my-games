import { splash } from './splash.js';
import { rules } from './rules.js';
import { usernamePage } from './username.js';
import { lobbyScreen } from './lobby/lobby.js';
import { show } from './dom.js';
import './lobby/net.js';

export function startFlow() {
  addEventListener('ps:joined', () => show(lobbyScreen()));
  addEventListener('ps:left', () => usernamePage());

  const q = new URLSearchParams(location.search);
  const code = q.get('lobby');
  if (code) {
    const [team, player] = (q.get('join') || '').split('-').map(Number);
    usernamePage({ invite: { code, team, player } });   // invite wale ko splash/rules nahi
  } else {
    splash(() => rules(() => usernamePage()));
  }
}