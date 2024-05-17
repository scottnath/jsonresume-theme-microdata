import html from '../utils/html.js'
import { internals } from '../utils/sections.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema} resume
 * @returns
 */
const ResumeArticle = resume => {
  return html`
    <article id="resume" itemprop="mainEntity" itemscope itemtype="https://schema.org/Person">
      ${internals(resume)}
    </article>
  `
}

export default ResumeArticle
