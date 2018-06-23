import React from "react";
import Link from "gatsby-link";
import Pathify from "../components/ItemPathNodeGenerator";
import Treeify from "../components/ItemTreeGenerator";

const EntryTree = props => {
  const nodes = props.nodes || [];
  return (
    <ul>
      {nodes.map(node => {
        const nodeDisplayPath = node.path.replace(
          new RegExp(`^${node.parentPath}`),
          ""
        );
        return (
          <li>
            <Link to={node.path}>{nodeDisplayPath}</Link>
            <EntryTree nodes={node.children} />
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

  const entryPathNodesUi = entryPathNodes.map(n => (
    <li>
      <pre>{JSON.stringify(n)}</pre>
    </li>
  ));

  const entryPathsTree = Treeify.getTreeFromPathNodes(entryPathNodes);

  const entryPathsTreeUi = entryPathsTree.map(e => (
    <li>
      <pre>{JSON.stringify(e)}</pre>
    </li>
  ));

  const entries = data.allMarkdownRemark.edges.map(edge => (
    <li>
      <Link to={edge.node.fields.path}>{edge.node.fields.path}</Link>
    </li>
  ));
  return (
    <div>
      <div>
        <h1>Data</h1>
        <h2>Path node data</h2>
        <ul>{entryPathNodesUi}</ul>
        <h2>Tree node data</h2>
        <ul>{entryPathsTreeUi}</ul>
      </div>
      <div>
        <h1>All Entries</h1>
      </div>
      <ul>{entries}</ul>
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
