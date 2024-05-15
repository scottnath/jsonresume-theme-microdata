import { ShortDate } from '../utils/date.js'
import html from '../utils/html.js'
import Link from '../utils/link.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['publications']>} Publications */

/**
 * @param {Publications} publications
 * @param {string} [title] - section title text
 * @returns {string | false}
 */
export default function Publications(publications = [], title = 'Publications') {
  return (
    publications.length > 0 &&
    html`
      <section part="publications">
        <h3>${title}</h3>
        <dl class="stack">
          ${publications.map(
            ({
              name,
              itemtype = 'CreativeWork',
              publisher,
              publisherItemtype = 'Organization',
              releaseDate,
              summary,
              url,
            }) => html`
              <div itemprop="owns" itemscope itemtype="https://schema.org/${itemtype}">
                <dt>${Link(url, name)}</dt>
                ${publisher &&
                html`<dd class="meta" itemprop="publisher" itemscope itemtype="https://schema.org/${publisherItemtype}">
                  Published by <strong itemprop="name">${publisher}</strong>
                </dd>`}
                ${releaseDate && html`<dd class="meta" itemprop="dateCreated">${ShortDate(releaseDate)}</dd>`}
                ${summary && html`<dd itemprop="abstract">${summary}</dd>`}
              </div>
            `,
          )}
        </dl>
      </section>
    `
  )
}
