import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve('index.html'),
          explore: path.resolve('explore.html'),
          creatures: path.resolve('creatures.html'),
          pantheons: path.resolve('pantheons.html'),
          timeline: path.resolve('timeline.html'),
          connections: path.resolve('connections.html'),
          about: path.resolve('about.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
