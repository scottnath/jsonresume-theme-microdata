import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Interests from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Interests',
  render: args => {
    const output = Interests(args.interests)
    return psw(output)
  },
}

export const AllContent = {
  args: {
    interests: resume.interests,
  },
  play: async ({ args, canvasElement, step }) => {
    const interestsData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      knowsAbout: expect.any(Array),
    })
    expect(interestsData.knowsAbout).toHaveLength(args.interests.length)
  },
}

export const OneInterest = {
  args: {
    interests: [
      {
        ...resume.interests[0],
        itemtype: 'Brand',
      },
    ],
  },
  play: async ({ args, canvasElement, step }) => {
    const interestsData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      knowsAbout: expect.any(Object),
    })
    expect(interestsData.knowsAbout['@type']).toBe(args.interests[0].itemtype || 'Thing')
  },
}
