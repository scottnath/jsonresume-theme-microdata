import html from '../../utils/html.js'
import Institution from './institution.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['education']} education
 * @returns {string | false}
 */
export default function Education(education = []) {
  return (
    education.length > 0 &&
    html`
      <section id="education">
        <h3>Education</h3>
        <div class="stack">${education.map(role => Institution(role, 'alumniOf'))}</div>
      </section>
    `
  )
}
