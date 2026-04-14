import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/ask-us': {
        target: 'https://zeijin-app-production.up.railway.app',
        changeOrigin: true
      },
      '/api/heroes': {
        target: 'https://mlbb-wiki-api.vercel.app',
        changeOrigin: true,
        secure: false
      },
      '/api/equipment': {
        target: 'https://mlbb-wiki-api.vercel.app',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

