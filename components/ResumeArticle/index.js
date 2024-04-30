import html from '../../utils/html.js'
import Awards from '../Awards/index.js'
import Basics from '../Basics/basics.js'
import Certificates from '../Certificates/index.js'
import Education from '../Education/index.js'
import Interests from '../Interests/index.js'
import Languages from '../Languages/index.js'
import Meta from '../Meta/index.js'
import Projects from '../Projects/index.js'
import Publications from '../Publications/index.js'
import References from '../References/index.js'
import Skills from '../Skills/index.js'
import Volunteer from '../Volunteer/index.js'
import Work from '../Work/index.js'

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
