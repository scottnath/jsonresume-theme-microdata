import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import WorkRole from './work-role.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Work/Role',
  render: args => {
    const output = WorkRole(args.item)
    return output
  },
}

export const AllContent = {
  args: {
    item: resume.work[0],
  },
  play: async ({ args, canvasElement, step }) => {
    const workData = microdata('https://schema.org/Organization', canvasElement)

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
    })
    expect(workData.name).toBe(args.item.name)
    expect(workData.url).toBe(args.item.url)
  },
}

export const NoUrl = {
  args: {
    item: {
      ...resume.work[0],
      url: undefined,
    },
  },
  play: AllContent.play,
}

export const NoName = {
  args: {
    item: {
      ...resume.work[0],
      name: undefined,
      highlights: undefined,
    },
  },
  play: AllContent.play,
}
