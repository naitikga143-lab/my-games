import { CONFIG, FUELS, BOOSTERS } from '../config.js';

export class State {
  constructor() { this.reset(); }

  reset() {
    this.coins = 0;
    this.distance = 0;
    this.maxHp = CONFIG.playerHp;
    this.hp = this.maxHp;
    this.fuelType = null;
    this.fuelLeft = 0;
    this.seekers = 0;                     // targeting missiles in stock
    this.shield = 0;                      // asteroid protector charges left
    this.exhaustOwned = { default: true };
    this.exhaust = 'default';

    // station schedule (each kind has its own distance)
    this.shopNext = { fuel: CONFIG.shops.fuel.start, parts: CONFIG.shops.parts.start };
    this.shopCount = { fuel: 0, parts: 0 };

    // booster schedule + active booster timers (seconds left)
    this.boosterIndex = 0;
    this.boosterNext = CONFIG.boosterFirst;
    this.boost = { magnet: 0, ghost: 0, rainbow: 0 };
    this.healthNext = CONFIG.healthFirst; // health boosters: every 300 m
  }

  get fuel() { return this.fuelType ? FUELS[this.fuelType] : null; }
  get speedMult() { return this.fuel ? this.fuel.speed : 1; }

  // which station comes next? -> { kind: 'fuel' | 'parts', dist: metres }
  nextStation() {
    const f = this.shopNext.fuel, p = this.shopNext.parts;
    return f <= p ? { kind: 'fuel', dist: f } : { kind: 'parts', dist: p };
  }
  get nextShopDistance() { return this.nextStation().dist; }

  // call when a station is spawned: schedules the next one of the same kind
  passStation(kind) {
    const c = ++this.shopCount[kind];
    this.shopNext[kind] += CONFIG.shops[kind].gap + CONFIG.shopGapStep * (c - 1);
  }

  nextBoosterKind() { return CONFIG.boosterOrder[this.boosterIndex % CONFIG.boosterOrder.length]; }
  passBooster() {
    this.boosterNext += CONFIG.boosterGaps[this.boosterIndex % CONFIG.boosterGaps.length];
    this.boosterIndex++;
  }
  passHealth() { this.healthNext += CONFIG.healthGap; }
  heal(n) { // HP can go above the starting 20, up to hpCap
    this.hp = Math.min(CONFIG.hpCap, this.hp + n);
    this.maxHp = Math.max(this.maxHp, this.hp);
  }
  activate(kind) { this.boost[kind] = BOOSTERS[kind].duration; }

  addFuel(type) {
    this.fuelType = type;
    this.fuelLeft = FUELS[type].duration;
  }

  // only called while flying (timers pause inside a safe zone / shop)
  update(dt) {
    if (this.fuelType) {
      this.fuelLeft -= dt;
      if (this.fuelLeft <= 0) { this.fuelType = null; this.fuelLeft = 0; }
    }
    for (const k of Object.keys(this.boost)) {
      if (this.boost[k] > 0) this.boost[k] = Math.max(0, this.boost[k] - dt);
    }
  }
}