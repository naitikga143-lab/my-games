import { Application, Container } from 'pixi.js';
import { CONFIG } from '../config.js';
import { Input } from './Input.js';
import { State } from './State.js';
import { Player } from '../entities/Player.js';
import { Station } from '../entities/Station.js';
import { EarthMap } from '../maps/EarthMap.js';
import { World } from '../systems/World.js';
import { Spawner } from '../systems/Spawner.js';
import { Weapons } from '../systems/Weapons.js';
import { Effects } from '../systems/Effects.js';
import { Exhaust } from '../systems/Exhaust.js';
import { resolveCollisions } from '../systems/Collisions.js';
import { Hud } from '../ui/Hud.js';
import { ShopScreen } from '../ui/ShopScreen.js';
import { GameOverScreen } from '../ui/GameOver.js';

export class Game {
  async start() {
    const app = (this.app = new Application());
    await app.init({
      background: 0x050816,
      resizeTo: window,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2.5), // sharp on retina / phones
      autoDensity: true,
    });
    document.body.appendChild(app.canvas);

    this.input = new Input(app.canvas);
    this.state = new State();
    this.map = new EarthMap(app.screen); // later: pick Mars / Jupiter / Moon here
    this.world = new World();
    this.spawner = new Spawner(this.world, app.screen);
    this.weapons = new Weapons(this.world);
    this.effects = new Effects();
    this.exhaust = new Exhaust();
    this.player = new Player();
    this.stationLayer = new Container();
    this.hud = new Hud();
    this.shop = new ShopScreen(app.screen);
    this.gameOverScreen = new GameOverScreen();

    this.root = new Container(); // moved for screen shake
    this.root.addChild(
      this.map.background, this.stationLayer, this.world.objects, this.world.shots,
      this.exhaust, this.player, this.effects, this.map.foreground,
    );
    app.stage.addChild(this.root, this.hud, this.shop, this.gameOverScreen);

    this.mode = 'play'; // play | shop | over
    this.speed = 1;     // eased world speed (0 = map stopped)
    this.inZone = false;
    this.zoneStation = null;
    this.station = null;
    this.shakeMag = 0;
    this.overTimer = 0;
    this.sw = 0; this.sh = 0;

