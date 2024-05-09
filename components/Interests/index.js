import html from '../utils/html.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['interests']>} Interests */

/**
 * @param {Interests} interests
 * @param {string} [title] - section title text
 * @returns {string | false}
 */
export default function Interests(interests = [], title = 'Interests') {
  return (
    interests.length > 0 &&
    html`
      <section part="interests">
        <h3>${title}</h3>
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
