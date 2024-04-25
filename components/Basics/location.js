import html from '../../utils/html.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['basics'].location} location
 * @param {string} [itemprop]
 * @returns {string | false}
 */
export default function location(location = {}, itemprop) {
  const { region, city, countryCode } = location
  return (
    Object.values(location).length > 0 &&
    html`
      <address ${itemprop && `itemprop="${itemprop}"`} itemscope itemtype="https://schema.org/PostalAddress">
        ${region && html`<span itemprop="addressRegion">${region}</span>`}
        ${city && html`<span itemprop="addressLocality">${city}</span>`}
        ${countryCode && html`<span itemprop="addressCountry">${countryCode}</span>`}
      </address>
    `
  )
}
