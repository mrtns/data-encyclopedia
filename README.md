# Data Encyclopedia

A data encyclopedia website powered by markdown and a static site generator.

# Functionality

Overall:

- I WANT a single place to reference all my data  
  SO THAT I don’t have to jump to different tools to see definitions, metrics, stories, reports, etc

  - I WANT to maintain a git and markdown based data dictionary  
    SO THAT all changes are source controlled

In Detail:

## Add markdown entries

I WANT to add markdown files representing components  
SO THAT each component is a plain text file

Usage:

- Add markdown files to `src/entries/`

- Via `gatsby-node.js`, every markdown file entry will
  - get a page created, using the `src/templates/markdown-entry.js` template file

### Auto-generate a url slug

I WANT to have each markdown entry get a url slug auto generated from the file name  
SO THAT I don't have to manually define it in the frontmatter

Usage:

- Via `gatsby-node.js`, every markdown file entry will
  - get a url slug auto-generated, based on the file name
  - have the slug set in `allMarkdownRemark.edges.node.fields.slug`

## Link markdown entries

I WANT to link other markdown entries with the markdown link syntax

I WANT the links to work locally, in Github, and in the compiled gatsby site

Usage:

- In a markdown file, add a [markdown link](https://spec.commonmark.org/0.28/#links) to any other entry, with the following rules:
  - link destination starts with `./`
- For example: `[another-markdown-file](./another-markdown-file.md)`
- Via a `gatsby-remark-relative-linker-md-extension-remover` plugin for `gatsby-transformer-remark`

# Next Up

- Link markdown entries

  - Preserve the # and ? segments of the URL
  - Preserve old links when entries are renamed

- Add mdx (markdown+jsx) entries

  - Link markdown entries via react component link tag

- Organize entries

  - Organize entries with physical folder structure

    - List entries by folder structure
    - Render folders via index.md

  - Organize entries with virtual folder structure

    - List entries by virtual folder structure

  - Organize entries by key-value tags

    - List entries by entry type (defined in frontmatter)

- Add js entries

- Embed entries

* List inbound links for an entry

  - List inbound links for an entry by link type (JIRA style)

* Iframe external content
