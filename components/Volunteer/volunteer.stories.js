import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Volunteer from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Volunteer',
  render: args => {
    const output = Volunteer(args.volunteer, 'alumniOf')
    return psw(output)
  },
}

export const AllContent = {
  args: {
    volunteer: resume.volunteer,
  },
  play: async ({ args, canvasElement, step }) => {
    const volunteerData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      alumniOf: expect.any(Array),
    })
    expect(volunteerData.alumniOf).toHaveLength(args.volunteer.length)
  },
}

export const OneVolunteer = {
  args: {
    volunteer: [resume.volunteer[0]],
  },
  play: async ({ args, canvasElement, step }) => {
    const volunteerData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      alumniOf: expect.any(Object),
    })
    expect(volunteerData.alumniOf['@type']).toBe('Organization')
  },
}
