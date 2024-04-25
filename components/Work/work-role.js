import html from '../../utils/html.js'
import markdown from '../../utils/markdown.js'
import Duration from '../duration.js'
import Link from '../link.js'

/** @typedef {NonNullable<import('../schema.d.ts').ResumeSchema['work']>[number]} Work */

/**
 * @param {import('../schema.d.ts').ResumeSchema['work']} work
 * @param {string} [itemprop] - schema.org attribute
 * @returns {string | false}
 */
export default function WorkRole(item, itemprop) {
  const { summary, name, url, highlights = [], location, position, startDate, endDate, description } = item
  return html` <article ${itemprop && `itemprop="${itemprop}"`} itemscope itemtype="https://schema.org/Organization">
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
      ${summary && html`<div itemprop="description">${markdown(summary)}</div>`}
      ${highlights.length > 0 &&
      html`
        <ul>
          ${highlights.map(highlight => html`<li itemprop="disambiguatingDescription">${markdown(highlight)}</li>`)}
        </ul>
      `}
    </section>
  </article>`
}
