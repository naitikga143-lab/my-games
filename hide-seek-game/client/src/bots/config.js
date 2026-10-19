export const BOTS = {
  COUNT: 16,
  FIRE: false,
  TAG: '',                        // ' [AI]' likhoge to naam ke saath AI tag dikhega
  NAMES: ['Kenji', 'Ryu', 'Hiro', 'Daichi', 'Takumi', 'Shin', 'Goro', 'Jiro',
          'Kaito', 'Souta', 'Ren', 'Akira', 'Haru', 'Yuto', 'Makoto', 'Isamu'],
  SKILL_MIN: 0.35,                // 0 = anari, 1 = pro
  SKILL_MAX: 0.85,
  SIGHT: 32,                      // kitni door tak dikhta hai (m)
  FOV: (130 * Math.PI) / 180,
  HEAR: 26,                       // goli ki awaaz kitni door tak sunte hain (m)
  WALK: 3.4,
  RUN: 5.6,
  PERCEPT_DT: 0.22,
};