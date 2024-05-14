import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import pkg from './package.json'

export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    return {
      build: {
        outDir: './public',
        target: 'esnext',
      },
      publicDir: false,
    }
  }

  return {
    build: {
      copyPublicDir: false,
      lib: {
        entry: './index.js',
        fileName: 'index',
        formats: ['es', 'cjs', 'umd'],
        name: 'jsonresumeThemeMicrodata',
      },
      rollupOptions: {
        external: [...Object.keys(pkg.dependencies), /^node:.*/],
      },
      target: 'esnext',
    },
    plugins: [
      dts(),
      viteStaticCopy({
        targets: [
          { src: './schema.d.ts', dest: '.' },
          { src: './README.md', dest: '.' },
          { src: './schema.json', dest: '.' },
          { src: './style.css', dest: '.' },
          { src: './sample.resume.json', dest: '.' },
        ],
      }),
    ],
    test: {
      clearMocks: true,
    },
  }
})
