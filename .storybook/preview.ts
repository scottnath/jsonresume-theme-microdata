import type { Preview } from '@storybook/web-components'

const personSchemaWrapper = content => {
  return `<article itemscope itemtype="https://schema.org/Person">${content}</article>`
}
global.psw = personSchemaWrapper

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
