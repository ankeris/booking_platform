import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { theme } from "@styles/theme";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "/admin/api"
    })
});

const MyApp = ({ Component, pageProps }: any) => (
    <ApolloProvider client={client}>
        <Normalize />
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    </ApolloProvider>
);

export default MyApp;
