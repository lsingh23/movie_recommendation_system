import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext({
//     headers: {
//       authorization: `AstraCS:glBGuJogUpOyCgEZpSUGRWRE:c584e083962851ac4b09fc01c385976fd3c69595182f632e0d22b4f9938b6f4b`,
//     },
//   });
//   return forward(operation);
// });

const link = createHttpLink({
  uri:
    "https://3bd57527-a3fd-47dc-af12-e58a2afab2ba-us-east1.apps.astra.datastax.com/api/graphql/movies_db",
  headers: {
    "x-cassandra-token":
      "AstraCS:glBGuJogUpOyCgEZpSUGRWRE:c584e083962851ac4b09fc01c385976fd3c69595182f632e0d22b4f9938b6f4b",
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
