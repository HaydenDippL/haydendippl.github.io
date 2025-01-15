export type BlogPreviewData = {
    id: number,
    starred: boolean,
    image: string,
    title: string,
    description: string
};

export type BlogData = {
    id: number;
    title: string;
    description: string;
    starred: boolean;
    created: string;
    published: string;
    modified: string;
    image: string;
    content: JSX.Element;
};