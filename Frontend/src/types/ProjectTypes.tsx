export type ProjectPreviewData = {
    id: number,
    starred: boolean,
    published: string;
    image: string,
    title: string,
    description: string
};

// same as ProjectPreviewData but types may not be present, used for skeletons
export type ProjectPreviewProps = {
    id?: number,
    starred?: boolean,
    published?: string;
    image?: string,
    title?: string,
    description?: string
}

export type ProjectData = {
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

// same as ProjectData but types may not be present, used for skeletons
export type ProjectDataProps = {
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