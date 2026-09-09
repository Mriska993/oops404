import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    watch: {
      // Fisierele mari si lasate in radacina (poze, arhive, capturi brute) nu au ce
      // cauta in watcher: daca sunt blocate de alt program, Vite crapa cu EBUSY.
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/ss/**',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.png',
        '**/*.zip',
        '**/*.crdownload',
        '**/*.tmp',
      ],
    },
  },
});
