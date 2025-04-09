import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/frontBuild/", // Literal no entiendo por que no funciona. Localmente funciona cuando pongo el path ./, pero se supone que tiene que ser el repositorio e github??
})

