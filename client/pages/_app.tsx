import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import "../styles/globals.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "/admin/api"
  })
});

const MyApp = ({ Component, pageProps }: any) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default MyApp;
