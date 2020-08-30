import Head from "next/head";
import { useQuery, gql } from "@apollo/client";

const ALL_TODOS = gql`
  query {
    allTodos {
      name
      description
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
      <h1>booking app </h1>
      <main>
        <ul>
          {data.allTodos.map(x => (
            <li>
              {x.name}: {x.description}
            </li>
          ))}
        </ul>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
