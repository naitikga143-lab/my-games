export const CONFIG = {
  shipSpeed: 460,
  playerHp: 20,            // enemy bullets take HP (2 / 4 / 6 / 8 per hit); 0 HP = game over
  hurtCooldown: 0.5,       // ship is safe for this long after a hit
  metersPerSecond: 10,     // base speed (x1) = 10 m/s

  // Stations: each kind has its own schedule (distance in metres)
  shops: {
    fuel: { start: 1000, gap: 1100 },   // 1000, 2100, 3200, ...
    parts: { start: 1500, gap: 1200 },  // 1500, 2700, 3900, ...
  },
  shopGapStep: 0,          // make every next gap this much longer (0 = same gap always)

  // Boosters floating in the air: 500, 800, 1200, 1500, 1900, 2200, ...
  boosterFirst: 500,
  boosterGaps: [300, 400], // gaps alternate: +300, +400, +300, +400 ...
  boosterOrder: ['magnet', 'ghost', 'rainbow'],
  coinMagnetRadius: 300,

  // Health booster: 500, 800, 1100, 1400 ... (every 300 m), gives +20 HP
  healthFirst: 500,
  healthGap: 300,
  healthAmount: 20,
  hpCap: 40,               // HP can go above the starting 20, up to this

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


// Boosters (pick-ups)
export const BOOSTERS = {
  magnet: { id: 'magnet', name: 'COIN MAGNET', duration: 60, color: 0xff5a5a },
  ghost: { id: 'ghost', name: 'INVISIBILITY', duration: 90, color: 0x9fe8ff },
  rainbow: { id: 'rainbow', name: 'COLORFUL COINS', duration: 60, color: 0xff66dd },
  health: { id: 'health', name: 'HEALTH', color: 0xff5a8a }, // instant: +20 HP
};