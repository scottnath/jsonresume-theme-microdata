import html from '../utils/html.js'
import Institution from './institution.js'

/** @typedef {import('../../schema.d.ts').ResumeSchema['education']} Education */

/**
 * @param {Education} education
 * @param {string} [title] - section title text
 * @returns {string | false}
 */
export default function Education(education = [], title = 'Education') {
  return education.length > 0
    ? html`
        <section part="education">
          <h3>${title}</h3>
          <div class="stack">${education.map(role => Institution(role, 'alumniOf'))}</div>
        </section>
      `
    : ''
}
