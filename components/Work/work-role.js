import Duration from '../utils/duration.js'
import html from '../utils/html.js'
import Link from '../utils/link.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['work']>[number]} Work */

/**
 * @param {Work} item
 * @param {string} [itemprop] - schema.org attribute
 * @returns {string | false}
 */
export default function WorkRole(item, itemprop) {
  const {
    summary,
    name,
    url,
    highlights = [],
    location,
    position,
    startDate,
    endDate,
    description,
    itemtype = 'Organization',
  } = item
  return html`<article ${itemprop && `itemprop="${itemprop}"`} itemscope itemtype="https://schema.org/${itemtype}">
    <header>
      <h4>${Link(url, name)}</h4>
      <meta itemprop="location" content="${location}" />
      ${description && html`<div class="meta" itemprop="description">${description}</div>`}
    </header>
    <section class="timeline" itemprop="employee" itemscope itemtype="https://schema.org/EmployeeRole">
      <h5 itemprop="roleName">${position}</h5>
      <div class="meta">
        ${startDate && html`<p>${Duration(startDate, endDate)}</p>`} ${location && html`<p>${location}</p>`}
      </div>
      ${summary && html`<div itemprop="description">${summary}</div>`}
      ${highlights.length > 0 &&
      html`
        <ul>
          ${highlights.map(highlight => html`<li itemprop="disambiguatingDescription">${highlight}</li>`)}
        </ul>
      `}
    </section>
  </article>`
}
