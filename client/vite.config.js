import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  base: '/JavaScript2_OliverBorys_VG/',
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    port: 3000,
  },
})

