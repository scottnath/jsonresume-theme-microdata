import { microdata } from '@cucumber/microdata'
import { expect } from '@storybook/test'

/** @typedef {import('../../schema.d.ts').ResumeSchema['education']} Education */
/** @typedef {NonNullable<import('../../schema.d.ts').ResumeSchema['education']>[number]} Institution */

/**
 * Test the expected microdata associated with the content
 * @param {object} canvasElement
 * @param {Institution} content
 */
export const expectedDataInstitution = (canvasElement, content) => {
  const itemtype = content.itemtype || 'EducationalOrganization'
  const data = microdata(`https://schema.org/${itemtype}`, canvasElement)

  expect(data['@type']).toBe(content.itemtype || 'EducationalOrganization')
  expect(data.name).toBe(content.institution)
  expect(data.url).toBe(content.url)
  expect(data.owns['@type']).toBe('EducationalOccupationalProgram')
  expect(data.owns.occupationalCategory).toBe(content.area)
  expect(data.owns.educationalProgramMode).toBe(content.studyType)
  expect(data.owns.startDate).toBe(content.startDate)
  expect(data.owns.endDate).toBe(content.endDate)
  if (Array.isArray(content.courses) && content.courses.length > 0) {
    expect(data.owns.hasCourse).toHaveLength(content.courses.length)
  }
}

/**
 * Test the expected microdata associated with the content
 * @param {object} canvasElement
 * @param {Education} content
 */
export const expectedDataEduction = (canvasElement, content) => {
  const data = microdata('https://schema.org/Person', canvasElement)
  if (!Array.isArray(content) || content.length === 0) {
    expect(data).toMatchObject({ '@type': 'Person' })
    return
  }
  if (content.length === 1) {
    expect(Array.isArray(data.alumniOf)).toBeFalsy()
    const itemtype = content[0].itemtype || 'EducationalOrganization'
    expect(data.alumniOf['@type']).toBe(itemtype)
    return
  }
  expect(Array.isArray(data.alumniOf)).toBeTruthy()
  content.forEach((item, index) => {
    const itemtype = item.itemtype || 'EducationalOrganization'
    expect(data.alumniOf[index]['@type']).toBe(itemtype)
  })
}
