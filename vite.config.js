import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 Enable styled-components support
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
  ],
})
