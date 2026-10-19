import { Sprite, TilingSprite } from 'pixi.js';
import { BaseMap } from './BaseMap.js';
import { Satellite } from '../entities/Satellite.js';
import { Asteroid } from '../entities/Asteroid.js';
import {
  makeEarthTexture, makeCloudTexture, makeVignetteTexture, makeGlowTexture,
} from '../utils/textures.js';

export class EarthMap extends BaseMap {
  constructor(screen) {
    super(screen);
    const { width: w, height: h } = screen;
    const earthTex = makeEarthTexture();
    const cloudTex = makeCloudTexture();
    this.layers = [];

    const tiling = (tex, scale) => {
      const t = new TilingSprite({ texture: tex, width: w, height: h });
      t.tileScale.set(scale);
      return t;
    };

    // Neeche se upar: Earth -> clouds ki parchhai -> neeche ke clouds
    const surface = tiling(earthTex, 2);
    this.shadow = tiling(cloudTex, 2.5);
    this.shadow.tint = 0x000814;
    this.shadow.alpha = 0.3;
    const low = tiling(cloudTex, 2.5);
    low.alpha = 0.85;
    this.low = low;
    this.background.addChild(surface, this.shadow, low);

    // Ship ke upar: tez, halke baadal (altitude ka feel)
    const high = tiling(cloudTex, 4);
    high.alpha = 0.35;
    const vignette = new Sprite(makeVignetteTexture());
    vignette.width = w; vignette.height = h;
    const glare = new Sprite(makeGlowTexture());
    glare.anchor.set(0.5);
    glare.position.set(w * 0.85, h * 0.1);
    glare.width = glare.height = 700;
    glare.blendMode = 'add';
    this.foreground.addChild(high, vignette, glare);

    // sprite, speed, parallax
    this.addLayer(surface, 50, 0.03);
    this.addLayer(low, 120, 0.08);
    this.addLayer(high, 340, 0.2);

    this.satTimer = 2;
    this.astTimer = 1;
  }

  addLayer(sprite, speed, parallax) {
    this.layers.push({ sprite, speed, parallax, x: 0, y: 0 });
  }

  update(dt, player) {
    const dx = player.x - this.screen.width / 2;
    for (const L of this.layers) {
      L.y += L.speed * dt;
      L.x += 8 * dt; // halki hawa
      L.sprite.tilePosition.set(L.x - dx * L.parallax, L.y);
    }
    this.shadow.tilePosition.set(this.low.tilePosition.x + 40, this.low.tilePosition.y + 60);

    this.spawn(dt);
    this.updateObjects(dt);
  }

  spawn(dt) {
    const w = this.screen.width;
    this.satTimer -= dt;
    this.astTimer -= dt;
    if (this.satTimer <= 0) {
      this.satTimer = 5 + Math.random() * 4;
      const s = new Satellite();
      s.position.set(100 + Math.random() * (w - 200), -120);
      this.objects.addChild(s);
    }
    if (this.astTimer <= 0) {
      this.astTimer = 1 + Math.random() * 1.5;
      const a = new Asteroid();
      a.position.set(Math.random() * w, -100);
      this.objects.addChild(a);
    }
  }
}