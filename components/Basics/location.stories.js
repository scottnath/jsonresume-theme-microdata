import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Location from './location.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Basics/Location',
  render: args => {
    const output = Location(args.location)
    return output
  },
}

export const AllContent = {
  args: {
    location: resume.basics.location,
  },

  play: async ({ args, canvasElement, step }) => {
    const locationData = microdata('https://schema.org/PostalAddress', canvasElement)
    const expectedObject = {}
    Object.entries(args.location).forEach((key, value) => {
      if (typeof value === 'string') {
        expectedObject[key] = expect.any(String)
        return
      }
    })
    expect.objectContaining({
      '@type': 'PostalAddress',
      ...expectedObject,
    })
    expect(locationData.addressRegion).toBe(args.location.region)
    expect(locationData.addressLocality).toBe(args.location.city)
    expect(locationData.addressCountry).toBe(args.location.countryCode)
  },
}
