module.exports = {
  PORT: process.env.PORT || 3000,
  MAX_HUMANS: 4,
  MAX_BOTS: 16,
  TEAMS: 4,
  PLAYERS: 4,
  MATCH_SECONDS: 60,
  EXCHANGE_SECONDS: 20,
  GRACE_SECONDS: 20,
  ROOM_BOTS: { 1: 16, 2: 18, 3: 20, 4: 24 },
  RESPAWN: true,          // testing: marne ke baad respawn. Asli match me false kar dena
  RESPAWN_SECONDS: 5,
};