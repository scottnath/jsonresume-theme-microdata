import html from '../../utils/html.js'
import Icon from '../icon.js'
import Link from '../link.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['profiles']} profiles
 * @param {string} [itemprop]
 * @returns {string | false}
 */
export default function profiles(profiles = [], itemprop) {
  return (
    Array.isArray(profiles) &&
    profiles.length > 0 &&
    html`
      <dl ${itemprop && `itemprop="${itemprop}"`} class="icon-list">
        ${profiles.map(({ network, url, username }) => {
          let style = ''
          if (network) {
            const icon = Icon(network, 'user')
            if (icon) {
              style = `style="--svg-network:url('data:image/svg+xml, ${encodeURIComponent(icon)}')"`
            }
            console.log('style', icon, style)
          }
          const content = username ? html`<span itemprop="identifier">${username}</span>` : Link(url)
          return html` <div itemprop="ContactPoint" itemscope itemtype="https://schema.org/ContactPoint">
            <dt ${style} itemprop="contactType"><span class="sr-only">${network}</span></dt>
            <dd data-network="${network}"><a href="${url}" itemprop="url">${content}</a></dd>
          </div>`
        })}
      </dl>
    `
  )
}