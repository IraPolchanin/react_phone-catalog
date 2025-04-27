import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // Включає нову JSX трансформацію (React 17+)
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
      '@': path.resolve(__dirname, './src'), // Абсолютні імпорти
    },
  },
  server: {
    port: 5174,
    open: true, // Автоматично відкривати браузер
  },
  base: '/',
  css: {
    modules: {
      localsConvention: 'camelCase', // camelCase для CSS модулів
    },
    preprocessorOptions: {
      scss: {
        includePaths: ['src'],
        additionalData: `@use "@/styles/abstracts/abstracts" as *;`, // Глобальні SCSS змінні з abstracts.scss
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096, // 4kb
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Оптимізація основних залежностей
  },
});
