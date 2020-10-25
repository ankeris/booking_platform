import { IFile } from "./general.types";

export interface Project {
    _label_: string;
    id: string;
    title: string;
    previewImage: IFile;
    description: string;
}
