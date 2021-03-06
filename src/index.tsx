// Vendor modules
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React from "react";
import ReactDOM from "react-dom";

// Local modules
import "./index.css";
import App from "./app";
import * as serviceWorker from "./serviceWorker";

// Instantiating the Apollo client.
// For more, see:
// https://www.apollographql.com/docs/react/get-started/#create-a-client
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
