module.exports = {
  siteMetadata: {
    title: "Data Encyclopedia"
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`
      }
    },
    "gatsby-transformer-remark"
  ]
};
