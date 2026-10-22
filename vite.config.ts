import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    // The PDF renderer is a lazy chunk, loaded only when a report is generated.
    chunkSizeWarningLimit: 1400
  }
})
