import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // 1. استخدام مسار نسبي ليعمل المشروع في أي مكان (جيتهاب، نيتليفاي، أو دومين الشركة)
    base: './',

    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    // 2. توجيه مخرجات الـ Build لمجلد docs بدلاً من dist
    build: {
      outDir: 'docs',
    }
  };
});