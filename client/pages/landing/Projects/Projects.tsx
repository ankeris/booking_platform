import { Project } from "@core/projects.types";

interface IProps {
    projects: Project[];
}

export const Projects = ({ projects }: IProps) => {
    return (
        <ul>
            {projects.map(x => (
                <li key={x.title}>
                    {x.title}: {x.description}
                    <img src={x.previewImage?.publicUrl} alt="lyra" width="150" />
                </li>
            ))}
        </ul>
    );
};
