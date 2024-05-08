import html from '../../utils/html.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['skills']} skills
 * @returns {string | false}
 */
export default function Skills(skills = []) {
  return (
    skills.length > 0 &&
    html`
      <section part="skills">
        <h3>Skills</h3>
        <dl class="grid-list">
          ${skills.map(({ keywords = [], name, itemtype = 'Thing' }) => {
            const itype = `itemtype="https://schema.org/${itemtype}"`
            return html` <div class="tag-list" itemprop="knowsAbout" itemscope ${itype}>
              ${name && html`<dt><span itemprop="description">${name}</span></dt>`}
              ${keywords.length > 0 && keywords.map(keyword => html`<dd itemprop="name">${keyword}</dd>`)}
            </div>`
          })}
        </dl>
      </section>
    `
  )
}
