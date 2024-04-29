import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import striptags from 'striptags'

/**
 * @param {string} doc
 * @param {boolean} [stripTags]
 * @returns
 */
export default function markdown(doc, stripTags = false) {
  const result = micromark(doc, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  })
  const html = /** @type {string} */ (micromark(doc))
  return stripTags ? striptags(html) : html
}
