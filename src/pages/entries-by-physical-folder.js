import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  const entries = data.allMarkdownRemark.edges.map(edge => (
    <li>
      <Link to={edge.node.fields.path}>{edge.node.fields.path}</Link>
    </li>
  ));
  return (
    <div>
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
