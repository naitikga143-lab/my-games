import { splash } from './splash.js';
import { rules } from './rules.js';
import { usernamePage } from './username.js';
import { lobbyScreen } from './lobby/lobby.js';
import { show } from './dom.js';
import './lobby/net.js';

let launched = false;

export function startFlow() {
  addEventListener('ps:joined', () => { if (!launched) show(lobbyScreen()); });
  addEventListener('ps:left', () => { if (!launched) usernamePage(); });
  addEventListener('ps:game', async (e) => {
    if (launched) return;
    launched = true;
    const d = e.detail;
    if (d.room === 1) (await import('../game.js')).startGame(d);
    else (await import('../tempspace.js')).startTemp(d);
  });

  const q = new URLSearchParams(location.search);
  const code = q.get('lobby');
  if (code) {
    const [team, player] = (q.get('join') || '').split('-').map(Number);
    usernamePage({ invite: { code, team, player } });
  } else {
    splash(() => rules(() => usernamePage()));
  }
}