import Head from "next/head";
import { useQuery, gql } from "@apollo/client";

const ALL_TODOS = gql`
  query {
    allTodos {
      name
    }
  }
`;
const Home = () => {
  const { loading, error, data } = useQuery(ALL_TODOS);

  if (error) return <h1>{error.message}</h1>;
  return loading ? (
    <h1>loading</h1>
  ) : (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>next app</h1>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
