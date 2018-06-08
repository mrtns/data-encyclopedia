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

# Next Up

- Link markdown entries

  - Define an entry unique id via frontmatter, and include that in the slug
  - Link markdown entries via html anchor tag

- Add mdx (markdown+jsx) entries
  - Link markdown entries via react component link tag
