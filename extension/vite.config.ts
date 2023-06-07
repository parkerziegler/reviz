import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { PreRenderedChunk } from 'rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        devtools: resolve(__dirname, 'devtools.html'),
        panel: resolve(__dirname, 'panel.html'),
        inspect: resolve(__dirname, 'scripts', 'inspect.ts'),
        'service-worker': resolve(__dirname, 'scripts', 'service-worker.ts'),
      },
      output: {
        entryFileNames: (chunkInfo: PreRenderedChunk) =>
          chunkInfo.name.includes('inspect') ||
          chunkInfo.name.includes('service-worker')
            ? '[name].js'
            : '[name]-[hash].js',
      },
    },
  },
  esbuild: {
    minifyIdentifiers: false,
  },
});
