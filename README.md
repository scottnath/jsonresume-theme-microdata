# jsonresume-theme-microdata

A [JSON Resume](https://jsonresume.org/) theme with styles and DevX forked from [rbardini/jsonresume-theme-even](https://github.com/rbardini/jsonresume-theme-even). This theme includes microdata and HTML changes, as well as an expanded schema structure for microdata `itemtype` on some content types, `basics.pronouns`, and `meta.sectionTitles` which allows changing the content of the resume section titles.

- 🔬 Resume content included as inline microdata
- 💄 Markdown support
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

## Why is this theme different than `jsonresume-theme-even`?

This resume adds structured data in the form of microdata added as attributes throughout the HTML. There are also slight changes to the HTML structure for semantic reasons.

To learn more, see the article [Make your resume SEO friendly using JSON Resume with microdata][explainer]

## Usage

### With Resumed

[Resumed](https://github.com/rbardini/resumed) requires you to install the theme, since it does not come with any by default. You will need to tell `resumed` to use the microdata theme. This assumes you have your `resume.json` file in the directory where you are running this command

```console
npm install resumed jsonresume-theme-microdata
npx resumed render --theme jsonresume-theme-microdata
```

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
        "accent": ["#0073aa", "#00a0d2"]
      }
    }
  }
}
```

[explainer]: https://dev.to/scottnath/make-your-resume-seo-friendly-using-json-resume-with-microdata-1kln
