import html from '../utils/html.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['skills']>} Skills */

/**
 * @param {Skills} skills
 * @param {string} [title] - section title text
 * @returns {string | false}
 */
export default function Skills(skills = [], title = 'Skills') {
  return (
    skills.length > 0 &&
    html`
      <section part="skills">
        <h3>${title}</h3>
        <dl class="title-list">
          ${skills.map(({ keywords = [], name, itemtype = 'Thing' }) => {
            const itype = `itemtype="https://schema.org/${itemtype}"`
            return html` <div class="tag-list" itemprop="knowsAbout" itemscope ${itype}>
              ${name && html`<dt><span itemprop="description">${name.trim()}</span></dt>`}
              ${keywords.length > 0 && keywords.map(keyword => html`<dd itemprop="name">${keyword.trim()}</dd>`)}
            </div>`
          })}
        </dl>
      </section>
    `
  )
}
