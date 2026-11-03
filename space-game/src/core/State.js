import { CONFIG, FUELS } from '../config.js';

export class State {
  constructor() { this.reset(); }

  reset() {
    this.coins = 0;
    this.distance = 0;
    this.maxHp = CONFIG.playerHp;
    this.hp = this.maxHp;
    this.fuelType = null;
    this.fuelLeft = 0;
    this.shopIndex = 0;
    this.nextShop = CONFIG.shopStart;
    this.seekers = 0;                     // targeting missiles in stock
    this.shield = 0;                      // asteroid protector charges left
    this.exhaustOwned = { default: true };
    this.exhaust = 'default';
  }

  get fuel() { return this.fuelType ? FUELS[this.fuelType] : null; }
  get speedMult() { return this.fuel ? this.fuel.speed : 1; }
  get nextShopDistance() { return this.nextShop; }

  // call when a station is spawned: schedules the next one
  // 1000, then +1100 = 2100, then +1200 = 3300, ...
  passStation() {
    this.nextShop += CONFIG.shopGapFirst + CONFIG.shopGapStep * this.shopIndex;
    this.shopIndex++;
  }

  addFuel(type) {
    this.fuelType = type;
    this.fuelLeft = FUELS[type].duration;
  }

  update(dt) {
    if (!this.fuelType) return;
    this.fuelLeft -= dt;
    if (this.fuelLeft <= 0) { this.fuelType = null; this.fuelLeft = 0; }
  }
}