import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    },
    allowedHosts: ['members-only-production-7933.up.railway.app']
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',
    allowedHosts: ['members-only-production-7933.up.railway.app']
  }
})
