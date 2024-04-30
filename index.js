import Resume from './resume.js'
// @ts-expect-error `?inline` query
import ResumeArticle from './components/ResumeArticle/index.js'
import { components } from './components/index.js'
import css from './style.css?inline'

export const pdfRenderOptions = { mediaType: 'print' }

/**
 * @param {import('./schema.d.ts').ResumeSchema} resume
 * @returns {string}
 */
export const render = resume => {
  return Resume(resume, css)
}

export { components, utils } from './components/index.js'

components.ResumeArticle = ResumeArticle
