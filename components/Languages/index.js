import html from '../../utils/html.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['languages']} languages
 * @returns {string | false}
 */
export default function Languages(languages = []) {
  return (
    languages.length > 0 &&
    html`
      <section part="languages">
        <h3>Languages</h3>
        <dl class="grid-list">
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
