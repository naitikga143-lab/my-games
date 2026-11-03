export const CONFIG = {
  shipSpeed: 460,
  playerhp: 100,
  metersPerSecond: 10,   // base speed (x1) = 10 m/s
  shopStart: 1000,       // 1st station at 1000 m
  shopGapFirst: 1100,    // 2nd station is 1100 m after the 1st (= 2100 m)
  shopGapStep: 100,      // every next gap is 100 m longer (1200, 1300, ...)
  shopOrder: ['fuel', 'parts'], // stations alternate in this order
  stationVy: 170,
  coinVy: 210,
  fireInterval: 0.12,
  missileCooldown: 2.2,
  seekerCooldown: 1.2,
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

// Parts shop
export const PARTS = {
  seeker: { id: 'seeker', name: 'TARGETING MISSILES', cost: 120, pack: 3, max: 9 },
  shield: { id: 'shield', name: 'ASTEROID PROTECTOR', cost: 150, charges: 2 },
};

// Exhaust styles (cosmetic). flame = [outer, middle, inner] colours of the engine flame.
export const EXHAUSTS = {
  default: {
    id: 'default', name: 'STANDARD', cost: 0,
    preview: [0xcff1ff, 0x58c8ff, 0x2a6bff], flame: [0x2f9bff, 0xbfeaff, 0xffffff], glow: 0x7fd8ff,
  },
  tricolor: {
    id: 'tricolor', name: 'TIRANGA', cost: 50,
    preview: [0xff9933, 0xffffff, 0x138808], flame: [0xff9933, 0xffffff, 0x138808], glow: 0xffb060,
  },
  stars: {
    id: 'stars', name: 'SPARKLE STARS', cost: 75,
    preview: [0xffffff, 0x9fe8ff, 0xffe9a0], flame: [0x9fe8ff, 0xffffff, 0xffe9a0], glow: 0xbfeaff,
  },
  fire: {
    id: 'fire', name: 'INTENSE FIRE', cost: 100,
    preview: [0xfffbe0, 0xffc21a, 0xff5a00], flame: [0xff5a00, 0xffc21a, 0xfffbe0], glow: 0xffa030,
  },
};