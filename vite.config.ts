/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  
  // const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'vitest.setup.ts',
    },
    // define: {
    //   __SUBMIT_URL__: process.env.REACT_APP_SUBMIT_URL
    // }
  }
})
