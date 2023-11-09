import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Import the replace plugin
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
})
