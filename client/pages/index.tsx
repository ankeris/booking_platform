import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";

const TechnologiesFactory = dynamic(() => import("@components/TechnologiesFactory"), { ssr: false });

const ALL_PROJECTS = gql`
    query {
        allProjects {
            title
            description
            previewImage {
                publicUrl
            }
        }
    }
`;

const Home = () => {
    const { loading, error, data } = useQuery(ALL_PROJECTS);

    if (error) return <h1>{error.message}</h1>;
    return loading ? (
        <h1>loading</h1>
    ) : (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Juozas Rastenis Portfolio</h1>
            <main>
                <TechnologiesFactory></TechnologiesFactory>
                <ul>
                    {data.allProjects.map(x => (
                        <li key={x.title}>
                            {x.title}: {x.description}
                            <img src={x.previewImage?.publicUrl} alt="lyra" width="150" />
                        </li>
                    ))}
                </ul>
            </main>

            <footer></footer>
        </div>
    );
};

export default Home;
