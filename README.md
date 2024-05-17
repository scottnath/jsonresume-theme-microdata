# jsonresume-theme-microdata

A [JSON Resume](https://jsonresume.org/) theme with styles and DevX forked from [rbardini/jsonresume-theme-even][even-theme]. This theme includes microdata and HTML changes, as well as an expanded schema structure for microdata `itemtype` on some content types, `basics.pronouns`, and `meta.sectionTitles` which allows changing the content of the resume section titles.

- 💄 Markdown support
- 🔬 Resume content included as inline microdata
- 📐 CSS grid layout
- 🌗 Light and dark modes
- 🎨 Customizable colors
- 🧩 Standalone CLI
- 📦 ESM and CommonJS builds
- 🤖 TypeScript typings

## Installation

```console
npm install jsonresume-theme-microdata
```

## How is this theme different than `jsonresume-theme-even`?

**note: this resume should replicate the styling from [rbardini's `even` theme][even-theme].**

### microdata

This resume includes structured data in the form of microdata added as attributes throughout the HTML.

To learn more, see the article [Make your resume SEO friendly using JSON Resume with microdata][explainer]

### schema.json extension

Extra properties were added to support control of the final structured data output on some content types. For instance, in the `Work` HTML, the default designation for an employer is the Type `Organization`, but [schema.org/Organization](https://schema.org/Organization) has a lot of specific subTypes like `Corporation` or `WorkersUnion` - each with their own sub-data.

See the Options below for how to add `themeOptions` and use the `microdata` properties to your resume.json.

### HTML changes

There are also slight changes to the HTML structures. Some changes, including the addition of `part` attributes, are there for styling and to allow usage in web components

### expanded distribution library

The HTML structures from this repo are exported in the NPM distribution. All components are bundled together in `dist/components.js`.

The un-bundled files, along with the storybook and test files are in the distribution as well.

## Usage

### With Resumed

[Resumed](https://github.com/rbardini/resumed) requires you to install the theme, since it does not come with any by default. You will need to tell `resumed` to use the microdata theme. This assumes you have your `resume.json` file in the directory where you are running this command

```console
npm install resumed jsonresume-theme-microdata
npx resumed render --theme jsonresume-theme-microdata
```

**validator note** `resumed` includes the [resume-schema validator](https://github.com/jsonresume/resume-schema). This validator will validate against [the canonical JSON Resume schema.json](https://github.com/jsonresume/resume-schema/blob/master/schema.json), but the validation will not be validating the `microdata` additions across the types.

**validation tip:** to validate your `resume.json` content against the [jsonresume-theme-microdata's schema.json](./schema.json), you can use an online tool like [Hyperjump's JSON Schema validator](https://json-schema.hyperjump.io/).

### Standalone usage

Carried over by forking _Even_, this repo comes with a barebones CLI that reads resumes from `stdin` and outputs HTML to `stdout`. This allows usage without any resume builder tools:

```console
npx jsonresume-theme-microdata < /path/to/resume.json > resume.html
```

## Options

The [expanded JSON Resume schema](./schema.json) includes options for extra pieces of content. These are not required and this resume will work and look correct with resume.json files following the 2021 JSON Resume schema.

### pronouns

You may add a string which represents your pronouns at `basics.pronouns`, which are then included in the `basics` section.

### microdata `itemtype`s

Multiple resume sections have a variable `itemtype` the default of which was determined to best correspond to the resume section content type. These Types are pulled from the vocabulary Types from [Schema.org](https://schema.org). (remember to check out [this SEO article explaining the usage][explainer]).

Changes across the schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  ...
  "properties": {
    ...
    "basics": {
      "items": {
        "properties": {
          ...
          "pronouns": {
            "type": "string",
            "description": "e.g. they/them/theirs"
          },
          ...
        }
      }
    },
    "work": {
      "items": {
        "properties": {
          ...
          "itemtype": {
            "type": "string",
            "description": "Organization Schema.org vocabulary Type, e.g. `Corporation`"
          },
          ...
        }
      }
    },
    "volunteer": {
      "items": {
        "properties": {
          ...
          "itemtype": {
            "type": "string",
            "description": "Organization Schema.org vocabulary Type, e.g. `NGO`"
          },
          ...
        }
      }
    },
    "education": {
      "items": {
        "properties": {
          ...
          "itemtype": {
            "type": "string",
            "description": "Organization Schema.org vocabulary Type, e.g. `EducationalOrganization`"
          },
          ...
        }
      }
    },
    "certificates": {
      "items": {
        "properties": {
          ...
          "itemtype": {
            "type": "string",
            "description": "Organization Schema.org vocabulary Type for `issuer`, e.g. `EducationalOrganization`"
          },
          ...
        }
      }
    },
    "publications": {
      "items": {
        "properties": {
          ...
          "itemtype": {
            "type": "string",
            "description": "CreativeWork Schema.org vocabulary Type, e.g. `HowTo`"
          },
          ...
          "publisherItemtype": {
            "type": "string",
            "description": "Organization Schema.org vocabulary Type, e.g. `OnlineBusiness`"
          },
          ...
        }
      }
    },
    "skills": {
      "items": {
        "properties": {
          ...
          "itemtype": {
            "type": "string",
            "description": "Schema.org vocabulary Type, e.g. `ComputerLanguage`"
          },
          ...
        }
      }
    },
    "interests": {
      "items": {
        "properties": {
          ...
          "itemtype": {
            "type": "string",
            "description": "Thing Schema.org vocabulary Type, e.g. `Brand`"
          },
          ...
        }
      }
    },
    "projects": {
      "items": {
        "properties": {
          ...
          "itemtype": {
            "type": "string",
            "description": "Project Schema.org vocabulary Type, e.g. any `Organization`"
          },
          ...
          "entityItemtype": {
            "type": "string",
            "description": "Organization Schema.org vocabulary Type, e.g. `NGO`"
          },
          ...
        }
      }
    },

```

### Preordered

You can change the order of the sections via the `.meta.themeOptions.preordered` boolean. When `true`, the resume sections (basics, work, etc) will be presented in the resume HTML according to how the sections are ordered in your resume.json file.

```json
{
  "meta": {
    "themeOptions": {
      "preordered": true
    }
  }
}
```

### Colors

You can override theme colors via the `.meta.themeOptions.colors` resume field. Each entry defines a tuple of light and (optional) dark color values. If only one array value is defined, it will be used in both light and dark modes.

Here's an example using the default theme colors:

```json
{
  "meta": {
    "themeOptions": {
      "colors": {
        "background": ["#ffffff", "#191e23"],
        "dimmed": ["#f3f4f5", "#23282d"],
        "primary": ["#191e23", "#fbfbfc"],
        "secondary": ["#6c7781", "#ccd0d4"],
        "link": ["#0073aa", "#00a0d2"]
      }
    }
  }
}
```

### Section Titles

You can change the text of the section titles via the `.meta.themeOptions.sectionTitles` object field. You can change one or all titles by adding them to this object, which will change the sections `H3` tag's contents. Note: `basics` and `meta` do not have titles.

```json
{
  "meta": {
    "themeOptions": {
      "sectionTitles": {
        "work": "Work of a Cat",
        "certificates": "Certificates of Meowing",
        "publications": "Publications for Meows",
        "skills": "Feline Skillset"
      }
    }
  }
}
```

[explainer]: https://dev.to/scottnath/make-your-resume-seo-friendly-using-json-resume-with-microdata-1kln
[even-theme]: https://github.com/rbardini/jsonresume-theme-even
