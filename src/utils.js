export const randomRange = (min, max) => Math.random() * (max - min) + min;

export const interpolateColors = (a, b, progress) => {
  const ah = parseInt(a.replace(/#/g, ''), 16);
  const ar = ah >> 16;
  const ag = (ah >> 8) & 0xff;
  const ab = ah & 0xff;
  const bh = parseInt(b.replace(/#/g, ''), 16);
  const br = bh >> 16;
  const bg = (bh >> 8) & 0xff;
  const bb = bh & 0xff;

  const rr = ar + progress * (br - ar);
  const rg = ag + progress * (bg - ag);
  const rb = ab + progress * (bb - ab);
  return `#${(((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)}`;
};
