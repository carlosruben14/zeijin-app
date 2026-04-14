import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:3001')
  },
  server: {
    proxy: {
      '/api/ask-us': {
        target: 'http://localhost:3001',
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

