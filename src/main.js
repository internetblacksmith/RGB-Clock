import './styles.css';

const COLOR_SPACE = 0xffffff;
const TICK_MS = 200;

export function decToFullHex(value) {
  return `#${value.toString(16).padStart(6, '0')}`;
}

function tick(target) {
  const value = Math.floor(Date.now() / TICK_MS) % COLOR_SPACE;
  const bg = decToFullHex(value);
  const fg = decToFullHex(COLOR_SPACE - value);

  document.body.style.backgroundColor = bg;
  target.style.color = fg;
  target.textContent = bg.toUpperCase();
}

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('color');
    tick(target);
    setInterval(() => tick(target), TICK_MS);
  });
}
