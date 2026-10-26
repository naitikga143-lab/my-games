module.exports = {
  PORT: process.env.PORT || 3000,
  TEAMS: 2,
  PLAYERS: 4,
  MATCH_SECONDS: 60,
  EXCHANGE_SECONDS: 20,
  GRACE_SECONDS: 20,
  ROOM_CREATURES: { 1: 50, 2: 50, 3: 50, 4: 50 },
  ROOM_ACTIVE: { 1: 5, 2: 5, 3: 5, 4: 5 },
  ROUND_SECONDS: 300,
  GRACE_START: 5,          // "GET READY" countdown
  RESPAWN: true,
  RESPAWN_SECONDS: 5,
};