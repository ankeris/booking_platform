export type Nullable<T> = T | null;

export interface IFile {
    id: string;
    path: string;
    filename: string;
    originalFilename: string;
    mimetype: string;
    encoding: string;
    publicUrl: string;
}
