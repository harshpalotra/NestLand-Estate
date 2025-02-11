import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
       target: 'https://nestland-estate.onrender.com/api',
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      buffer: 'buffer',
      stream: 'stream-browserify',
    },
  },
  
  optimizeDeps: {
    include: [ 'buffer', 'crypto', 'stream', 'events'],  // Ensure key Node.js modules are included
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true, // Enable process polyfill if needed
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  plugins: [react()],
});
