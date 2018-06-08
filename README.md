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
  - get a url slug auto-generated
  - have the slug set in `allMarkdownRemark.edges.node.fields.slug`
  - get a page created, using the `src/templates/markdown-entry.js` template file
