# JSON Resume theme example

This example shows how to use Resumed with a JSON Resume theme, [microdata](https://github.com/scottnath/jsonresume-theme-microdata).

## How to use

If not installed already, install the npm modules

```sh
npm install
```

### Create an example resume

```sh
npm run example
```

This will:

1. Generate an example resume.json file
   - contains example resume content
   - generated at ./resume.json
1. Generate an HTML file: example.html
   - combines the example content and jsonresume-theme-microdata
   - generated at ./example.html

### Download a remote resume.json

**gist**

```sh
npm run remote -- --gist_id=[your resume.json gist id]
```

**url**

```sh
npm run remote -- --json_url=[url to a resume.json file]
```

This will:

1. Get resume.json file contents
   - from a gist or a URL
   - generates ./resume.json with contents
1. Generate an HTML file: resume.html
   - combines the remote content and jsonresume-theme-microdata
   - generated at ./resume.html
