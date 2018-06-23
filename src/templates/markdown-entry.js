import React from "react";

export default ({ data }) => {
  const entry = data.markdownRemark;
  return (
    <div>
      <h1>{entry.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: entry.html }} />
    </div>
  );
};

export const query = graphql`
  query EntryQuery($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
