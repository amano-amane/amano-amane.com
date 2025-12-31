import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// Extend Vite config with vite-ssg options
interface ViteSSGConfig extends UserConfig {
  ssgOptions?: {
    beastiesOptions?: {
      preload?: 'body' | 'media' | 'swap' | 'js' | 'js-lazy';
    };
  };
}

// https://vite.dev/config/
const config: ViteSSGConfig = {
  plugins: [vue()],
  ssgOptions: {
    beastiesOptions: {
      // Non-blocking CSS loading: preload then swap to stylesheet
      preload: 'swap',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variables" as *;`,
      },
    },
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@phosphor-icons')) {
            return 'vendor-icons';
          }
        },
      },
    },
  },
};

export default config;