    this.player.reset(app.screen);
    this.input.setButtonVisible(true);
    app.ticker.add(t => this.update(t.deltaMS / 1000));
  }

  shake(m) { this.shakeMag = Math.max(this.shakeMag, m); }

  checkResize() {
    const { width, height } = this.app.screen;
    if (width === this.sw && height === this.sh) return;
    this.sw = width; this.sh = height;
    this.map.resize(width, height);
    this.hud.layout(width, height);
  }

  update(dt) {
    dt = Math.min(dt, 0.05);
    this.checkResize();
    this.effects.update(dt);

    if (this.shakeMag > 0.3) {
      this.root.position.set((Math.random() - 0.5) * this.shakeMag, (Math.random() - 0.5) * this.shakeMag);
      this.shakeMag *= Math.max(0, 1 - dt * 8);
    } else {
      this.shakeMag = 0;
      this.root.position.set(0, 0);
    }

    if (this.mode === 'shop') { this.shop.update(dt); return; }
    if (this.mode === 'over') { this.updateOver(dt); return; }

    const { input, state, player, world, map } = this;
    const screen = this.app.screen;

    // world speed: eases to 0 inside a safe zone, eases up when fuel is active
    const target = this.inZone ? 0 : state.speedMult;
    this.speed += (target - this.speed) * Math.min(1, dt * 2.5);
    if (target === 0 && this.speed < 0.02) this.speed = 0;
    const wdt = dt * this.speed;

    if (!this.inZone) state.update(dt);           // fuel burns only while flying
    state.distance += CONFIG.metersPerSecond * wdt; // distance is never reduced by fuel type

    player.update(dt, input, screen, state.fuel ? state.fuel.agility : 1);
    this.weapons.update(dt, input, player);
    this.exhaust.update(dt, player, state.fuel ? state.fuel.trail : undefined);
    map.update(wdt, player);
    this.spawner.update(wdt, state.distance, !!this.station || this.inZone);
    world.update(wdt, dt, player, screen, this.effects);
    this.updateStation(wdt, dt);
    if (this.mode !== 'play') return;
    resolveCollisions(this);

    let stationText;
    if (this.inZone) stationText = 'SAFE ZONE - FLY INTO THE GATE';
    else if (this.station && !this.station.passed) stationText = 'STATION AHEAD';
    else stationText = `NEXT STATION  ${Math.max(0, Math.ceil(state.nextShopDistance - state.distance))} m`;
    this.hud.update(state, { missileFrac: this.weapons.missileFrac, stationText });
  }

  // ---------- stations / safe zone ----------
  updateStation(wdt, dt) {
    const { state, player } = this;
    const screen = this.app.screen;

    if (!this.station && state.distance >= state.nextShopDistance) {
      const kind = CONFIG.shopOrder[state.shopIndex % CONFIG.shopOrder.length];
      state.shopIndex++;
      const st = new Station(kind, screen);
      st.position.set(screen.width / 2 + (Math.random() - 0.5) * screen.width * 0.2, -260 * st.s);
      this.station = st;
      this.stationLayer.addChild(st);
    }
    const st = this.station;
    if (!st) return;

    st.update(wdt, dt, this.inZone && this.zoneStation === st);

    if (st.y > screen.height + 420 * st.s) { // flew past without docking
      if (this.zoneStation === st) this.exitZone();
      this.stationLayer.removeChild(st);
      st.destroy({ children: true });
      this.station = null;
      return;
    }

    if (!st.passed) {
      const d = Math.hypot(player.x - st.x, player.y - st.y);
      if (!this.inZone && d < st.zoneR && st.y > screen.height * 0.15) this.enterZone(st);
      else if (this.inZone && this.zoneStation === st && d > st.zoneR) this.exitZone();
    }

    if (this.inZone && this.zoneStation === st && st.dockCd <= 0 && player.alive) {
      const gd = Math.hypot(player.x - st.gateX, player.y - st.gateY);
      if (gd < st.gateRadius + player.radius) this.openShop(st);
    }
  }

  enterZone(st) {
    this.inZone = true;
    this.zoneStation = st;
    this.world.fadeHazards();
    this.effects.ring(st.x, st.y, st.accent, st.zoneR * 0.6);
  }

  exitZone() {
    this.inZone = false;
    if (this.zoneStation) this.zoneStation.passed = true;
    this.zoneStation = null;
    this.player.invuln = 2; // short grace after leaving
  }

  openShop(st) {
    this.mode = 'shop';
    this.input.clear();
    this.input.setButtonVisible(false);
    this.shop.open(st, this.state, () => this.closeShop(st));
  }

  closeShop(st) {
    this.mode = 'play';
    st.dockCd = 1.5;
    const screen = this.app.screen;
    this.player.position.set(
      Math.max(45, Math.min(screen.width - 45, st.gateX)),
      Math.min(screen.height - 60, st.gateY + 130),
    );
    this.player.vx = 0; this.player.vy = 0;
    this.input.clear();
    this.input.setButtonVisible(true);
  }

  // ---------- game over ----------
  gameOver() {
    if (this.mode === 'over') return;
    this.mode = 'over';
    this.player.alive = false;
    this.player.visible = false;
    this.effects.explosion(this.player.x, this.player.y, 2.4);
    this.shake(22);
    this.overTimer = 0.9;
    this.input.setButtonVisible(false);
  }

  updateOver(dt) {
    this.map.update(dt * 0.3, this.player);
    this.exhaust.update(dt, this.player);
    this.overTimer -= dt;
    if (this.overTimer <= 0 && !this.gameOverScreen.visible) {
      const { width, height } = this.app.screen;
      this.gameOverScreen.show(width, height, this.state, () => this.reset());
    }
    if (this.gameOverScreen.visible && this.input.is('Enter')) this.reset();
  }

  reset() {
    this.world.clear();
    this.effects.clear();
    this.exhaust.clear();
    if (this.station) {
      this.stationLayer.removeChild(this.station);
      this.station.destroy({ children: true });
      this.station = null;
    }
    this.state.reset();
    this.spawner.reset();
    this.weapons.reset();
    this.speed = 1;
    this.inZone = false;
    this.zoneStation = null;
    this.shakeMag = 0;
    this.player.reset(this.app.screen);
    this.gameOverScreen.hide();
    this.input.clear();
    this.input.setButtonVisible(true);
    this.mode = 'play';
  }
}