import { ArticleType } from "./ArticleStorage";
import { ArticleData, ArticlePreviewData } from "../types/ArticleTypes";
import { PinnedRecentBlogs } from "../types/BlogTypes";
import { DateTime } from "luxon";

/**
 * Gets an article
 * 
 * @param id of the article
 * @param mode the type of article: blog or project
 * @returns the article
 */
export function get_article(id: string | undefined, mode: ArticleType): ArticleData | undefined {
    if (id === undefined)
        return undefined;

    const articles: ArticleData[] = get_released_articles(mode);

    const id_number: number = parseInt(id);
    if (isNaN(id_number) || id_number < 0 || id_number >= articles.length)
        return undefined;

    return articles[id_number];
}

/**
 * Gets article previews
 * 
 * @param mode the type of article: blog or project
 * @returns the article previews
 */
export function get_article_previews(mode: ArticleType): ArticlePreviewData[] {
    const articles: ArticleData[] = get_released_articles(mode);

    return articles.map(({ id, starred, published, image, title, description, technologies }) => ({
        id, starred, published, image, title, description, technologies
    }));
}

/**
 * Get article ids
 * 
 * @param mode the type of article: blog or project
 * @returns the article ids
 */
export function get_article_ids(mode: ArticleType): number[] {
    const articles: ArticleData[] = get_released_articles(mode);
    return articles.map(article => article.id);
}

/**
 * Get the carousel preview projects
 * 
 * @returns projects
 */
export function get_carousel_previews(): ArticlePreviewData[] {
    const MAX_PROJECTS = 10;
    
    const projects: ArticleData[] = get_released_articles(ArticleType.project);
    const starred_projects: ArticleData[] = projects.filter((project) => project.starred);
    let remaining_starred_projects: number = starred_projects.length;

    const carousel_preview: ArticleData[] = [];
    for (let i = 0; i < MAX_PROJECTS && i < projects.length; ++i) {
        if (i + remaining_starred_projects >= MAX_PROJECTS) {
            carousel_preview.push(...starred_projects.slice(starred_projects.length - remaining_starred_projects));
            break;
        }

        const project: ArticleData = projects[i];
        if (project.starred) --remaining_starred_projects;
        carousel_preview.push(project);
    }

    return carousel_preview.map((project) => {
        return {
            id: project.id,
            starred: project.starred,
            published: project.published,
            image: project.image,
            title: project.title,
            description: project.description,
            technologies: project.technologies
        } as ArticlePreviewData;
    });
}

/**
 * Gets pinned and recent blogs
 * 
 * @returns pinned and recent blogs
 */
export function get_pinned_and_recent(): PinnedRecentBlogs {
    const blogs: ArticleData[] = get_released_articles(ArticleType.blog);

    const pinned: ArticleData[] = blogs.filter(blog => blog.starred);
    const recent: ArticleData[] = blogs.filter(blog => !blog.starred);

    return {
        pinned: pinned,
        recent: recent
    } as PinnedRecentBlogs;
}

/**
 * Gets the released articles
 * 
 * @param mode the type of article: blog or project
 * @returns articles
 */
function get_released_articles(mode: ArticleType): ArticleData[] {
    const now: DateTime = DateTime.now();
    const articles: ArticleData[] = (mode === ArticleType.blog) ? blogs : projects;
    return articles.filter(article => now >= DateTime.fromISO(article.published));
}

// ---------------------- Projects ------------------------

import {
    UWOpenRecRosterProject
} from "../projects/UWOpenRecRoster";

const projects: ArticleData[] = [
    UWOpenRecRosterProject
];

// ---------------------- Blogs ---------------------------

import { 
    TheImportanceOfPlanningBlog
} from "../blogs/The-Importance-Of-Planning";

const blogs: ArticleData[] = [
    TheImportanceOfPlanningBlog
];