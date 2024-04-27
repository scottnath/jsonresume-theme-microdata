import html from '../../utils/html.js'
import markdown from '../../utils/markdown.js'
import { ShortDate } from '../date.js'
import Link from '../link.js'

/**
 * @param {import('../../schema.js').ResumeSchema['publications']} publications
 * @returns {string | false}
 */
export default function Publications(publications = []) {
  return (
    publications.length > 0 &&
    html`
      <section id="publications">
        <h3>Publications</h3>
        <dl class="stack">
          ${publications.map(
            ({ name, publisher, releaseDate, summary, url }) => html`
              <div itemprop="owns" itemscope itemtype="https://schema.org/CreativeWork">
                <dt>${Link(url, name)}</dt>
                ${publisher &&
                html`<dd class="meta" itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
                  Published by <strong itemprop="name">${publisher}</strong>
                </dd>`}
                ${releaseDate && html`<dd class="meta" itemprop="dateCreated">${ShortDate(releaseDate)}</dd>`}
                ${summary && html`<dd itemprop="abstract">${markdown(summary)}</dd>`}
              </div>
            `,
          )}
        </dl>
      </section>
    `
  )
}