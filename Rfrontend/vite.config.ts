import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    hmr:{
      overlay:false,//disable
      protocol:'ws',
      timeout:1000,
    },
    watch:{
      usePolling:true,//enable
      interval:1,//in ms
      followSymlinks:false,//disable symlink

    },
    host:true,//enable for better network performance
    fs:{
      strict:false,//less strict file serving
    },
    warmup:{
      clientFiles:['./src/**/*.vue'],//warmup frequently accessed

    },
  },
  optimizeDeps:{
    force:true,
    entries:['./src/**/*.vue'],//pre bundle vue components
    include:['vue','vue-router','pinia'],//pre bundle dependencies
  },
  build:{
    target:'esnext',//modern browsers
    minify:false,//disable minification in dev
    cssMinify:false,
    rollupOptions:{
      treeshake:false,//disable treeshaking in dev
    },
  },
  esbuild:{
    target:'esnext',
    legalComments:'none',
    treeShaking:false,//disable tree-shaking at esbuild level
  }
})
