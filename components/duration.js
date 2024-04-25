import html from '../utils/html.js'
import { ShortDate } from './date.js'

/**
 * @param {string} startDate
 * @param {string} [endDate]
 * @returns {string}
 */
export default function Duration(startDate, endDate) {
  return html`${ShortDate(startDate, 'startDate')} – ${endDate ? ShortDate(endDate, 'endDate') : 'Present'}`
}
