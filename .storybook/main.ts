import type { StorybookConfig } from '@storybook/web-components-vite'
import path from 'path'
import { mergeConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

const coverageConfig = {
  include: ['../src/**/*.jsx'],
  exclude: ['src/main.jsx'],
  extension: ['.jsx'],
  excludeNodeModules: true,
  all: true,
};

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
    '@storybook/addon-coverage',
    'storybook-addon-render-modes'
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config, options) {
    return mergeConfig(config, {
      // customize the Vite config here
      cacheDir: path.join(__dirname, '../node_modules/.vite-storybook'),
      plugins: [
        istanbul({
          ...coverageConfig
        }),
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../'),
        },
      },
      define: {
        'process.env': process.env,
      }
    });
  },
}
export default config
