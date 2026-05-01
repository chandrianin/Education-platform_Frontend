import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
    plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Цифровой помощник',
        short_name: 'DA',
        description: 'Приложение, помогающее учителям.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'public/favicon_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'public/favicon_512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('@mui')) return 'mui';
                        if (id.includes('framer-motion')) return 'framer-motion';
                        return 'vendor';
                    }
                },
            },
        },
    },
});