import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const PORT = !isNaN(parseInt(process.env.VITE_PORT))
    ? parseInt(process.env.VITE_PORT)
    : 3000;

  const proxyRewriteRegex = new RegExp(`^${process.env.VITE_API_BASE_PATH}`);

  return defineConfig({
    plugins: [react()],
    server: {
      port: PORT,
      proxy: {
        [process.env.VITE_API_BASE_PATH]: {
          target: process.env.VITE_API_DEV_BASE_ENDPOINT,
          changeOrigin: true,
          rewrite: (path) => path.replace(proxyRewriteRegex, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@src': path.resolve('src'),
        '@assets': path.resolve('src/assets'),
        '@router': path.resolve('src/router'),
        '@layouts': path.resolve('src/layouts'),
        '@pages': path.resolve('src/pages'),
        '@components': path.resolve('src/components'),
        '@ui': path.resolve('src/ui'),
        '@contexts': path.resolve('src/contexts'),
        '@constants': path.resolve('src/constants'),
        '@hooks': path.resolve('src/hooks'),
        '@styles': path.resolve('src/styles'),
        '@store': path.resolve('src/store'),
        '@services': path.resolve('src/services'),
        '@utils': path.resolve('src/utils'),
        '@apptypes': path.resolve('src/types'),
      },
    },
    build: {},
  });
};
