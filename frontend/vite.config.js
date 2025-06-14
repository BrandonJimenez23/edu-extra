// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Importante para Docker
    port: 5173,
    watch: {
      usePolling: true, // Necesario para Docker
    },
  },
})