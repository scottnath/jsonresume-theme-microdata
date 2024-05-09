import ResumeArticle from './components/ResumeArticle/index.js'
import HeadMeta from './components/utils/html-meta.js'

import colors from './components/utils/colors.js'
import html from './components/utils/html.js'

/**
 * @param {import('./schema.d.ts').ResumeSchema} resume
 * @param {string} css
 * @returns
 */
export default function Resume(resume, css) {
  return html`<!doctype html>
    <html lang="en" style="${colors(resume.meta)}">
      <head>
        <meta charset="utf-8" />
        ${HeadMeta(resume.basics)}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" />
        <style>
          ${css}
        </style>
      </head>
      <body itemscope itemtype="https://schema.org/ProfilePage">
        ${ResumeArticle(resume)}
      </body>
    </html>`
}
