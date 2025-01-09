export type BlogPreviewData = {
    blog_id: number,
    starred: boolean,
    image_source: string,
    title: string,
    description: string
};

export type BlogData = {
    id: string;
    title: string;
    sub_title: string;
    starred: boolean;
    date_created: Date;
    date_modified: Date;
    image: string;
    content: JSX.Element;
};