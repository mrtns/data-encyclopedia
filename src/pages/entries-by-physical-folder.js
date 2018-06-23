import React from "react";
import Link from "gatsby-link";
import Pathify from "../components/ItemPathNodeGenerator";
import Treeify from "../components/ItemTreeGenerator";

const EntryTree = props => {
  const getNodeDisplayPath = function(node) {
    function removeParentPathPart(node) {
      return node.path.replace(new RegExp(`^${node.parentPath}`), "");
    }
    function removeTrailingSlash(nodePath) {
      return nodePath === "/" ? nodePath : nodePath.replace(/\/$/, "");
    }
    return removeTrailingSlash(removeParentPathPart(node));
  };

  const nodes = props.nodes || [];
  return (
    <ul>
      {nodes.map(node => {
        const nodeDisplayPath = getNodeDisplayPath(node);
        const entryElement = node.resolvesToItem ? (
          <Link to={node.path}>{nodeDisplayPath}</Link>
        ) : (
          <span>{nodeDisplayPath}</span>
        );
        const childrenElement =
          node.children.length > 0 ? <EntryTree nodes={node.children} /> : null;
        return (
          <li>
            {entryElement}
            {childrenElement}
          </li>
        );
      })}
    </ul>
  );
};

export default ({ data }) => {
  const entryPathNodes = Pathify.getAllPathNodes(
    data.allMarkdownRemark.edges.map(e => e.node.fields.path)
  );

  const entryPathsTree = Treeify.getTreeFromPathNodes(entryPathNodes);

  return (
    <div>
      <div>
        <h1>All Entries, by Physical Folder Structure</h1>
        <EntryTree nodes={entryPathsTree} />
      </div>
    </div>
  );
};

export const query = graphql`
  query EntriesByPhysicalFolderQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            path
          }
        }
      }
    }
  }
`;
