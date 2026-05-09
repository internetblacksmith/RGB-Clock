export const COLOR_MAX = 0xffffff;

export function decToFullHex(value) {
  return `#${value.toString(16).padStart(6, '0')}`;
}

export function colorAt(timestamp, tickMs) {
  return Math.floor(timestamp / tickMs) % (COLOR_MAX + 1);
}
