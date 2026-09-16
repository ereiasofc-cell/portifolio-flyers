import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins:[react(),tailwindcss()],
  server:{host:true},
  build:{rollupOptions:{output:{manualChunks:{three:['three'],motion:['motion/react'],animation:['gsap','lenis']}}}}
})
