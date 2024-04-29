import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Languages from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Languages',
  render: args => {
    const output = Languages(args.languages)
    return psw(output)
  },
}
export const AllContent = {
  args: {
    languages: resume.languages,
  },
  play: async ({ args, canvasElement, step }) => {
    const languagesData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      knowsLanguage: expect.any(Array),
    })
    expect(languagesData.knowsLanguage).toHaveLength(args.languages.length)
  },
}

export const OneInterest = {
  args: {
    languages: [resume.languages[0]],
  },
  play: async ({ args, canvasElement, step }) => {
    const languagesData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      knowsLanguage: expect.any(Object),
    })
    expect(languagesData.knowsLanguage['@type']).toBe('Language')
  },
}
