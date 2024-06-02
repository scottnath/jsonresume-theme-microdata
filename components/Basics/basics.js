import html from '../utils/html.js'
import Link from '../utils/link.js'
import markdown from '../utils/markdown.js'
import Location from './location.js'
import Profiles from './profiles.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['basics']} basics
 * @returns {string}
 */
export default function Header(basics = {}) {
  const { email, image, location, name, phone, url, profiles, label, summary, pronouns } = basics

  return html`
    <header class="masthead" part="basics">
      <div>
        <h1 itemprop="name" part="name">${name}</h1>
        ${label && html`<h2 itemprop="jobTitle" part="label">${label}</h2>`}
      </div>
      ${image && html`<img src="${image}" alt="${name}'s picture" itemprop="image" part="image" />`}
      ${summary && html`<div itemprop="description" part="summary">${markdown(summary)}</div>`}
      <div>
        <address part="contact">
          <dl class="icon-list">
            ${location &&
            html`
              <div class="location">
                <dt><span class="sr-only">location</span></dt>
                <dd>${Location(location, 'address')}</dd>
              </div>
            `}
            ${email &&
            html`
              <div class="email">
                <dt><span class="sr-only">email</span></dt>
                <dd itemprop="email"><a href="mailto:${email}">${email}</a></dd>
              </div>
            `}
            ${phone &&
            html`
              <div class="phone">
                <dt><span class="sr-only">phone</span></dt>
                <dd itemprop="telephone"><a href="tel:${phone.replace(/\s/g, '')}">${phone}</a></dd>
              </div>
            `}
            ${url &&
            html`
              <div class="url">
                <dt><span class="sr-only">url</span></dt>
                <dd>${Link(url)}</dd>
              </div>
            `}
            ${pronouns &&
            html`
              <div class="pronouns" part="pronouns">
                <dt><span class="sr-only">pronouns</span></dt>
                <dd itemprop="gender">${pronouns}</dd>
              </div>
            `}
          </dl>
        </address>
        ${Profiles(profiles)}
      </div>
    </header>
  `
}
