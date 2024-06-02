import html from '../utils/html.js'
import VolunteerRole from './volunteer-role.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['volunteer']>} Volunteer */

/**
 * @param {Volunteer} volunteer
 * @param {string} [title] - section title text
 * @returns {string | false}
 */
export default function Volunteer(volunteer = [], title = 'Volunteer') {
  return (
    volunteer.length > 0 &&
    html`
      <section part="volunteer">
        <h3 part="section-title">${title}</h3>
        <div class="stack">${volunteer.map(role => VolunteerRole(role, 'alumniOf'))}</div>
      </section>
    `
  )
}
