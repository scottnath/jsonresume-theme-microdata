import { defineConfig } from 'vite'
import pkg from './package.json'

export default defineConfig(({ mode }) => {
  return {
    build: {
      copyPublicDir: false,
      lib: {
        entry: './components/index.js',
        fileName: 'components',
        formats: ['es'],
        name: 'jsonresumeMicrodataComponents',
      },
      rollupOptions: {
        external: [...Object.keys(pkg.dependencies), /^node:.*/],
      },
      target: 'esnext',
    },
  }
})
