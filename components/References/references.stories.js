import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import References from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'References',
  render: args => {
    const output = References(args.references)
    return psw(output)
  },
}

export const AllContent = {
  args: {
    references: resume.references,
  },
  play: async ({ args, canvasElement, step }) => {
    const referencesData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      subjectOf: expect.any(Array),
    })
    expect(referencesData.subjectOf).toHaveLength(args.references.length)
    expect(referencesData.subjectOf[0].text).toBe(args.references[0].reference)
    expect(referencesData.subjectOf[1].text).toBe(args.references[1].reference)
  },
}

export const OneReference = {
  args: {
    references: [resume.references[0]],
  },
  play: async ({ args, canvasElement, step }) => {
    const referencesData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      subjectOf: expect.any(Object),
    })
    expect(referencesData.subjectOf.text).toBe(args.references[0].reference)
  },
}
