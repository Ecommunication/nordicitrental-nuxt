import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "apollo-boost";

import Vue from "vue";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

let client;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

// const authLink = new ApolloLink((operation, forward) => {
//   const token = process.env.AUTH_TOKEN;

//   operation.setContext({
//     headers: { authorization: token ? `Bearer ${token}` : "" },
//   });

//   return forward(operation);
// });

/**
 * createApolloClient
 */

export function _createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://cln10luitf3semid3851.cleaver.rocks/graphql",
    }),
    cache: new InMemoryCache(),
  });
}
