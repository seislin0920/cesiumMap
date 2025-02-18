import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    CESIUM_BASE_URL: JSON.stringify('/Cesium'),
  },
  optimizeDeps: {
    include: ['mersenne-twister']
  }
})
