const path = require("path");
const visit = require("unist-util-visit");

module.exports = ({ markdownAST }) => {
  visit(markdownAST, "link", node => {
    if (
      node.url &&
      !node.url.startsWith("//") &&
      !node.url.startsWith("http") &&
      node.url.startsWith("./")
    ) {
      const node_path = path.parse(node.url);

      // TODO: preserve # and ? in URLs
      node.url = path.join("../", node_path.dir, node_path.name, "/");
    }
  });
  return markdownAST;
};
