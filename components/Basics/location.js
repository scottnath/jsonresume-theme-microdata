import html from '../../utils/html.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['basics']>['location']} Location */

/**
 * @param {Location} location
 * @param {string} [itemprop]
 * @returns {string | false}
 */
export default function location(location = {}, itemprop) {
  const { region, city, countryCode } = location
  return (
    Object.values(location).length > 0 &&
    html`
      <div ${itemprop && `itemprop="${itemprop}"`} itemscope itemtype="https://schema.org/PostalAddress">
        ${region && html`<span itemprop="addressRegion">${region}</span>`}
        ${city && html`<span itemprop="addressLocality">${city}</span>`}
        ${countryCode && html`<span itemprop="addressCountry">${countryCode}</span>`}
      </div>
    `
  )
}
