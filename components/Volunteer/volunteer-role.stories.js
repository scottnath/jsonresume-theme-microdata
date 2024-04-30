import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import VolunteerRole from './volunteer-role.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Volunteer/Role',
  render: args => {
    const output = VolunteerRole(args.item)
    return output
  },
}

export const AllContent = {
  args: {
    item: resume.volunteer[0],
  },
  play: async ({ args, canvasElement, step }) => {
    const volunteerData = microdata('https://schema.org/Organization', canvasElement)

    const expectedObject = {}
    Object.entries(args.item).forEach((key, value) => {
      if (typeof value === 'string') {
        expectedObject[key] = expect.any(String)
        return
      }
    })
    expect.objectContaining({
      '@type': 'Organization',
      ...expectedObject,
    }),
      expect(volunteerData.name).toBe(args.item.organization)
    expect(volunteerData.url).toBe(args.item.url)
  },
}

export const NoUrl = {
  args: {
    item: {
      ...resume.volunteer[0],
      url: undefined,
    },
  },
  play: AllContent.play,
}

export const NoName = {
  args: {
    item: {
      ...resume.volunteer[0],
      organization: undefined,
      highlights: undefined,
    },
  },
  play: AllContent.play,
}
