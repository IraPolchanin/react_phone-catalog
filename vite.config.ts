import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/react_phone-catalog/' : '/',

  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5174,
    open: true,
  },

  preview: {
    port: 4174,
    open: '/react_phone-catalog/',
    host: 'localhost',
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        includePaths: ['src'],
        additionalData: `@use "@/styles/abstracts/abstracts" as *;`,
      },
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    emptyOutDir: true,
    sourcemap: true,
  },

  publicDir: 'public',

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}));
