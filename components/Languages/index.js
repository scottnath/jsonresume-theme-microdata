import html from '../utils/html.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['languages']>} Languages */

/**
 * @param {Languages} languages
 * @param {string} [title] - section title text
 * @returns {string | false}
 */
export default function Languages(languages = [], title = 'Languages') {
  return (
    languages.length > 0 &&
    html`
      <section part="languages">
        <h3 part="section-title">${title}</h3>
        <dl class="title-list">
          ${languages.map(
            ({ fluency, language }) => html`
              <div itemprop="knowsLanguage" itemscope itemtype="https://schema.org/Language">
                <dt itemprop="name">${language}</dt>
                ${fluency && html`<dd itemprop="description">${fluency}</dd>`}
              </div>
            `,
          )}
        </dl>
      </section>
    `
  )
}
