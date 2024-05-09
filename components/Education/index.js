import html from '../utils/html.js'
import Institution from './institution.js'

/** @typedef {import('../../schema.d.ts').ResumeSchema['education']} Education */

/**
 * @param {Education} education
 * @returns {string | false}
 */
export default function Education(education = []) {
  return education.length > 0
    ? html`
        <section part="education">
          <h3>Education</h3>
          <div class="stack">${education.map(role => Institution(role, 'alumniOf'))}</div>
        </section>
      `
    : ''
}
