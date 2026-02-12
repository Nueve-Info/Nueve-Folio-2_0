import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // ── Code splitting for better caching and parallel loading ──
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor: React core (rarely changes → long cache)
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Vendor: animation libraries (heavy, shared across pages)
          'vendor-motion': ['framer-motion'],
          // Vendor: UI primitives
          'vendor-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
        },
      },
    },

    // Target modern browsers for smaller output
    target: 'es2020',

    // Increase chunk size warning (after splitting, chunks are smaller)
    chunkSizeWarningLimit: 600,

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Minification
    minify: 'esbuild',
  },
})
