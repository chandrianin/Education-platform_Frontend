import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
    plugins: [react()],
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