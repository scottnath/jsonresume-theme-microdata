import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Meta from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Meta',
  render: args => {
    const output = Meta(args.meta)
    return output
  },
}

export const AllContent = {
  args: {
    meta: resume.meta,
  },
  play: async ({ args, canvasElement, step }) => {
    const metaData = microdata('https://schema.org/TextDigitalDocument', canvasElement)

    expect.objectContaining({
      '@type': 'TextDigitalDocument',
    })
    expect(metaData.sameAs).toBe(args.meta.canonical)
    expect(metaData.version).toBe(args.meta.version)
    expect(metaData.dateModified).toBe(args.meta.lastModified)
  },
}
