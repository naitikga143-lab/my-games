const cfg = require('../config');
const L = require('./lobbies');
const S = require('./service');

const pool = [];   // jo "Enter match" dabake intezaar kar rahe hain

function end(lobby, team, ok, message) {
  const s = lobby.searches.get(team);
  if (!s) return;
  clearTimeout(s.timer);
  lobby.searches.delete(team);
  S.to(lobby.code, 'match:result', { team, ok, message });
  S.state(lobby);
}

// player ko team ke pehle khaali slot me baithao
function place(p, lobby, team) {
  p.pool = false;
  S.seat(p, lobby, L.emptyIn(lobby, team)[0]);
  if (!L.emptyIn(lobby, team).length) end(lobby, team, true, `Team ${team} full, match mil gaya!`);
}

function fillFromPool(lobby, team) {
  while (pool.length && lobby.searches.has(team) && L.emptyIn(lobby, team).length) {
    place(pool.shift(), lobby, team);
  }
}

function startSearch(lobby, team) {
  if (lobby.searches.has(team)) return { error: 'Is team ka match pehle se chal raha hai' };
  if (!L.emptyIn(lobby, team).length) return { error: 'Is team me koi slot khaali nahi' };
  const ms = cfg.MATCH_SECONDS * 1000;
  const search = { endsAt: Date.now() + ms, timer: null };
  search.timer = setTimeout(() => {
    if (L.get(lobby.code) !== lobby) return;
    end(lobby, team, false, `Team ${team}: Match not found`);
  }, ms);
  lobby.searches.set(team, search);
  fillFromPool(lobby, team);
  S.state(lobby);
  return { ok: true };
}

function enter(p) {
  if (p.lobbyCode) return { error: 'Tum pehle se lobby me ho' };
  if (p.pool) return { ok: true, status: 'waiting' };

  const cands = [];
  for (const lobby of L.all()) {
    for (const [team, s] of lobby.searches) {
      if (L.emptyIn(lobby, team).length) cands.push({ lobby, team, at: s.endsAt });
    }
  }
  cands.sort((a, b) => a.at - b.at);   // sabse purani search pehle
  if (cands.length) {
    place(p, cands[0].lobby, cands[0].team);
    return { ok: true, status: 'seated' };
  }
  p.pool = true;
  pool.push(p);
  return { ok: true, status: 'waiting' };
}

function cancelPool(p) {
  p.pool = false;
  const i = pool.indexOf(p);
  if (i >= 0) pool.splice(i, 1);
}

module.exports = { startSearch, enter, cancelPool };