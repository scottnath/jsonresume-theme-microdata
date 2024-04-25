import html from '../utils/html.js'

/**
 * @param {string} url
 * @returns {string}
 */
const formatURL = url => url.replace(/^(https?:|)\/\//, '').replace(/\/$/, '')

/**
 * @param {string} [url]
 * @param {string} [name]
 * @param {string} [urlprop]
 * @param {string} [nameprop]
 * @returns {string | undefined}
 */
export default function Link(url, name, urlprop = 'url', nameprop = 'name') {
  return name
    ? url
      ? html`<a href="${url}" ${urlprop && `itemprop="${urlprop}"`}><span itemprop="${nameprop}">${name}</span></a>`
      : name
    : url && html`<a href="${url}" ${urlprop && `itemprop="${urlprop}"`}>${formatURL(url)}</a>`
}
