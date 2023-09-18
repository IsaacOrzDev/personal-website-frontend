import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

const hash = Math.floor(Math.random() * 90000) + 10000;

export default defineConfig(({ mode }) => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    // server: {
    //   headers: {
    //     'Cache-Control': 'no-store',
    //   },
    // },
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          entryFileNames: `[name]` + hash + `.js`,
          chunkFileNames: `[name]` + hash + `.js`,
          assetFileNames: `[name]` + hash + `.[ext]`,
        },
      },
    },
    resolve: {
      alias: {
        screens: path.resolve(__dirname, './src/screens'),
        components: path.resolve(__dirname, './src/components'),
        services: path.resolve(__dirname, './src/services'),
        hooks: path.resolve(__dirname, './src/hooks'),
        styles: path.resolve(__dirname, './src/styles'),
        store: path.resolve(__dirname, './src/store'),
        models: path.resolve(__dirname, './src/models'),
        config: path.resolve(__dirname, './src/config'),
      },
    },
    plugins: [
      react(),
      // svgr options: https://react-svgr.com/docs/options/
      svgr({ svgrOptions: { icon: true } }),
      VitePWA({
        manifest: {
          short_name: 'ISAAC/',
          name: 'ISAAC/ PERSONAL-WEBSITE',
          icons: [
            {
              src: 'favicon.png',
              sizes: '64x64 32x32 24x24 16x16',
              type: 'image/x-icon',
            },
            {
              src: 'logo192.png',
              type: 'image/png',
              sizes: '192x192',
            },
            {
              src: 'logo512.png',
              type: 'image/png',
              sizes: '512x512',
            },
          ],
          start_url: '/',
          display: 'standalone',
          theme_color: '#000000',
          background_color: '#000000',
        },
        registerType: 'autoUpdate',
        disable: true,
      }),
    ],
  };
});
