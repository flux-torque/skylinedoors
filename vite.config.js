import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // host: true binds to 0.0.0.0 so phones on the same Wi-Fi can reach it.
  server: { port: 5173, open: false, host: true },
  preview: { port: 4173, host: true },
  build: { outDir: 'dist', assetsInlineLimit: 2048 },
})
