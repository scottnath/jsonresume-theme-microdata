import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Profiles from './profiles.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Basics/Profiles',
  render: args => {
    const output = Profiles(args.profiles)
    return psw(output)
  },
}

export const AllContent = {
  args: {
    profiles: resume.basics.profiles,
  },
  play: async ({ args, canvasElement, step }) => {
    const profilesData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      ContactPoint: expect.any(Array),
    })
    expect(profilesData.ContactPoint).toHaveLength(args.profiles.length)
  },
}

export const NoUsername = {
  args: {
    profiles: [
      { ...resume.basics.profiles[0], username: '' },
      { ...resume.basics.profiles[2], username: '' },
    ],
  },
  play: async ({ args, canvasElement, step }) => {
    const profilesData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      ContactPoint: expect.any(Array),
    })
    expect(profilesData.ContactPoint).toHaveLength(args.profiles.length)
  },
}
