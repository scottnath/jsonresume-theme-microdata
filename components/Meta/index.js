import html from '../../utils/html.js'
import { DateTime } from '../date.js'
import Link from '../link.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['meta']} meta
 * @returns {string | false}
 */
export default function Meta(meta = {}) {
  const { canonical, version, lastModified } = meta
  return (
    (canonical || version || lastModified) &&
    html`
      <footer id="meta" itemprop="owns" itemscope itemtype="https://schema.org/TextDigitalDocument">
        ${canonical && html` <p>${Link(canonical, 'canonical resume.json file', 'sameAs', null)}</p> `}
        ${version && html` <p>version <span itemprop="version">${version}</span></p> `}
        ${lastModified && html` <p>last modified ${DateTime(lastModified, 'dateModified')}</p> `}
      </footer>
    `
  )
}
