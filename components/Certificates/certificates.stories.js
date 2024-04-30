import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import resumeString from '@/sample.resume.json?raw'
import Certificates from './index.js'

const resume = JSON.parse(resumeString)

export default {
  title: 'Certificates',
  render: args => {
    const output = Certificates(args.certificates)
    return psw(output)
  },
}

export const AllContent = {
  args: {
    certificates: resume.certificates,
  },
  play: async ({ args, canvasElement, step }) => {
    const certData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      hasCertification: expect.any(Array),
    })
    expect(certData.hasCertification).toHaveLength(args.certificates.length)
  },
}

export const OneCertification = {
  args: {
    certificates: [resume.certificates[0]],
  },
  play: async ({ args, canvasElement, step }) => {
    const certData = microdata('https://schema.org/Person', canvasElement)
    expect.objectContaining({
      '@type': 'Person',
      hasCertification: expect.any(Object),
    })
    expect(certData.hasCertification['@type']).toBe('Certification')
  },
}
