import html from '../utils/html.js'
import Project from './project.js'

/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['projects']>} Projects */

/**
 * @param {Projects} projects
 * @param {string} [title] - section title text
 * @returns {string | false}
 */
export default function Projects(projects = [], title = 'Projects') {
  return (
    projects.length > 0 &&
    html`
      <section part="projects">
        <h3 part="section-title">${title}</h3>
        <div class="stack">${projects.map(role => Project(role, 'alumniOf'))}</div>
      </section>
    `
  )
}
