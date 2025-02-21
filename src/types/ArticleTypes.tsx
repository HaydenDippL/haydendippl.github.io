import { Tech } from "./TechTypes";

export type ArticlePreviewData = {
    id: number,
    starred: boolean,
    published: string;
    image: string,
    title: string,
    description: string,
    technologies: Tech[]
};

export type ArticleData = {
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

export type PinnedRecentBlogs = {
    pinned: ArticlePreviewData[],
    recent: ArticlePreviewData[]
};