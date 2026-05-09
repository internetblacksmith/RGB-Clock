# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A static single-page web app that paints the page with the current timestamp interpreted as a 24-bit RGB color, ticking every 200 ms.

## Build Commands

```bash
make             # Interactive menu
make dev         # Vite dev server (HMR) — http://localhost:5173
make test        # Vitest, headless (jsdom env)
make test-watch  # Vitest watch mode
make lint        # ESLint 9 flat config
make build       # Production build into dist/
make preview     # Serve dist/ to preview the production bundle
```

`yarn dev / test / build / lint` work too — Make is just a thin wrapper for the menu.

## Architecture

Plain ES-module web app. No framework, no build-time templating, no transpiler beyond what Vite/esbuild already provides for the browserslist targets.

- `index.html` — Vite entry. Loads `/src/main.js` as a module. Inconsolata is pulled from Google Fonts at runtime; the favicon is a static SVG in `public/`.
- `src/main.js` — exports `decToFullHex(value)`. On `DOMContentLoaded` it kicks off a 200 ms `setInterval` that updates `document.body.style.backgroundColor` and the `#color` span's text + foreground color.
- `src/styles.css` — plain CSS using `display: grid; place-items: center` and `clamp()` for responsive sizing.
- `public/` — copied verbatim into the build output (favicon, robots.txt).
- `test/main.test.js` — Vitest tests for `decToFullHex` (boundaries, padding, full-range length invariant). Runs in jsdom.
- `vite.config.js` — single config for both Vite (build target `es2020`) and Vitest (jsdom environment).
- `eslint.config.mjs` — flat config; single-quote enforcement and unused-var checking.
- `.github/workflows/ci.yml` — runs lint → test → build on push and PR.

The browserslist (`> 1%, last 2 versions, Firefox ESR`) lives in `package.json`; Vite/esbuild reads it implicitly.

## Critical Rules

- Pin dependencies to exact latest versions. Node `25.9.0` / npm `11.14.1` are pinned in `package.json#engines` and `.node-version`.
- Keep `dist/` and `node_modules/` out of git (already in `.gitignore`).
- The pure helper `decToFullHex` is the only thing exported from `src/main.js` for testing — keep new logic testable by isolating side-effect-free helpers the same way.
- This is a one-file portfolio piece. Resist adding frameworks, state libraries, or routing — if it can't be done with `<script type="module">` and a few CSS rules, it doesn't belong here.
