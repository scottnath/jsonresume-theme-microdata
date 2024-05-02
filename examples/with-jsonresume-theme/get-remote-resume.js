/**
 * @fileoverview Fetches a remote resume and writes it to a local file
 */

import { writeFileSync } from 'fs'
import { promisify } from 'node:util'
import schema from 'resume-schema'

const schemaValidate = promisify(schema.validate)

/**
 * Uses the GitHub rest API to fetch a resume.json gist's content
 * @param {string} gist_id
 * @returns {object} validated resume.json content
 * @see https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28#get-a-gist
 */
const getResumeJsonGist = async gist_id => {
  if (!gist_id) throw new Error('`gist_id` required')

  const ghApiGists = 'https://api.github.com/gists'

  const resp = await fetch(`${ghApiGists}/${gist_id}`)
  if (resp.message === 'Not Found') throw new Error(`Gist not found. Error: ${response}`)

  const response = await resp.json()

  if (!response.files['resume.json']) throw new Error(`resume.json not in gist ${gist_id}`)

  let content

  try {
    content = response.files['resume.json'].content
    content = JSON.parse(content)
  } catch (error) {
    throw new Error(`cannot parse resume.json content. Error: ${error}`)
  }
  const validated = await schemaValidate(content)
  if (!validated.valid) throw new Error(`Invalid resume schema. Gist content: ${content}`)

  return content
}

/**
 * Fetch a resume.json file from a URL
 * @param {string} json_url
 * @returns {object} validated resume.json content
 */
const getResumeJsonUrl = async json_url => {
  if (!json_url) throw new Error('`json_url` required')

  const resp = await fetch(json_url)
  if (resp.error) throw new Error(`getResumeJsonUrl fetch error: ${response}`)

  const response = await resp.json()
  const validated = await schemaValidate(response)
  if (!validated.valid) throw new Error(`Invalid resume schema. Url content: ${response}`)

  return response
}

/**
 * Gets resume.json content from a gist or a url and writes it to
 *  a resume.json file
 */
const getResumeJson = async () => {
  let resumejson
  const args = process.argv.slice(2)
  const urlArg = args.find(arg => arg.startsWith('--json_url='))
  const json_url = urlArg ? urlArg.split('=')[1] : ''
  if (json_url) {
    resumejson = await getResumeJsonUrl(json_url)
    console.log('url', resumejson)
  } else {
    const idArg = args.find(arg => arg.startsWith('--gist_id='))
    const gist_id = idArg ? idArg.split('=')[1] : ''
    if (!gist_id) throw new Error('`gist_id` or `json_url` required')

    resumejson = await getResumeJsonGist(gist_id)
    console.log('gist_id', resumejson)
  }
  writeFileSync('./resume.json', JSON.stringify(resumejson, null, 2))
  return
}

getResumeJson()
