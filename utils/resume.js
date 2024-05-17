import path from 'path'
import { validate } from 'resumed'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const resumepath = path.join(__dirname, '../sample.resume.json')

const meow = async () => {
  const out = await validate(resumepath)

  console.log(out)
}
meow()
