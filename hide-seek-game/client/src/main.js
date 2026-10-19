import './style.css';
import './ui/ui.css';
import { startFlow } from './ui/flow.js';

// ?dev=game se seedha game khulta hai (testing ke liye)
if (new URLSearchParams(location.search).get('dev') === 'game') {
  import('./game.js').then((m) => m.startGame());
} else {
  startFlow();
}

//cd hide-seek-game/client