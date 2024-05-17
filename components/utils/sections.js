import {
  Awards,
  Basics,
  Certificates,
  Education,
  Interests,
  Languages,
  Meta,
  Projects,
  Publications,
  References,
  Skills,
  Volunteer,
  Work,
} from '../index.js'

/** @typedef {import('../../schema.d.ts').ResumeSchema} Resume */

/**
 * The default order of the resume sections
 */
export const defaultSectionOrder = [
  'basics',
  'work',
  'volunteer',
  'education',
  'awards',
  'certificates',
  'publications',
  'skills',
  'languages',
  'interests',
  'references',
  'projects',
  'meta',
]

/**
 *
 * @param {string} section - name of section
 * @param {Resume} resume
 * @returns
 */
export const getSection = (section, resume) => {
  if (!defaultSectionOrder.includes(section)) return
  let title
  if (resume.meta?.themeOptions?.sectionTitles) {
    // @ts-ignore
    title = resume.meta?.themeOptions?.sectionTitles[section]
  }
  switch (section) {
    case 'basics':
      return Basics(resume.basics)
    case 'work':
      return Work(resume.work, title)
    case 'volunteer':
      return Volunteer(resume.volunteer, title)
    case 'education':
      return Education(resume.education, title)
    case 'awards':
      return Awards(resume.awards, title)
    case 'certificates':
      return Certificates(resume.certificates, title)
    case 'publications':
      return Publications(resume.publications, title)
    case 'skills':
      return Skills(resume.skills, title)
    case 'languages':
      return Languages(resume.languages, title)
    case 'interests':
      return Interests(resume.interests, title)
    case 'references':
      return References(resume.references, title)
    case 'projects':
      return Projects(resume.projects, title)
    case 'meta':
      return Meta(resume.meta)

    default:
      return
  }
}

/**
 * Generate resume internal content
 * @param {Resume} resume
 */
export const internals = resume => {
  let order = defaultSectionOrder
  if (resume.meta?.themeOptions?.preordered) {
    order = Object.keys(resume)
  }
  const resumeSections = order
    .map(section => {
      // @ts-ignore
      if (!resume[section]) return
      return getSection(section, resume)
    })
    .filter(item => item !== undefined)

  return resumeSections
}
