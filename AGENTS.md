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
- `src/clock.js` — pure helpers: `decToFullHex(value)`, `colorAt(timestamp, tickMs)`, and the `COLOR_MAX = 0xffffff` constant. No DOM imports — the test file imports from here so test runs never touch `document`.
- `src/main.js` — bootstrap. On `DOMContentLoaded` (or immediately if the document is already parsed) it queries `#color`, paints once, and starts a 200 ms `setInterval` unless `prefers-reduced-motion: reduce` is set. A `change` listener on the media query plays/pauses the interval if the user toggles the OS setting at runtime.
- `src/styles.css` — plain CSS using `display: grid; place-items: center` and `clamp()` for responsive sizing.
- `public/` — copied verbatim into the build output (favicon, robots.txt).
- `test/clock.test.js` — Vitest tests against `src/clock.js`: `decToFullHex` (boundaries, padding, length invariant) and `colorAt` (flooring, max value, wrap). Runs in jsdom (Vitest default for this repo) but the tests themselves don't touch the DOM.
- `vite.config.js` — single config for both Vite (build target `es2020`) and Vitest (jsdom environment).
- `eslint.config.mjs` — flat config; single-quote enforcement and unused-var checking.
- `.github/workflows/ci.yml` — runs lint → test → build on push and PR.

The browserslist (`> 1%, last 2 versions, Firefox ESR`) lives in `package.json`; Vite/esbuild reads it implicitly.

## Critical Rules

- Pin dependencies to exact latest versions. Node `24.14.0` / npm `11.11.0` are pinned in `package.json#engines` and `.node-version` (current LTS — Netlify's dashboard agrees).
- Keep `dist/` and `node_modules/` out of git (already in `.gitignore`).
- Keep `src/clock.js` pure (no `document`/`window`). All DOM and timer code lives in `src/main.js`. New testable logic goes in `clock.js`.
- This is a one-file portfolio piece. Resist adding frameworks, state libraries, or routing — if it can't be done with `<script type="module">` and a few CSS rules, it doesn't belong here.
