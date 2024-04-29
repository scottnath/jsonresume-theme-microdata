import html from '../utils/html.js'

/**
 * @param {string} dateString
 * @returns {string}
 */
const formatDate = dateString =>
  new Date(dateString).toLocaleDateString('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

/**
 * @param {string} date
 * @param {string} [itemprop]
 * @returns {string}
 */
export function ShortDate(date, itemprop = '') {
  return html`<time datetime="${date}" ${itemprop && `itemprop="${itemprop}"`}>${formatDate(date)}</time>`
}

/**
 * @param {string} date
 * @param {string} [itemprop]
 * @returns {string}
 */
export function DateTime(date, itemprop = '') {
  const datetime = new Date(date).toLocaleString()
  return html`<time datetime="${date}" ${itemprop && `itemprop="${itemprop}"`}>${datetime}</time>`
}
