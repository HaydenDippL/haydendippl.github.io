import { Tech } from "./TechTypes";

export type ArticlePreviewData = {
    id: number,
    starred: boolean,
    published: string;
    image: string,
    title: string,
    description: string,
    technologies: Tech[],
    article_type: ArticleType
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
    article_type: ArticleType
};

export type PinnedRecentBlogs = {
    pinned: ArticlePreviewData[],
    recent: ArticlePreviewData[]
};

export enum ArticleType {
    blog = "blog",
    project = "project"
}