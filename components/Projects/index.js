import html from '../../utils/html.js'
import Project from './project.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['projects']} projects
 * @returns {string | false}
 */
export default function Projects(projects = []) {
  return (
    projects.length > 0 &&
    html`
      <section part="projects">
        <h3>Projects</h3>
        <div class="stack">${projects.map(role => Project(role, 'alumniOf'))}</div>
      </section>
    `
  )
}
