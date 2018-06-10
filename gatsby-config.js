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
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-relative-link-adapter"]
      }
    }
  ]
};
