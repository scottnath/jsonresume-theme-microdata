import { ShortDate } from '../utils/date.js'
import html from '../utils/html.js'
import Link from '../utils/link.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['certificates']>} Certificates */

/**
 * @param {Certificates} certificates
 * @param {string} [title] - section title text
 * @returns {string | false}
 */
export default function Certificates(certificates = [], title = 'Certificates') {
  return (
    certificates.length > 0 &&
    html`
      <section part="certificates">
        <h3>${title}</h3>
        <dl class="stack">
          ${certificates.map(
            ({ date, issuer, name, url, itemtype = 'Organization' }) => html`
              <div itemprop="hasCertification" itemscope itemtype="https://schema.org/Certification">
                <dt>${Link(url, name)}</dt>
                ${issuer &&
                html`<dd class="meta" itemprop="issuedBy" itemscope itemtype="https://schema.org/${itemtype}">
                  Issued by <strong itemprop="name">${issuer}</strong>
                </dd>`}
                ${date && html`<dd class="meta">${ShortDate(date, 'datePublished')}</dd>`}
              </div>
            `,
          )}
        </dl>
      </section>
    `
  )
}
