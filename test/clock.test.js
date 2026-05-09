import { describe, it, expect } from 'vitest';
import { COLOR_MAX, colorAt, decToFullHex } from '../src/clock.js';

describe('decToFullHex', () => {
  it('returns #000000 for 0', () => {
    expect(decToFullHex(0)).toBe('#000000');
  });

  it('returns #ffffff for the max 24-bit value', () => {
    expect(decToFullHex(COLOR_MAX)).toBe('#ffffff');
  });

  it('left-pads short hex values with zeros', () => {
    expect(decToFullHex(15)).toBe('#00000f');
    expect(decToFullHex(255)).toBe('#0000ff');
    expect(decToFullHex(0xabc)).toBe('#000abc');
  });

  it('always produces a 7-character string across the 24-bit range', () => {
    for (let n = 0; n <= COLOR_MAX; n += 0x4321) {
      expect(decToFullHex(n)).toHaveLength(7);
    }
  });
});

describe('colorAt', () => {
  it('returns 0 at timestamp 0', () => {
    expect(colorAt(0, 200)).toBe(0);
  });

  it('floors fractional ticks', () => {
    expect(colorAt(199, 200)).toBe(0);
    expect(colorAt(200, 200)).toBe(1);
    expect(colorAt(399, 200)).toBe(1);
    expect(colorAt(400, 200)).toBe(2);
  });

  // Regression: previous code did `% 0xffffff` which never reached pure white.
  it('reaches the maximum colour value', () => {
    expect(colorAt(200 * COLOR_MAX, 200)).toBe(COLOR_MAX);
  });

  it('wraps after the full 24-bit cycle', () => {
    expect(colorAt(200 * (COLOR_MAX + 1), 200)).toBe(0);
    expect(colorAt(200 * (COLOR_MAX + 2), 200)).toBe(1);
  });
});
