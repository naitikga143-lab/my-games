// har gun ka origin = grip; z = aage, y = upar
export function buildGuns(p, bake, { BOX, cyl }) {
  const R = Math.PI / 2;
  const steel = 0x15151a, steelL = 0x34373f, wood = 0x5a3a1e, woodD = 0x3b2512;
  const barrel = (r, len, z, y, col) => p(cyl(r, r, len, 8), col, 0, y, z, 1, 1, 1, R, 0, 0);
  return [
    // PISTOL
    bake([
      p(BOX, steel, 0, 0.045, 0.1, 0.042, 0.05, 0.26),
      p(BOX, steelL, 0, 0.0, 0.08, 0.036, 0.03, 0.2),
      p(BOX, steelL, 0, -0.055, -0.012, 0.04, 0.12, 0.055, -0.2, 0, 0),
      p(BOX, steel, 0, -0.018, 0.05, 0.02, 0.012, 0.07),
      p(BOX, steelL, 0, 0.074, 0.01, 0.012, 0.014, 0.012),
      p(BOX, steelL, 0, 0.074, 0.215, 0.01, 0.014, 0.012),
      barrel(0.011, 0.04, 0.235, 0.045, steelL),
    ]),
    // SMG (suppressor ke saath)
    bake([
      p(BOX, steel, 0, 0.035, 0.1, 0.06, 0.085, 0.3),
      p(BOX, steelL, 0, -0.095, 0.07, 0.04, 0.17, 0.05),
      p(BOX, steelL, 0, -0.055, -0.01, 0.045, 0.11, 0.05, -0.2, 0, 0),
      p(BOX, steel, 0, 0.03, -0.14, 0.04, 0.06, 0.16),
      p(BOX, steelL, 0, -0.04, 0.2, 0.035, 0.07, 0.04),
      barrel(0.018, 0.14, 0.37, 0.04, steelL),
      p(BOX, steelL, 0, 0.088, 0.1, 0.02, 0.02, 0.1),
    ]),
    // SHOTGUN
    bake([
      p(BOX, steel, 0, 0.035, 0.08, 0.055, 0.075, 0.26),
      barrel(0.02, 0.5, 0.45, 0.05, steelL),
      barrel(0.016, 0.42, 0.42, 0.01, steel),
      p(BOX, woodD, 0, 0.0, 0.3, 0.06, 0.05, 0.2),
      p(BOX, wood, 0, 0.01, -0.2, 0.05, 0.08, 0.3, 0.12, 0, 0),
      p(BOX, wood, 0, -0.05, -0.005, 0.04, 0.1, 0.05, -0.25, 0, 0),
      p(BOX, steelL, 0, 0.078, 0.62, 0.01, 0.015, 0.012),
    ]),
    // RIFLE
    bake([
      p(BOX, steel, 0, 0.04, 0.1, 0.055, 0.08, 0.34),
      barrel(0.014, 0.4, 0.55, 0.055, steelL),
      p(BOX, woodD, 0, 0.03, 0.4, 0.06, 0.06, 0.22),
      p(BOX, steelL, 0, -0.1, 0.12, 0.04, 0.16, 0.055, 0.28, 0, 0),
      p(BOX, wood, 0, 0.0, -0.22, 0.05, 0.1, 0.32, 0.1, 0, 0),
      p(BOX, wood, 0, -0.055, -0.01, 0.04, 0.11, 0.05, -0.25, 0, 0),
      p(BOX, steel, 0, 0.1, 0.1, 0.03, 0.04, 0.12),
      p(BOX, steelL, 0, 0.095, 0.17, 0.034, 0.034, 0.02),
      p(BOX, steelL, 0, 0.086, 0.76, 0.01, 0.025, 0.012),
    ]),
  ];
}