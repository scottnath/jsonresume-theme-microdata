import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Publications from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Publications',
  render: args => {
    const output = Publications(args.publications, 'alumniOf')
    return psw(output)
  },
}
export const AllContent = {
  args: {
    publications: resume.publications,
  },
  play: async ({ args, canvasElement, step }) => {
    const publicationsData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      owns: expect.any(Array),
    })
    expect(publicationsData.owns).toHaveLength(args.publications.length)
  },
}

export const OnePublication = {
  args: {
    publications: [resume.publications[0]],
  },
  play: async ({ args, canvasElement, step }) => {
    const publicationsData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      owns: expect.any(String),
    })
    expect(publicationsData.owns.name).toBe(args.publications[0].name)
    expect(publicationsData.owns['@type']).toBe(args.publications[0].itemtype || 'CreativeWork')
    expect(publicationsData.owns.publisher['@type']).toBe(args.publications[0].publisherItemtype || 'Organization')
  },
}
