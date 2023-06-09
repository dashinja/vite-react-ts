/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vitest-dom/extend-expect" />

import { defineConfig } from 'vitest/config'
import { qrcode } from 'vite-plugin-qrcode'
import { ViteTips } from 'vite-plugin-tips'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), qrcode(), ViteTips()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'vitest.setup.ts',
  },
})
