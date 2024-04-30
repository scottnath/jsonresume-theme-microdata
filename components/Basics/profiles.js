import html from '../../utils/html.js'
import Icon from '../icon.js'
import Link from '../link.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['basics']>['profiles']} Profiles */

/**
 * @param {Profiles} profiles
 * @returns {string | false}
 */
export default function profiles(profiles = []) {
  return (
    Array.isArray(profiles) &&
    profiles.length > 0 &&
    html`
      <dl class="icon-list">
        ${profiles.map(({ network, url, username }) => {
          let style = ''
          if (network) {
            const icon = Icon(network, 'user')
            if (icon) {
              style = `style="--svg-network:url('data:image/svg+xml, ${encodeURIComponent(icon)}')"`
            }
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
