import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Skills from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Skills',
  render: args => {
    const output = Skills(args.skills)
    return psw(output)
  },
}

export const AllContent = {
  args: {
    skills: resume.skills,
  },
  play: async ({ args, canvasElement, step }) => {
    const skillsData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      knowsAbout: expect.any(Array),
    })
    expect(skillsData.knowsAbout).toHaveLength(args.skills.length)
  },
}

export const OneSkill = {
  args: {
    skills: [resume.skills[0]],
  },
  play: async ({ args, canvasElement, step }) => {
    const skillsData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      knowsAbout: expect.any(Object),
    })
    expect(skillsData.knowsAbout['@type']).toBe(resume.skills[0].itemtype)
  },
}
