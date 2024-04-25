import html from '../../utils/html.js'
import VolunteerRole from './volunteer-role.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['volunteer']} volunteer
 * @returns {string | false}
 */
export default function Volunteer(volunteer = []) {
  return (
    volunteer.length > 0 &&
    html`
      <section id="volunteer">
        <h3>Volunteer</h3>
        <div class="stack">${volunteer.map(role => VolunteerRole(role, 'alumniOf'))}</div>
      </section>
    `
  )
}
