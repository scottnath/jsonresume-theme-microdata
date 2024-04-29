import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Work from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Work',
  render: args => {
    const output = Work(args.work)
    return psw(output)
  },
}

export const AllContent = {
  args: {
    work: resume.work,
  },
  play: async ({ args, canvasElement, step }) => {
    const workData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      alumniOf: expect.any(Array),
    })
    expect(workData.alumniOf).toHaveLength(args.work.length)
  },
}

export const OneWork = {
  args: {
    work: [resume.work[0]],
  },
  play: async ({ args, canvasElement, step }) => {
    const workData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      alumniOf: expect.any(Object),
    })
    expect(workData.alumniOf['@type']).toBe('Organization')
  },
}
