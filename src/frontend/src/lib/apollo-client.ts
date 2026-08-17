import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    "http://localhost/graphql",
  fetchOptions: { cache: "no-store" },
});

// Server-side Apollo Client (used in Server Components & generateStaticParams)
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});
