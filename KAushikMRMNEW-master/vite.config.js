import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'chart-vendor': ['chart.js', 'react-chartjs-2'],
                    'reveal-vendor': ['reveal.js']
                }
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
})