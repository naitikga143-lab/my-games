import { Bot } from './bot.js';
import { createCreatureModel } from '../game/creaturemodel.js';

const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const rnd = (a, b) => a + Math.random() * (b - a);

// Bot ka hi dhaancha: table ke peeche chhupna, jhaankna, paas aane par bhaagna.
// Farak: goli ki jagah patakha phenkta hai (ek peek me ek).
export class Creature extends Bot {
  constructor(i, scene, headless, room) {
    super(i, scene, headless, headless ? null : () => createCreatureModel(room));
    this.room = room;
    this.fwType = 0;
    this.fw = null;
    this.f.isBot = true;
  }

  spawn(avoid, node) {
    super.spawn(avoid, node);
    this.f.hp = 60;
    this.fireCool = rnd(1.5, 3);
    this.shots = 0;
  }

  doPeek(dt) {
    const f = this.f, t = this.vis;
    f.crouch = false;
    if (!t) {
      this.faceYaw(this.alertT > 0 ? this.alertYaw : this.hideYaw, dt, 4);
      if (this.t > this.peekDur) this.endPeek();
      return;
    }
    if (!this.contact) { this.contact = true; if (this.onEngage) this.onEngage(this, t); }

    this.eye(this._e || (this._e = { set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; } }));
    const e = this._e;
    const ddx = t.pos.x - e.x, ddy = t.pos.y + 1.0 - e.y, ddz = t.pos.z - e.z;
    const want = Math.atan2(-ddx, -ddz);
    this.faceYaw(want, dt, 10);
    this.pitch += (Math.atan2(ddy, Math.hypot(ddx, ddz)) - this.pitch) * Math.min(1, dt * 8);
    const err = Math.abs(wrap(want - this.yaw));

    if (this.fw && this.fireCool <= 0 && this.visT >= this.react * 0.5 && err < 0.35) {
      if (this.fw.throwAt(f, t, this.fwType)) {
        this.shots++;
        this.model.kick();
        this.fireCool = rnd(2.2, 3.6);
      } else this.fireCool = 0.5;       // abhi gap/limit: thodi der baad dobara
    }
    if (this.shots >= 1 || this.t > this.peekDur + 1.2) this.endPeek();
  }
}