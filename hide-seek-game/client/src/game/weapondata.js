// Player guns: sabse mehngi (RIFLE) hi bot ki gun ke barabar hai, baaki kamzor
export const WEAPONS = [
  { name: 'PISTOL',  price: 0,   delay: 0.3,  auto: false, kick: 0.03,  body: 20, head: 60, cb: 34, range: 60, spread: 0.004, pellets: 1, psp: 0 },
  { name: 'SMG',     price: 200, delay: 0.09, auto: true,  kick: 0.012, body: 8,  head: 24, cb: 12, range: 45, spread: 0.02,  pellets: 1, psp: 0 },
  { name: 'SHOTGUN', price: 450, delay: 0.85, auto: false, kick: 0.07,  body: 8,  head: 20, cb: 7,  range: 22, spread: 0.01,  pellets: 7, psp: 0.07 },
  { name: 'RIFLE',   price: 900, delay: 0.12, auto: true,  kick: 0.02,  body: 14, head: 42, cb: 25, range: 70, spread: 0.008, pellets: 1, psp: 0 },
];

// bots ki gun (RIFLE ke barabar damage aur speed)
export const BOT_GUN = { name: 'BOT AR', price: 0, delay: 0.12, auto: true, kick: 0, body: 14, head: 42, range: 50, spread: 0.022, pellets: 1, psp: 0 };

// scope: sab guns pe lagta hai. RED DOT default (free)
export const SCOPES = [
  { name: 'RED DOT', price: 0, zoom: 1.15 },
  { name: 'HOLO', price: 150, zoom: 1.35 },
  { name: '2X', price: 250, zoom: 2 },
  { name: '3X', price: 400, zoom: 3 },
];