import { Tech } from "./TechTypes";

export type ProjectPreviewData = {
    id: number,
    starred: boolean,
    published: string;
    image: string,
    title: string,
    description: string,
    technologies: Tech[]
};

export type ProjectData = {
    id: number,
    starred: boolean,
    published: string,
    image: string,
    title: string,
    description: string,
    technologies: Tech[]
    created: string,
    modified: string,
    content: JSX.Element,
};