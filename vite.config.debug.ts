import { defineConfig } from 'vite';
import base from './vite.config';

/**
 * Config folosit DOAR pentru depanare: forțează build-ul de dezvoltare al React,
 * ca erorile de hidratare să vină cu mesajul complet („server rendered X, client Y”)
 * în loc de „Minified React error #418”.
 *
 *   npx vite build -c vite.config.debug.ts
 *   npx vite build -c vite.config.debug.ts --ssr src/entry-server.tsx --outDir dist-ssr
 *   node scripts/prerender.mjs
 *
 * Nu intră niciodată în `npm run build`.
 */
export default defineConfig({
  ...base,
  define: { 'process.env.NODE_ENV': '"development"' },
  build: { minify: false },
});
