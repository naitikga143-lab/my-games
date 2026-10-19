export const CONFIG = {
  shipSpeed: 460,
  metersPerSecond: 10,          // base speed (x1) = 10 m/s
  shopStart: 1000,              // first station at 1000 m
  shopStep: 100,                // then 1100, 1200, ...
  shopOrder: ['fuel', 'parts'], // stations alternate in this order
  stationVy: 170,
  coinVy: 210,
  fireInterval: 0.12,
  missileCooldown: 2.2,
};

// Fuel only changes speed + perks. Distance is never reduced.
export const FUELS = {
  normal: {
    id: 'normal', name: 'NORMAL FUEL', cost: 100, speed: 1.35, duration: 20,
    agility: 1.0, smash: false, color: 0x58c8ff, trail: [0xcff1ff, 0x2a6bff],
    perk: 'Faster flight',
  },
  power: {
    id: 'power', name: 'POWER FUEL', cost: 300, speed: 1.7, duration: 25,
    agility: 1.2, smash: false, color: 0xffb347, trail: [0xfff0c0, 0xff7a1a],
    perk: 'Faster flight + sharper steering',
  },
  intense: {
    id: 'intense', name: 'INTENSE ENERGY', cost: 500, speed: 2.2, duration: 30,
    agility: 1.3, smash: true, color: 0xff4d8d, trail: [0xffffff, 0xff2a6d],
    perk: 'Max speed, best steering, smashes through meteors',
  },
};