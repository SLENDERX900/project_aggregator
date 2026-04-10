import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to your repo name for GitHub Pages deployment.
// e.g. if your repo is github.com/yourname/portfolio-aggregator,
// set base to '/portfolio-aggregator/'
export default defineConfig({
  plugins: [react()],
  base: '/portfolio-aggregator/',
})
