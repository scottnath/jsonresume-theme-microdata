import html from '../../utils/html.js'
import markdown from '../../utils/markdown.js'
import Duration from '../duration.js'
import Link from '../link.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['education']>[number]} Institution */

/**
 * @param {Institution} item
 * @param {string} [itemprop] - schema.org attribute
 * @returns {string | false}
 */
export default function Institution(item, itemprop) {
  const {
    area,
    courses = [],
    institution,
    startDate,
    endDate,
    studyType,
    url,
    itemtype = 'EducationalOrganization',
  } = item
  return html`<article ${itemprop && `itemprop="${itemprop}"`} itemscope itemtype="https://schema.org/${itemtype}">
    <h4>${Link(url, institution)}</h4>
    <section itemprop="owns" itemscope itemtype="https://schema.org/EducationalOccupationalProgram">
      ${area && html`<h5 itemprop="occupationalCategory">${area}</h5>`}
      ${studyType && html`<div itemprop="educationalProgramMode">${markdown(studyType)}</div>`}
      ${startDate && html`<p>${Duration(startDate, endDate)}</p>`}
      ${courses.length > 0 &&
      html`
        <ul>
          ${courses.map(
            course =>
              html`<li itemprop="hasCourse" itemscope itemtype="https://schema.org/Course">
                <p itemprop="teaches">${course}</p>
              </li>`,
          )}
        </ul>
      `}
    </section>
  </article>`
}
