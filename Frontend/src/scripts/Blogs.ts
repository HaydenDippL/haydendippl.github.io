import { DateTime } from "luxon";

import { BlogData, BlogPreviewData, PinnedRecentBlogs } from "../types/BlogTypes";

// import the pages
import { TheImportanceOfPlanningBlog } from "../blogs/The-Importance-Of-Planning"

const blogs: BlogData[] = [
    TheImportanceOfPlanningBlog
];

export function get_blog(id: string | undefined): BlogData | undefined {
    if (id === undefined) return undefined;
    
    const id_number: number = parseInt(id);
    if (isNaN(id_number) || id_number < 0 || id_number >= blogs.length)
        return undefined;

    const blog: BlogData = blogs[id_number];
    const now: DateTime = DateTime.now();
    const published: DateTime = DateTime.fromISO(blog.published);

    if (now < published)
        return undefined;

    return blog;
}

export function get_blog_previews(): BlogPreviewData[] {
    const now: DateTime = DateTime.now();

    return blogs.filter((blog) => {
        const published: DateTime = DateTime.fromISO(blog.published);
        return now > published;
    }).map((blog) => {
        return {
            id: blog.id,
            starred: blog.starred,
            published: blog.published,
            image: blog.image,
            title: blog.title,
            description: blog.description,
        };
    }).sort((a, b) => {
        const a_ms = DateTime.fromISO(a.published).toMillis();
        const b_ms = DateTime.fromISO(b.published).toMillis()
        return b_ms - a_ms;
    });
}

export function get_pinned_and_recent(): PinnedRecentBlogs {
    const pinned: BlogPreviewData[] = blogs.filter((blog) => {
        return blog.starred;
    }).sort((a, b) => {
        const a_ms = DateTime.fromISO(a.published).toMillis();
        const b_ms = DateTime.fromISO(b.published).toMillis()
        return b_ms - a_ms;
    });

    const recent: BlogPreviewData[] = blogs.filter((blog) => {
        return !blog.starred;
    }).sort((a, b) => {
        const a_ms = DateTime.fromISO(a.published).toMillis();
        const b_ms = DateTime.fromISO(b.published).toMillis()
        return b_ms - a_ms;
    });

    return {
        pinned: pinned,
        recent: recent
    };
}