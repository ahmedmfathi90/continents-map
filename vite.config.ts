import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // 1. يفضل تركها './' (مسار نسبي) لكي تقرأ الملفات من نفس مكان وجود mymovie.html تلقائياً
    base: './',

    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    // 2. توجيه مخرجات الـ Build وتغيير اسم ملف الـ HTML
    build: {
      outDir: 'docs',
      rollupOptions: {
        input: {
          // السطر ده بيخلي Vite يأخد ملف index.html الرئيسي ويبنيه باسم mymovie.html
          mymovie: path.resolve(__dirname, 'index.html'),
        },
      },
    }
  };
});