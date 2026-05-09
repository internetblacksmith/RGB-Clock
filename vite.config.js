import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2020',
    cssCodeSplit: false,
  },
  test: {
    environment: 'jsdom',
    include: ['test/**/*.test.js'],
  },
});
