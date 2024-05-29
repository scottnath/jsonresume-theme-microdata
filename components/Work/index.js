import html from '../utils/html.js'
import WorkRole from './work-role.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['work']>} Work */

/**
 * @param {Work} work
 * @param {string} [title] - section title text
 * @returns {string | false}
 */
export default function Work(work = [], title = 'Work') {
  return (
    work.length > 0 &&
    html`
      <section part="work">
        <h3 part="section-title">${title}</h3>
        <div class="stack">${work.map(role => WorkRole(role, 'alumniOf'))}</div>
      </section>
    `
  )
}
