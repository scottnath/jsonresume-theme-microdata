import Duration from '../utils/duration.js'
import html from '../utils/html.js'
import Link from '../utils/link.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['projects']>[number]} Project */

/**
 * @param {string[]} roles
 * @returns {string}
 */
const formatRoles = roles => (Intl.ListFormat ? new Intl.ListFormat('en').format(roles) : roles.join(', '))

/**
 * @param {Project} item
 * @param {string} [itemprop] - schema.org attribute
 * @returns {string | false}
 */
export default function Project(item, itemprop) {
  const {
    itemtype = 'Project',
    description,
    entity,
    entityItemtype = 'Organization',
    highlights = [],
    keywords = [],
    name,
    startDate,
    endDate,
    roles = [],
    type,
    url,
  } = item

  return html`<article ${itemprop && `itemprop="${itemprop}"`} itemscope itemtype="https://schema.org/${itemtype}">
    <header>
      <h4>${Link(url, name)}</h4>
      ${entity &&
      html`<p itemprop="parentOrganization" itemscope itemtype="https://schema.org/${entityItemtype}">
        <span itemprop="name">${entity}</span>
      </p>`}
      ${type && html`<p itemprop="additionalType">${type}</p>`}
      ${description && html`<div class="meta" itemprop="description">${description}</div>`}
      ${keywords.length > 0 &&
      html`<div class="meta">
        <ul itemprop="keywords" class="tag-list">
          ${keywords.map(keyword => html`<li>${keyword}</li>`)}
        </ul>
      </div> `}
    </header>
    ${(roles.length || startDate) &&
    html`
      <section itemprop="alumni" itemscope itemtype="https://schema.org/Role">
        ${roles.length > 0 && html`<h5 itemprop="roleName">${formatRoles(roles)}</h5>`}
        ${startDate && html`<p>${Duration(startDate, endDate)}</p>`}
        ${highlights.length > 0 &&
        html`
          <ul>
            ${highlights.map(highlight => html`<li itemprop="description">${highlight}</li>`)}
          </ul>
        `}
      </section>
    `}
  </article>`
}
