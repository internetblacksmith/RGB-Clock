# RGB Clock

A clock that paints the page with the current timestamp interpreted as a 24-bit RGB color. Every 200 ms the background and a centered hex label update; the label's color is the inverse of the background, so it's always readable.

The math: `Math.floor(Date.now() / 200) % 0xFFFFFF`, rendered as `#rrggbb`.

## Stack

- [Vite](https://vitejs.dev/) — dev server, build, HMR
- [Vitest](https://vitest.dev/) + jsdom — unit tests
- [ESLint](https://eslint.org/) 9 (flat config)
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
src/main.js             clock logic (exports decToFullHex)
src/styles.css          ~15 lines of CSS
public/                 favicon + robots.txt
test/main.test.js       vitest specs
vite.config.js          shared Vite + Vitest config
.github/workflows/ci.yml lint + test + build on push/PR
```

## License

Personal portfolio project.
