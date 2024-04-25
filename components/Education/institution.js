import html from '../../utils/html.js'
import markdown from '../../utils/markdown.js'
import Duration from '../duration.js'
import Link from '../link.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['education']} item
 * @param {string} [itemprop] - schema.org attribute
 * @returns {string | false}
 */
export default function Institution(item, itemprop) {
  const { area, courses = [], institution, startDate, endDate, studyType, url } = item
  return html` <article
    ${itemprop && `itemprop="${itemprop}"`}
    itemscope
    itemtype="https://schema.org/EducationalOrganization"
  >
    <header>
      <h4>${Link(url, institution)}</h4>
      <div class="meta">${area && html`<strong itemprop="department">${area}</strong>`}</div>
    </header>
    <section itemprop="alumni" itemscope itemtype="https://schema.org/OrganizationRole">
      <div class="meta">${startDate && html`<p>${Duration(startDate, endDate)}</p>`}</div>
      ${studyType && html`<div itemprop="description">${markdown(studyType)}</div>`}
      ${courses.length > 0 &&
      html`
        <ul>
          ${courses.map(course => html`<li itemscope itemtype="https://schema.org/Course">${markdown(course)}</li>`)}
        </ul>
      `}
    </section>
  </article>`
}
