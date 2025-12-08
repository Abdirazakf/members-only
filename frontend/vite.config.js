import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'http://localhost:3000/login',
        changeOrigin: true,
        secure: false
      }
    },
    allowedHosts: ['members-only-production-7933.up.railway.app']
  },
  preview: {
    allowedHosts: ['members-only-production-7933.up.railway.app']
  }
})
