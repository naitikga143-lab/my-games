import { Sprite, TilingSprite } from 'pixi.js';
import { BaseMap } from './BaseMap.js';
import { SkyFX } from '../systems/SkyFX.js';
import {
  makeEarthTexture, makeCloudTexture, makeFogTexture, makeVignetteTexture, getGlowTexture,
} from '../utils/textures.js';

export class EarthMap extends BaseMap {
  constructor(screen) {
    super(screen);
    const { width: w, height: h } = screen;
    const earthTex = makeEarthTexture();
    const cloudA = makeCloudTexture(7, 6);
    const cloudB = makeCloudTexture(21, 5);
    const fogTex = makeFogTexture();
    this.layers = [];

    const tiling = (tex, scale, alpha = 1, tint = 0xffffff) => {
      const t = new TilingSprite({ texture: tex, width: w, height: h });
      t.tileScale.set(scale);
      t.alpha = alpha;
      t.tint = tint;
      return t;
    };

    // Ground -> fog -> cloud shadows -> low clouds -> mid clouds
    const surface = tiling(earthTex, 2);
    const fog = tiling(fogTex, 3.2, 0.22);
    this.shadowA = tiling(cloudA, 2.6, 0.32, 0x000a1c);
    this.shadowB = tiling(cloudB, 3.4, 0.26, 0x000a1c);
    this.low = tiling(cloudA, 2.6, 0.7);
    this.mid = tiling(cloudB, 3.4, 0.5);
    this.background.addChild(surface, fog, this.shadowA, this.shadowB, this.low, this.mid);

    // Above the ship: thin fast clouds + big puffs + wind streaks + light
    const high = tiling(cloudB, 5, 0.14);
    this.sky = new SkyFX(screen);
    this.vignette = new Sprite(makeVignetteTexture());
    this.vignette.width = w;
    this.vignette.height = h;
    this.glare = new Sprite(getGlowTexture());
    this.glare.anchor.set(0.5);
    this.glare.tint = 0xfff4c8;
    this.glare.alpha = 0.35;
    this.glare.width = this.glare.height = 480;
    this.glare.blendMode = 'add';
    this.glare.position.set(w * 0.85, h * 0.1);
    this.foreground.addChild(high, this.sky, this.vignette, this.glare);

    this.tilings = [surface, fog, this.shadowA, this.shadowB, this.low, this.mid, high];
    this.addLayer(surface, 50, 0.03);
    this.addLayer(fog, 75, 0.05);
    this.addLayer(this.low, 120, 0.08);
    this.addLayer(this.mid, 190, 0.13);
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

  update(wdt, player, speed = 1, dt = 0) {
    const dx = player.x - this.screen.width / 2;
    for (const L of this.layers) {
      L.y += L.speed * wdt;
      L.x += 8 * wdt; // light wind
      L.sprite.tilePosition.set(L.x - dx * L.parallax, L.y);
    }
    this.shadowA.tilePosition.set(this.low.tilePosition.x + 40, this.low.tilePosition.y + 60);
    this.shadowB.tilePosition.set(this.mid.tilePosition.x + 70, this.mid.tilePosition.y + 100);
    this.sky.update(dt, speed, player);
  }
}