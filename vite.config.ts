import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/TaskScheduler/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 700,
  },
})
