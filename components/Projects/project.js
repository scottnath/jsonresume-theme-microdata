import html from '../../utils/html.js'
import markdown from '../../utils/markdown.js'
import Duration from '../duration.js'
import Link from '../link.js'

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
  const { description, entity, highlights = [], keywords = [], name, startDate, endDate, roles = [], type, url } = item

  return html` <article ${itemprop && `itemprop="${itemprop}"`} itemscope itemtype="https://schema.org/Project">
    <h4>${Link(url, name)}</h4>
    ${entity &&
    html`<span itemprop="parentOrganization" itemscope itemtype="https://schema.org/Organization"
      ><meta itemprop="name" content="${entity}"
    /></span>`}
    ${(roles.length || startDate) &&
    html`
      <section itemprop="alumni" itemscope itemtype="https://schema.org/Role">
        ${roles.length > 0 &&
        html`<p>
          <span itemprop="roleName">${formatRoles(roles)}</span> ${entity && html` at <strong>${entity}</strong>`}
        </p>`}
        ${startDate && html`<p>${Duration(startDate, endDate)}</p>`}
        ${type && html`<p itemprop="additionalType">${type}</p>`}
      </section>
    `}
    ${description && html`<div itemprop="description">${markdown(description)}</div>`}
    ${highlights.length > 0 &&
    html`
      <ul>
        ${highlights.map(highlight => html`<li itemprop="description">${markdown(highlight)}</li>`)}
      </ul>
    `}
    ${keywords.length > 0 &&
    html`
      <ul itemprop="keywords" class="tag-list">
        ${keywords.map(keyword => html`<li>${keyword}</li>`)}
      </ul>
    `}
  </article>`
}
