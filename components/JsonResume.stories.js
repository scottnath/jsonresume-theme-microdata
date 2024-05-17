import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

import colors from '@/components/utils/colors.js'
import resumeString from '@/sample.resume.json?raw'
import css from '@/style.css?inline'
import ResumeArticle from './ResumeArticle/index.js'

const resumeFixture = JSON.parse(resumeString)
delete resumeFixture.meta.themeOptions
const resumeFixtureOpts = JSON.parse(resumeString)

export default {
  title: 'JSON Resume',
  decorators: [
    (story, { args }) => `
  <div style="${colors(args.resume.meta)}">
    <style>${css}</style>
    <div id="jsonresume" itemscope itemtype="https://schema.org/ProfilePage">
      ${story()}
    </div>
  </div>
  <script>
    document.querySelector('html').style = '${colors(args.resume.meta)}';
  </script>`,
  ],
  render: args => {
    const output = ResumeArticle(args.resume)
    return output
  },
}

export const AllContent = {
  args: {
    resume: resumeFixture,
  },
  play: async ({ args, canvasElement, step }) => {
    const pageData = microdata('https://schema.org/ProfilePage', canvasElement)
    const expectedObject = {
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
      },
    }
    Object.entries(args.resume).forEach((key, value) => {
      if (typeof value === 'string') {
        expectedObject.mainEntity[key] = expect.any(String)
        return
      }
      if (key === 'address') {
        expectedObject.mainEntity[key] = expect.objectContaining({
          '@type': 'PostalAddress',
        })
        return
      }
    })
    expect.objectContaining(expectedObject)
    expect(pageData.mainEntity.name).toBe(args.resume.basics.name)
    expect(pageData.mainEntity.email).toBe(args.resume.basics.email)
    expect(pageData.mainEntity.telephone).toBe(args.resume.basics.phone)
    expect(pageData.mainEntity.url).toBe(args.resume.basics.url)
  },
}

export const ThemeOptions = {
  args: {
    resume: resumeFixtureOpts,
  },
}
