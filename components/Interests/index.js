import html from '../utils/html.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['interests']} interests
 * @returns {string | false}
 */
export default function Interests(interests = []) {
  return (
    interests.length > 0 &&
    html`
      <section part="interests">
        <h3>Interests</h3>
        <dl class="grid-list">
          ${interests.map(
            ({ keywords = [], name, itemtype = 'Thing' }) => html`
              <div class="tag-list" itemprop="knowsAbout" itemscope itemtype="https://schema.org/${itemtype}">
                ${name && html`<dt><span itemprop="name">${name}</span></dt>`}
                ${keywords.length > 0 && keywords.map(keyword => html`<dd itemprop="alternateName">${keyword}</dd>`)}
              </div>
            `,
          )}
        </dl>
      </section>
    `
  )
}
