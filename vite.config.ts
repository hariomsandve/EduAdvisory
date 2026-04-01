import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // ── Frontend source root ───────────────────────────
    root: path.resolve(__dirname, 'frontend'),

    // ── Plugins ────────────────────────────────────────
    plugins: [react(), tailwindcss()],

    // ── Environment variables ──────────────────────────
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    // ── Path aliases ───────────────────────────────────
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'frontend'),
      },
    },

    // ── Build output ───────────────────────────────────
    build: {
      outDir: path.resolve(__dirname, 'frontend', 'dist'),
      emptyOutDir: true,
    },

    // ── Dev server ─────────────────────────────────────
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
