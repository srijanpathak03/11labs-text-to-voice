// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/generate-audio': {
        target: 'http://localhost:5000',  
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
