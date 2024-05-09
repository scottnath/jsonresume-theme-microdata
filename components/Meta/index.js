import { DateTime } from '../utils/date.js'
import html from '../utils/html.js'
import Link from '../utils/link.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['meta']} meta
 * @returns {string | false}
 */
export default function Meta(meta = {}) {
  const { canonical, version, lastModified } = meta
  return (
    Object.values(meta).length > 0 &&
    html`
      <footer part="meta" itemprop="owns" itemscope itemtype="https://schema.org/TextDigitalDocument">
        ${canonical && html` <p>${Link(canonical, 'canonical resume.json file', 'sameAs', '')}</p> `}
        ${version && html` <p>version <span itemprop="version">${version}</span></p> `}
        ${lastModified && html` <p>last modified ${DateTime(lastModified, 'dateModified')}</p> `}
      </footer>
    `
  )
}
