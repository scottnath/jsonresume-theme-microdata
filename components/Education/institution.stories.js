import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Institution from './institution.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Education/Institution',
  render: args => {
    const output = Institution(args.institution)
    return output
  },
}

export const AllContent = {
  args: {
    institution: resume.education[0],
  },
  play: async ({ args, canvasElement, step }) => {
    const institutionData = microdata('https://schema.org/EducationalOrganization', canvasElement)

    const expectedObject = {}
    Object.entries(args.institution).forEach((key, value) => {
      if (typeof value === 'string') {
        expectedObject[key] = expect.any(String)
        return
      }
      if (key === 'courses') {
        expectedObject[key] = expect.objectContaining({
          '@type': 'Course',
        })
        return
      }
    })
    expect.objectContaining({
      '@type': 'EducationalOrganization',
      ...expectedObject,
    }),
      expect(institutionData.department).toBe(args.institution.area)
    expect(institutionData.name).toBe(args.institution.institution)
    expect(institutionData.url).toBe(args.institution.url)
  },
}

export const NoUrl = {
  args: {
    institution: {
      ...resume.education[0],
      url: undefined,
    },
  },
  play: AllContent.play,
}

export const NoName = {
  args: {
    institution: {
      ...resume.education[0],
      institution: undefined,
    },
  },
  play: AllContent.play,
}
