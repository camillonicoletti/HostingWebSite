import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5180, open: true },
  // Two pages: the site, and the order page behind "Ordina ora" (/ordina/).
  build: { rollupOptions: { input: { main: resolve(import.meta.dirname, 'index.html'), ordina: resolve(import.meta.dirname, 'ordina/index.html') } } },
})
