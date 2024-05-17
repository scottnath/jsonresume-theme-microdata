import html from './html.js'

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
  const nameElm = name && name !== '' ? html`<span ${nameprop && `itemprop="${nameprop}"`}>${name}</span>` : ''
  return nameElm
    ? url
      ? html`<a href="${url}" ${urlprop && `itemprop="${urlprop}"`}>${nameElm}</a>`
      : nameElm
    : url && html`<a href="${url}" ${urlprop && `itemprop="${urlprop}"`}>${formatURL(url)}</a>`
}
