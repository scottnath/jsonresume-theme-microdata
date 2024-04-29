import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Education from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Education',
  render: args => {
    const output = Education(args.education, 'alumniOf')
    return psw(output)
  },
}

export const AllContent = {
  args: {
    education: resume.education,
  },
  play: async ({ args, canvasElement, step }) => {
    const edData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      alumniOf: expect.any(Array),
    })
    expect(edData.alumniOf).toHaveLength(args.education.length)
  },
}

export const OneEducation = {
  args: {
    education: [resume.education[0]],
  },
  play: async ({ args, canvasElement, step }) => {
    const edData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      alumniOf: expect.any(Object),
    })
    expect(edData.alumniOf['@type']).toBe('EducationalOrganization')
  },
}
