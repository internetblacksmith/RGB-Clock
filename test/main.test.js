import { describe, it, expect } from 'vitest';
import { decToFullHex } from '../src/main.js';

describe('decToFullHex', () => {
  it('returns #000000 for 0', () => {
    expect(decToFullHex(0)).toBe('#000000');
  });

  it('returns #ffffff for the max 24-bit value', () => {
    expect(decToFullHex(0xffffff)).toBe('#ffffff');
  });

  it('left-pads short hex values with zeros', () => {
    expect(decToFullHex(15)).toBe('#00000f');
    expect(decToFullHex(255)).toBe('#0000ff');
    expect(decToFullHex(0xabc)).toBe('#000abc');
  });

  it('always produces a 7-character string across the 24-bit range', () => {
    for (let n = 0; n <= 0xffffff; n += 0x4321) {
      expect(decToFullHex(n)).toHaveLength(7);
    }
  });
});
