import { HtmlValidate } from 'html-validate'
import { expect, it } from 'vitest'

import sampleResume from 'resume-schema/sample.resume.json'
import { render } from '../index.js'

const resume = {
  ...sampleResume,
  meta: {
    ...sampleResume.meta,
    themeOptions: {
      colors: {
        background: ['lightgray', 'darkgray'],
      },
    },
  },
  basics: {
    ...sampleResume.basics,
    image: 'image.jpg',
  },
}

it('renders a resume', () => {
  expect(render(resume)).toMatchSnapshot()
})

it('renders valid HTML', async () => {
  const htmlvalidate = new HtmlValidate({
    extends: ['html-validate:recommended', 'html-validate:prettier'],
    rules: {
      'doctype-style': 'off',
      'no-inline-style': 'off',
      'no-trailing-whitespace': 'off',
      'tel-non-breaking': 'off',
    },
  })

  const {
    results: [{ messages } = {}],
  } = await htmlvalidate.validateString(render(resume))
  console.log(messages)
  expect(messages).toBeUndefined()
})
