import resumeString from '@/sample.resume.json?raw'
import { expectedDataInstitution } from './education.shared-spec.js'
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
    expectedDataInstitution(canvasElement, args.institution)
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
