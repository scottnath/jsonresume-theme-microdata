import Awards from './components/Awards/index.js'
import Basics from './components/Basics/basics.js'
import Certificates from './components/Certificates/index.js'
import Education from './components/Education/index.js'
import Interests from './components/Interests/index.js'
import Languages from './components/Languages/index.js'
import Meta from './components/Meta/index.js'
import Projects from './components/Projects/index.js'
import Publications from './components/Publications/index.js'
import References from './components/References/index.js'
import Skills from './components/Skills/index.js'
import Volunteer from './components/Volunteer/index.js'
import Work from './components/Work/index.js'

import colors from './utils/colors.js'
import html from './utils/html.js'

/**
 * @param {import('./schema.d.ts').ResumeSchema} resume
 * @returns
 */
const ResumeArticle = resume => {
  return html`
    <article id="resume" itemscope itemtype="https://schema.org/Person">
      ${Basics(resume.basics)} ${Work(resume.work)} ${Volunteer(resume.volunteer)} ${Education(resume.education)}
      ${Awards(resume.awards)} ${Certificates(resume.certificates)} ${Publications(resume.publications)}
      ${Skills(resume.skills)} ${Languages(resume.languages)} ${Interests(resume.interests)}
      ${References(resume.references)} ${Projects(resume.projects)} ${Meta(resume.meta)}
    </article>
  `
}

/**
 * @param {import('./schema.d.ts').ResumeSchema} resume
 * @param {string} css
 * @returns
 */
export default function Resume(resume, css) {
  return html`<!doctype html>
    <html lang="en" style="${colors(resume.meta)}">
      <head>
        <meta charset="utf-8" />
        ${Meta(resume.basics)}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" />
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${ResumeArticle(resume)}
      </body>
    </html>`
}
