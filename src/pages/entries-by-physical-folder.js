import React from "react";
import Link from "gatsby-link";
import Pathify from "../components/ItemPathNodeGenerator";
import Treeify from "../components/ItemTreeGenerator";

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
      <ul>{entryPathNodesUi}</ul>
      <ul>{entryPathsTreeUi}</ul>
      <div>
        <h1>All Entries, by Physical Folder Structure</h1>
      </div>
      <ul>{entries}</ul>
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
