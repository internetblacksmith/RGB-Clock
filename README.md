# RGB Clock

[![Netlify Status](https://api.netlify.com/api/v1/badges/4aa788e3-4b89-4635-a316-08b7cb138b64/deploy-status)](https://app.netlify.com/sites/rgb-hex-clock/deploys)
[![CI](https://github.com/internetblacksmith/RGB-Clock/actions/workflows/ci.yml/badge.svg)](https://github.com/internetblacksmith/RGB-Clock/actions/workflows/ci.yml)

Live at **<https://rc.internetblacksmith.dev>**.

A clock that paints the page with the current timestamp interpreted as a 24-bit RGB color. Every 200 ms the background and a centered hex label update; the label's color is the numeric inverse of the background, which produces a sharp split at the extremes and intentionally muddy contrast around the mid-grays — it's part of the art piece.

The math: `Math.floor(Date.now() / 200) % 0x1000000`, rendered as `#rrggbb`. Respects `prefers-reduced-motion: reduce` (renders a single frame instead of animating).

## Stack

- [Vite](https://vitejs.dev/) — dev server, build, HMR
- [Vitest](https://vitest.dev/) + jsdom — unit tests
- [ESLint](https://eslint.org/) 9 (flat config)
- [@fontsource/inconsolata](https://fontsource.org/fonts/inconsolata) — self-hosted font, no Google Fonts CDN
- Vanilla ES modules, plain CSS — no framework, no Sass, no transpiler beyond what esbuild already does for the browserslist targets

## Develop

```bash
yarn install
yarn dev         # http://localhost:5173
yarn test        # headless
yarn build       # → dist/
yarn preview     # serve dist/
```

A `Makefile` wraps these with an interactive menu (`make`).

## Layout

```
index.html              Vite entry
src/clock.js            pure helpers (decToFullHex, colorAt, COLOR_MAX)
src/main.js             bootstrap + DOM + reduced-motion handling
src/styles.css          ~15 lines of CSS
public/                 favicon + robots.txt
test/clock.test.js      vitest specs
vite.config.js          shared Vite + Vitest config
.github/workflows/ci.yml lint + test + build on push/PR
```

## License

Personal portfolio project.
