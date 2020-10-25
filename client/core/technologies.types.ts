import { IFile } from "./general.types";

export interface ITechnology {
    _label_: string;
    id: string;
    title: string;
    logoImage: IFile;
    description: string;
    experienceStart: string;
}
