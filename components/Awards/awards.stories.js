import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Awards from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Awards',
  render: args => {
    const output = Awards(args.awards)
    return psw(output)
  },
}

export const AllContent = {
  args: {
    awards: resume.awards,
  },
  play: async ({ args, canvasElement, step }) => {
    const awardData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      award: expect.any(Array),
    })
    expect(awardData.award).toHaveLength(args.awards.length)
  },
}

export const OneAward = {
  args: {
    awards: [resume.awards[0]],
  },
  play: async ({ args, canvasElement, step }) => {
    const awardData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      award: expect.any(String),
    })
    expect(awardData.award).toContain(args.awards[0].title)
  },
}
