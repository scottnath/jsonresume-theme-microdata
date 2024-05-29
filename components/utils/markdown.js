import { marked } from 'marked'
import striptags from 'striptags'

/**
 * @param {string} doc
 * @param {boolean} [stripTags]
 * @returns
 */
export default function markdown(doc, stripTags = false) {
  const result = marked.parse(doc)
  const html = /** @type {string} */ (marked.parse(doc))
  return stripTags ? striptags(html) : html
}
