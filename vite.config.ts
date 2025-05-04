import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Додаємо параметр mode в функцію конфігурації
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
    assetsInlineLimit: 4096,
    emptyOutDir: true,
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}));
