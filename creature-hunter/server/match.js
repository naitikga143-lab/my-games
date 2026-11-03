// Match rules: ek jagah tune karo.
export const RULES = {
  ALLOW_SOLO: false,         // TESTING: akele START dabake khel sako. Deploy se pehle false karo!
  DURATION_S: 5 * 60,       // match 7 minute ka
  TOTAL_CREATURES: 50,      // poore match mein kul creatures
  ACTIVE_CREATURES: 5,      // ek waqt mein map par
  COUNTDOWN_S: 3,
  RECONNECT_GRACE_S: 15,
  PLAYER_RESPAWN_S: 5,      // client bhi 5 sec use karta hai (crackers.js PlayerHealth respawnS)
  POINTS: { head: 8, body: 5 },
};

const other = (c) => (c === 'red' ? 'blue' : 'red');

// 1) zyada points  2) tie ho to zyada headshots  3) phir bhi barabar => draw
export function decideWinner(points, heads) {
  if (points.red !== points.blue) return { winner: points.red > points.blue ? 'red' : 'blue', by: 'points' };
  if (heads.red !== heads.blue) return { winner: heads.red > heads.blue ? 'red' : 'blue', by: 'headshots' };
  return { winner: 'draw', by: 'draw' };
}

export class Match {
  constructor(seed, onEnd) {
    this.seed = seed;
    this.onEnd = onEnd;
    this.startedAt = Date.now();
    this.endsAt = this.startedAt + RULES.DURATION_S * 1000;
    this.points = { red: 0, blue: 0 };
    this.kills = { red: 0, blue: 0 };
    this.heads = { red: 0, blue: 0 };
    this.totalKilled = 0; // death par zero nahi hota: ye match ka kul creature counter hai
    this.ended = false;
  }

  // Abhi client 'kill' bhejta hai (lobby.js rate-limit lagata hai). Server-side creatures aane par yahin se hoga.
  registerKill(color, part) {
    if (this.ended || this.kills[color] === undefined) return;
    const head = part === 'head';
    this.points[color] += head ? RULES.POINTS.head : RULES.POINTS.body;
    this.kills[color] += 1;
    if (head) this.heads[color] += 1;
    this.totalKilled += 1;
    if (this.totalKilled >= RULES.TOTAL_CREATURES) this._finish('all_killed');
  }

  // Player mara => uska score, kills aur headshots zero. Respawn ke baad jo milega wahi final.
  registerDeath(color) {
    if (this.ended || this.kills[color] === undefined) return;
    this.points[color] = 0;
    this.kills[color] = 0;
    this.heads[color] = 0;
  }

  tick(now = Date.now()) {
    if (!this.ended && now >= this.endsAt) this._finish('time');
  }

  forfeit(loser) {
    this._finish('forfeit', { winner: other(loser), by: 'forfeit' });
  }

  snapshot(now = Date.now()) {
    return {
      points: { ...this.points },
      kills: { ...this.kills },
      heads: { ...this.heads },
      killed: this.totalKilled,
      leftMs: Math.max(0, this.endsAt - now),
    };
  }

  _finish(reason, forced) {
    if (this.ended) return;
    this.ended = true;
    const res = forced || decideWinner(this.points, this.heads);
    this.onEnd({
      reason, ...res,
      points: { ...this.points }, kills: { ...this.kills }, heads: { ...this.heads },
    });
  }
}