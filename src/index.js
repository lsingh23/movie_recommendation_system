import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const TOKEN = process.env.REACT_APP_TOKEN;
const MOVIES_URL = process.env.REACT_APP_MOVIES_URL;

const link = createHttpLink({
  uri: MOVIES_URL,
  headers: {
    "x-cassandra-token": TOKEN,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);
