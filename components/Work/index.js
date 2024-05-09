import html from '../utils/html.js'
import WorkRole from './work-role.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['work']>} Work */

/**
 * @param {import('../../schema.d.ts').ResumeSchema['work']} work
 * @returns {string | false}
 */
export default function Work(work = []) {
  return (
    work.length > 0 &&
    html`
      <section part="work">
        <h3>Work</h3>
        <div class="stack">${work.map(role => WorkRole(role, 'alumniOf'))}</div>
      </section>
    `
  )
}
