import html from '../utils/html.js'
import markdown from '../utils/markdown.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['references']>} References */

/**
 * @param {References} references
 * @param {string} [title] - section title text
 * @returns {string | false}
 */
export default function References(references = [], title = 'References') {
  return (
    references.length > 0 &&
    html`
      <section part="references">
        <h3 part="section-title">${title}</h3>
        <div class="stack">
          ${references.map(
            ({ name, reference }) => html`
              <blockquote itemprop="subjectOf" itemscope itemtype="https://schema.org/Statement">
                ${reference && html`<div itemprop="text">${markdown(reference)}</div>`}
                ${name &&
                html`
                  <p itemprop="author" itemscope itemtype="https://schema.org/Person">
                    <cite itemprop="name">${name}</cite>
                  </p>
                `}
              </blockquote>
            `,
          )}
        </div>
      </section>
    `
  )
}
