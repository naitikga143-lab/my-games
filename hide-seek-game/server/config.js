module.exports = {
  PORT: process.env.PORT || 3000,
  TEAMS: 2,
  PLAYERS: 4,
  MATCH_SECONDS: 60,
  EXCHANGE_SECONDS: 20,
  GRACE_SECONDS: 20,
  ROOM_CREATURES: { 1: 40, 2: 50, 3: 60, 4: 80 },
  ROOM_ACTIVE: { 1: 4, 2: 6, 3: 8, 4: 10 },
  ROUND_SECONDS: 300,
  GRACE_START: 5,          // "GET READY" countdown
  RESPAWN: true,
  RESPAWN_SECONDS: 5,
};