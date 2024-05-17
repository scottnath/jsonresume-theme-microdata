import { icons } from 'feather-icons'

/** @typedef {import('feather-icons').FeatherIconNames} FeatherIconNames */

/**
 * @param {string} name
 * @param {string} [fallback]
 * @returns {string | undefined}
 */
export default function Icon(name, fallback) {
  const icon =
    icons[/** @type {FeatherIconNames} */ (name.toLowerCase())] ||
    (fallback && icons[/** @type {FeatherIconNames} */ (fallback.toLowerCase())])
  return icon?.toSvg({ width: 16, height: 16 })
}
