export type BlogPreviewData = {
    id: number,
    starred: boolean,
    published: string;
    image: string,
    title: string,
    description: string
};

// same as BlogPreviewData but types may not be present, used for skeletons
export type BlogPreviewProps = {
    id?: number,
    starred?: boolean,
    published?: string;
    image?: string,
    title?: string,
    description?: string
}

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
    next?: BlogPreviewData | null;
    prev?: BlogPreviewData | null;
};

// same as BlogData but types may not be present, used for skeletons
export type BlogDataProps = {
    id?: number;
    title?: string;
    description?: string;
    starred?: boolean;
    created?: string;
    published?: string;
    modified?: string;
    image?: string;
    content?: JSX.Element;
};

export type PinnedRecentBlogs = { pinned: BlogPreviewData[], recent: BlogPreviewData[] };