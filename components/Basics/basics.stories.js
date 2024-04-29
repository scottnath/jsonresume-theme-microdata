import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Basics from './basics.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Basics',
  render: args => {
    const output = Basics(args.basics)
    return psw(output)
  },
}

export const AllContent = {
  args: {
    basics: resume.basics,
  },
  play: async ({ args, canvasElement, step }) => {
    const basicsData = microdata('https://schema.org/Person', canvasElement)
    const expectedObject = {}
    Object.entries(args.basics).forEach((key, value) => {
      if (typeof value === 'string') {
        expectedObject[key] = expect.any(String)
        return
      }
      if (key === 'location') {
        expectedObject[key] = expect.objectContaining({
          '@type': 'PostalAddress',
        })
        return
      }
    })
    expect.objectContaining({
      '@type': 'Person',
      ...expectedObject,
    }),
      expect(basicsData.name).toBe(args.basics.name)
  },
}
