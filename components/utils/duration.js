import { ShortDate } from './date.js'
import html from './html.js'

/**
 * @param {string} startDate
 * @param {string} [endDate]
 * @returns {string}
 */
export default function Duration(startDate, endDate) {
  return html`${ShortDate(startDate, 'startDate')} – ${endDate ? ShortDate(endDate, 'endDate') : 'Present'}`
}
