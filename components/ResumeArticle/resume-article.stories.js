import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import ResumeArticle from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'ResumeArticle',
  render: args => {
    const output = ResumeArticle(args.resume)
    return output
  },
}

export const AllContent = {
  args: {
    resume,
  },
  play: async ({ args, canvasElement, step }) => {
    const personData = microdata('https://schema.org/Person', canvasElement)
    const expectedObject = {}
    Object.entries(args.resume).forEach((key, value) => {
      if (typeof value === 'string') {
        expectedObject[key] = expect.any(String)
        return
      }
      if (key === 'address') {
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
      expect(personData.name).toBe(args.resume.basics.name)
    expect(personData.email).toBe(args.resume.basics.email)
    expect(personData.telephone).toBe(args.resume.basics.phone)
    expect(personData.url).toBe(args.resume.basics.url)
  },
}
