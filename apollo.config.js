// apollo.config.js
module.exports = {
  client: {
    service: {
      name: "Strapi GraphQL",
      // URL to the GraphQL API
      url: process.env.GRAPHQL_URL,
    },
    // Files processed by the extension
    includes: ["lib/*.vue", "lib/*.js"],
  },
};
