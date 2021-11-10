import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `${process.env.VERCEL_URL}:3000/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
