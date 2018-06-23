const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    const path = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "path",
      value: path
    });
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const entryTemplate = path.resolve("src/templates/markdown-entry.js");

  const allMarkdownEntries = `
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              path
            }
          }
        }
      }
    }
  `;

  return graphql(allMarkdownEntries).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.path,
        component: entryTemplate,
        context: {}
      });
    });
  });
};
