# A markdown entry with links to other entries

## Markdown links

Use markdown links to link to other markdown entries.

Format: `[another-markdown-file](./another-markdown-file.md)`

Examples:

- Plain: [a-markdown-entry](./a-markdown-entry.md)
- With hash: [a-markdown-entry](./a-markdown-entry.md#some-hash)
- With query: [a-markdown-entry](./a-markdown-entry.md?some-query=some-query-value)
- Link to an entry in a subfolder: [a-markdown-entry-in-a-folder](./entry-folder/a-markdown-entry-in-a-folder.md)

These links work:

- In the markdown rendered by local development tools like vscode
- In the markdown pages rendered on Github
- In the gatsby compiled site

## HTML anchor links

Use HTML anchor links to link to other markdown entries.

Format: `<a ref="../another-markdown-file">another-markdown-file</a>`

Example:

- Plain <a href="../a-markdown-entry">a-markdown-entry.md</a>.

These links work:

- In the gatsby compiled site

However, they do not work:

- In the markdown rendered by local development tools like vscode
- In the markdown pages rendered on Github
