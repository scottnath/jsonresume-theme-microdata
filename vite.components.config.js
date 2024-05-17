import { defineConfig } from 'vite'

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
      target: 'esnext',
    },
  }
})
