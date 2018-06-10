const path = require("path");
const visit = require("unist-util-visit");

function adapt_url_path_name(link_url_path) {
  // TODO: preserve # and ? in URLs
  return link_url_path.name === "index" ? "" : link_url_path.name;
}

function adapt_url_prefix(current_node_path) {
  const current_node_path_name = path.basename(
    current_node_path,
    path.extname(current_node_path)
  );
  return current_node_path_name === "index" ? "" : "../";
}

function url_is_relative_link(node_url) {
  return (
    node_url &&
    !node_url.startsWith("//") &&
    !node_url.startsWith("http") &&
    node_url.startsWith("./")
  );
}

module.exports = ({ markdownAST, markdownNode }) => {
  const current_node_path = markdownNode.absolutePath;
  visit(markdownAST, "link", node => {
    if (url_is_relative_link(node.url)) {
      const link_url_path = path.parse(node.url);

      node.url = path.join(
        adapt_url_prefix(current_node_path),
        link_url_path.dir,
        adapt_url_path_name(link_url_path),
        "/"
      );
    }
  });
  return markdownAST;
};
