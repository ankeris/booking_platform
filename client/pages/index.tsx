import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { Technology } from "@core/technologies.types";
import { Project } from "@core/projects.types";
import { Projects } from "./landing/Projects/Projects";

const TechnologiesFactory = dynamic(() => import("pages/landing/Canvas/TechnologiesFactory"), { ssr: false });

const ALL_PROJECTS = gql`
    query {
        allTechnologies {
            title
            description
            experienceStart
            logoImage {
                publicUrl
            }
        }
        allProjects {
            title
        }
    }
`;

interface ILandingPageGQLData {
    allTechnologies: Technology[];
    allProjects: Project[];
}

const Home = () => {
    const { loading, error, data } = useQuery<ILandingPageGQLData>(ALL_PROJECTS);
    const { allTechnologies = undefined, allProjects = undefined } = data || {};

    if (error) return <h1>{error.message}</h1>;
    return loading ? (
        <h1>loading</h1>
    ) : (
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Juozas Rastenis Portfolio</h1>
            <main>
                {allTechnologies && <TechnologiesFactory allTechnologies={allTechnologies} />}
                {allProjects && <Projects projects={allProjects}></Projects>}
            </main>

            <footer></footer>
        </>
    );
};

export default Home;
