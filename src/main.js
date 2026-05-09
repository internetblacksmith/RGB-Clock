import '@fontsource/inconsolata/latin-400.css';
import './styles.css';
import { COLOR_MAX, colorAt, decToFullHex } from './clock.js';

const TICK_MS = 200;

function bootstrap() {
  const target = document.querySelector('#color');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const render = () => {
    const value = colorAt(Date.now(), TICK_MS);
    const bg = decToFullHex(value);
    const fg = decToFullHex(COLOR_MAX - value);
    document.body.style.backgroundColor = bg;
    target.style.color = fg;
    target.textContent = bg.toUpperCase();
  };

  let intervalId = null;
  const play = () => {
    if (intervalId === null) intervalId = setInterval(render, TICK_MS);
  };
  const pause = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  render();
  if (!reducedMotion.matches) play();

  reducedMotion.addEventListener('change', (e) => {
    if (e.matches) pause();
    else play();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
