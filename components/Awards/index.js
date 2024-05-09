import { ShortDate } from '../utils/date.js'
import html from '../utils/html.js'
import markdown from '../utils/markdown.js'

/**
 * @param {import('../../schema.js').ResumeSchema['awards']} awards
 * @returns {string | false}
 */
export default function Awards(awards = []) {
  return (
    awards.length > 0 &&
    html`
      <section part="awards">
        <h3>Awards</h3>
        <dl class="stack">
          ${awards.map(
            ({ awarder, date, summary, title }) => html`
              <div itemprop="award">
                <dt>${title}</dt>
                <dd class="meta">
                  ${awarder && html`<div>Awarded by <strong>${awarder}</strong></div>`} ${date && ShortDate(date)}
                </dd>
                ${summary && html`<dd>${markdown(summary)}</dd>`}
              </div>
            `,
          )}
        </dl>
      </section>
    `
  )
}
