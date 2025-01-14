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
    created: Date;
    modified: Date;
    image: string;
    content: JSX.Element;
};