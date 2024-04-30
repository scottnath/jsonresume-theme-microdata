import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Project from './project.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Projects/Item',
  render: args => {
    const output = Project(args.item)
    return output
  },
}

export const AllContent = {
  args: {
    item: resume.projects[0],
  },
  play: async ({ args, canvasElement, step }) => {
    const projectData = microdata('https://schema.org/Project', canvasElement)
    const expectedObject = {}
    Object.entries(args.item).forEach((key, value) => {
      if (typeof value === 'string') {
        expectedObject[key] = expect.any(String)
        return
      }
      if (key === 'alumni') {
        expectedObject[key] = expect.objectContaining({
          '@type': 'Role',
        })
        return
      }
    })
    expect.objectContaining({
      '@type': 'Project',
      ...expectedObject,
    }),
      expect(projectData.name).toBe(args.item.name)
    expect(projectData.url).toBe(args.item.url)
  },
}
