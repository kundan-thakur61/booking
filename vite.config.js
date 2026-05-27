
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    // Code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and core libraries
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separate chunk for pages (lazy loaded)
          'pages': [
            './src/pages/Home.jsx',
            './src/pages/CompanionEscortServices.jsx',
            './src/pages/MumbaiEscortServices.jsx'
          ]
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Generate source maps for debugging
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true
  },
  server: {
    historyApiFallback: true
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
