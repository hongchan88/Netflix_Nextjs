import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://netflix-noogle-search-movie.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
