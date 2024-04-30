import html from '../../utils/html.js'
import markdown from '../../utils/markdown.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['references']} references
 * @returns {string | false}
 */
export default function References(references = []) {
  return (
    references.length > 0 &&
    html`
      <section id="references">
        <h3>References</h3>
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
