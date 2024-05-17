import resumeString from '@/sample.resume.json?raw'
import { expectedDataEduction } from './education.shared-spec.js'
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
    expectedDataEduction(canvasElement, args.education)
  },
}

export const OneEducation = {
  args: {
    education: [resume.education[0]],
  },
  play: async ({ args, canvasElement, step }) => {
    expectedDataEduction(canvasElement, args.education)
  },
}

export const Empty = {
  play: async ({ args, canvasElement, step }) => {
    expectedDataEduction(canvasElement, args.education)
  },
}
