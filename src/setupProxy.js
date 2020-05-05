// This module allows us to manually override the proxy configuration for the
// react dev server.
// ref: https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually

const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  // Enforce that the react dev server from create-react-app passes all
  // requests to the graphql endpoint, including the playground, to our server
  app.use(proxy("/graphql", { target: "http://localhost:7101/" }));
};
