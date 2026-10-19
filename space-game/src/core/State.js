import { CONFIG, FUELS } from '../config.js';

export class State {
  constructor() { this.reset(); }

  reset() {
    this.coins = 0;
    this.distance = 0;
    this.fuelType = null;
    this.fuelLeft = 0;
    this.shopIndex = 0;
  }

  get fuel() { return this.fuelType ? FUELS[this.fuelType] : null; }
  get speedMult() { return this.fuel ? this.fuel.speed : 1; }
  get nextShopDistance() { return CONFIG.shopStart + this.shopIndex * CONFIG.shopStep; }

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