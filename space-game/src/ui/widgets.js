import { Container, Graphics, Text } from 'pixi.js';

export function makeText(str, size = 18, fill = 0xffffff, bold = true) {
  return new Text({
    text: str,
    style: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontSize: size,
      fill,
      fontWeight: bold ? 'bold' : 'normal',
    },
  });
}

export function coinIcon(r = 11) {
  return new Graphics()
    .circle(0, 0, r).fill(0xffc83d).stroke({ width: 2, color: 0xfff3b0 })
    .circle(0, 0, r * 0.62).stroke({ width: 1.5, color: 0xb97a00 });
}

export function makeButton(label, w, h, color, onTap, disabled = false) {
  const c = new Container();
  const bg = new Graphics()
    .roundRect(0, 0, w, h, 10)
    .fill(disabled ? 0x2a3345 : color)
    .stroke({ width: 2, color: disabled ? 0x44506a : 0xffffff, alpha: 0.8 });
  const t = makeText(label, Math.min(20, Math.round(h * 0.45)), disabled ? 0x8a95aa : 0x04121f);
  const k = (w - 14) / t.width;
  if (k < 1) t.scale.set(k);
  t.anchor.set(0.5);
  t.position.set(w / 2, h / 2);
  c.addChild(bg, t);
  if (!disabled) {
    c.eventMode = 'static';
    c.cursor = 'pointer';
    c.on('pointerdown', () => { c.alpha = 0.7; });
    c.on('pointerup', () => { c.alpha = 1; });
    c.on('pointerupoutside', () => { c.alpha = 1; });
    c.on('pointertap', onTap);
  }
  return c;
}