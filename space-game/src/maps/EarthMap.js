import { Sprite, TilingSprite } from 'pixi.js';
import { BaseMap } from './BaseMap.js';
import {
  makeEarthTexture, makeCloudTexture, makeVignetteTexture, getGlowTexture,
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

    // Earth -> cloud shadows -> low clouds
    const surface = tiling(earthTex, 2);
    this.shadow = tiling(cloudTex, 2.5);
    this.shadow.tint = 0x000814;
    this.shadow.alpha = 0.3;
    this.low = tiling(cloudTex, 2.5);
    this.low.alpha = 0.85;
    this.background.addChild(surface, this.shadow, this.low);

    // Above the ship: fast, thin clouds (altitude feel)
    const high = tiling(cloudTex, 4);
    high.alpha = 0.35;
    this.vignette = new Sprite(makeVignetteTexture());
    this.vignette.width = w;
    this.vignette.height = h;
    this.glare = new Sprite(getGlowTexture());
    this.glare.anchor.set(0.5);
    this.glare.tint = 0xfff4c8;
    this.glare.alpha = 0.9;
    this.glare.width = this.glare.height = 700;
    this.glare.blendMode = 'add';
    this.glare.position.set(w * 0.85, h * 0.1);
    this.foreground.addChild(high, this.vignette, this.glare);

    this.tilings = [surface, this.shadow, this.low, high];
    this.addLayer(surface, 50, 0.03);
    this.addLayer(this.low, 120, 0.08);
    this.addLayer(high, 340, 0.2);
  }

  addLayer(sprite, speed, parallax) {
    this.layers.push({ sprite, speed, parallax, x: 0, y: 0 });
  }

  resize(w, h) {
    for (const t of this.tilings) { t.width = w; t.height = h; }
    this.vignette.width = w;
    this.vignette.height = h;
    this.glare.position.set(w * 0.85, h * 0.1);
  }

  update(wdt, player) {
    const dx = player.x - this.screen.width / 2;
    for (const L of this.layers) {
      L.y += L.speed * wdt;
      L.x += 8 * wdt; // light wind
      L.sprite.tilePosition.set(L.x - dx * L.parallax, L.y);
    }
    this.shadow.tilePosition.set(this.low.tilePosition.x + 40, this.low.tilePosition.y + 60);
  }
}