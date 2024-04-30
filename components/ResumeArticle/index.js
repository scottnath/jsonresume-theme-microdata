import html from '../../utils/html.js'
import { components } from '../index.js'
const {
  Awards,
  Basics,
  Certificates,
  Education,
  Interests,
  Languages,
  Meta,
  Projects,
  Publications,
  References,
  Skills,
  Volunteer,
  Work,
} = components

/**
 * Generate resume internal content
 * @todo order-of-items _from_ resume.json
 * @param {import('../../schema.d.ts').ResumeSchema} resume
 */
const internals = resume => html`
  ${Basics(resume.basics)} ${Work(resume.work)} ${Volunteer(resume.volunteer)} ${Education(resume.education)}
  ${Awards(resume.awards)} ${Certificates(resume.certificates)} ${Publications(resume.publications)}
  ${Skills(resume.skills)} ${Languages(resume.languages)} ${Interests(resume.interests)}
  ${References(resume.references)} ${Projects(resume.projects)} ${Meta(resume.meta)}
`

/**
 * @param {import('../../schema.d.ts').ResumeSchema} resume
 * @returns
 */
const ResumeArticle = resume => {
  return html` <article id="resume" itemscope itemtype="https://schema.org/Person">${internals(resume)}</article> `
}

export default ResumeArticle
