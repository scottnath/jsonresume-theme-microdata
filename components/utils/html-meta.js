import html from './html.js'
import markdown from './markdown.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['basics']} basics
 * @returns {string}
 */
export default function HeadMeta(basics = {}) {
  const { name, summary } = basics

  return html`
    ${name && html`<title>${name}</title>`}
    ${summary && html`<meta name="description" content="${markdown(summary, true)}" />`}
  `
}
