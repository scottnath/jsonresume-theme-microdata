import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Projects from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Projects',
  render: args => {
    const output = Projects(args.projects)
    return psw(output)
  },
}

export const AllContent = {
  args: {
    projects: resume.projects,
  },
  play: async ({ args, canvasElement, step }) => {
    const projectsData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      alumniOf: expect.any(Array),
    })
    expect(projectsData.alumniOf).toHaveLength(args.projects.length)
  },
}

export const OneProject = {
  args: {
    projects: [
      {
        ...resume.projects[0],
        itemtype: 'WorkersUnion',
      },
    ],
  },
  play: async ({ args, canvasElement, step }) => {
    const projectsData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      alumniOf: expect.any(Object),
    })
    expect(projectsData.alumniOf['@type']).toBe(args.projects[0].itemtype || 'Project')
  },
}
