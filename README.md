# Data Encyclopedia

A data encyclopedia website powered by markdown and a static site generator.

# Functionality

Overall:

- I WANT a single place to reference all my data  
  SO THAT I don’t have to jump to different tools to see definitions, metrics, stories, reports, etc

  - I WANT to maintain a git and markdown based data dictionary  
    SO THAT all changes are source controlled

In Detail:

## Add entries

### Add markdown entries

I WANT to add markdown files representing components  
SO THAT each component is a plain text file

Usage:

- Add markdown files to `src/entries/`

- Via `gatsby-node.js`, every markdown file entry will
  - get a page created, using the `src/templates/markdown-entry.js` template file

#### Auto-generate a url slug

I WANT to have each markdown entry get a url slug auto generated from the file name  
SO THAT I don't have to manually define it in the frontmatter

Usage:

- Via `gatsby-node.js`, every markdown file entry will
  - get a url slug auto-generated, based on the file name
  - have the slug set in `allMarkdownRemark.edges.node.fields.slug`

## Link entries

### Link markdown entries

I WANT to link other markdown entries with the markdown link syntax

I WANT the links to work locally, in Github, and in the compiled gatsby site

Usage:

- In a markdown file, add a [markdown link](https://spec.commonmark.org/0.28/#links) to any other entry, with the following rules:
  - link destination starts with `./`
- For example: `[another-markdown-file](./another-markdown-file.md)`
- Via a `gatsby-remark-relative-linker-md-extension-remover` plugin for `gatsby-transformer-remark`

## Organize entries

### Organize entries with physical folder structure

#### List entries by physical folder structure

#### Render folders via index.md

# Next Up

- Add entries

  - Add mdx (markdown+jsx) entries

    - Link markdown entries via react component link tag

  - Add js entries

- Link entries

  - Preserve the # and ? segments of the URL
  - Preserve old links when entries are renamed

- Organize entries

  - Organize entries with physical folder structure

    - Render folders via index.md or README.md (the latter being Github compatible)

  - Organize entries with virtual folder structure

    - List entries by virtual folder structure

  - Organize entries by key-value tags

    - List entries by entry type (defined in frontmatter)

- Compose entries

  - Embed entries

  - Compose entries with [mdx](https://github.com/mdx-js/mdx)

  - Compose entries via markdown and [rehype-react](https://using-remark.gatsbyjs.org/custom-components/)

  - Iframe external content

- Contextualize entries

  - List inbound links in an entry

    - List inbound links for an entry by link type (JIRA style)

  - List folder structure position in an entry

    - List parents and children of the physical folder structure for an entry

    - List parents and children of a virtual folder structure for an entry

- Add shared components in entries

  - Add table of contents

- Meta

  - Extract scenarios into discrete example folders

  - Build the documentation with data-encyclopedia

  - Extract the generic CMS stuff from the specific data-encyclopedia stuff

# Inspiration

- knowledge-repo

- VuePress
