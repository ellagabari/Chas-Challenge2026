import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Expose dev server on LAN so your phone can open it (mobil test)
    host: true,
  },
})
