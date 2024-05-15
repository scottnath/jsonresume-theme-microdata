import { ShortDate } from '../utils/date.js'
import html from '../utils/html.js'

/**
 * @param {import('../../schema.js').ResumeSchema['awards']} awards
 * @returns {string | false}
 */
export default function Awards(awards = [], title = 'Awards') {
  return (
    awards.length > 0 &&
    html`
      <section part="awards">
        <h3>${title}</h3>
        <dl class="stack">
          ${awards.map(
            ({ awarder, date, summary, title }) => html`
              <div itemprop="award">
                <dt>${title}</dt>
                <dd class="meta">
                  ${awarder && html`<div>Awarded by <strong>${awarder}</strong></div>`} ${date && ShortDate(date)}
                </dd>
                ${summary && html`<dd>${summary}</dd>`}
              </div>
            `,
          )}
        </dl>
      </section>
    `
  )
}
