import Awards from './Awards/index.js'
import Basics from './Basics/basics.js'
import Certificates from './Certificates/index.js'
import Education from './Education/index.js'
import Interests from './Interests/index.js'
import Languages from './Languages/index.js'
import Meta from './Meta/index.js'
import Projects from './Projects/index.js'
import Publications from './Publications/index.js'
import References from './References/index.js'
import Skills from './Skills/index.js'
import Volunteer from './Volunteer/index.js'
import Work from './Work/index.js'

import html from '../utils/html.js'
import markdown from '../utils/markdown.js'
import { DateTime, ShortDate } from './date.js'
import duration from './duration.js'
import link from './link.js'

export const components = {
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
  ResumeArticle: {},
}

export const utils = {
  ShortDate,
  DateTime,
  duration,
  html,
  link,
  markdown,
}
