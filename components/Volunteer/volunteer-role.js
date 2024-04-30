import html from '../../utils/html.js'
import markdown from '../../utils/markdown.js'
import Duration from '../duration.js'
import Link from '../link.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['volunteer']>[number]} Volunteer */
/**
 * @param {Volunteer} item
 * @param {string} [itemprop] - schema.org attribute
 * @returns {string | false}
 */
export default function VolunteerRole(item, itemprop) {
  const { highlights = [], organization, position, startDate, endDate, summary, url } = item
  return html` <article ${itemprop && `itemprop="${itemprop}"`} itemscope itemtype="https://schema.org/Organization">
    <header>
      <h4>${Link(url, organization)}</h4>
    </header>
    <section itemprop="employee" itemscope itemtype="https://schema.org/OrganizationRole">
      <h5 itemprop="roleName">${position}</h5>
      ${startDate && html`<p>${Duration(startDate, endDate)}</p>`}
      ${summary && html`<div itemprop="description">${markdown(summary)}</div>`}
      ${highlights.length > 0 &&
      html`
        <ul>
          ${highlights.map(highlight => html`<li itemprop="description">${markdown(highlight)}</li>`)}
        </ul>
      `}
    </section>
  </article>`
}
