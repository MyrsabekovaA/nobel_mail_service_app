import { defineConfig } from "vite";
import {resolve} from "path"
import react from "@vitejs/plugin-react"
export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? './' : '',
    build: {
        // ... other build options
        rollupOptions: {
          // ... other rollup options
          output: {
            // ... other output options
            format: 'es', // Use es module format
          },
        },
      },
    publicDir: 'public',
    resolve: {
        alias: {
            '/@': resolve(__dirname, './src'),
            '/@views': resolve(__dirname, './src/views')
        }
    },
    plugins: [
        react()
    ],
})