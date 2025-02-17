import { get_blog_ids } from "./Blogs";
import { get_project_ids } from "./Projects";

const BLOG_MEMORY_KEY: string = "BLOG_MEMORY";
const PROJECT_MEMORY_KEY: string = "PROJECT_MEMORY";

export enum ArticleType {
    "blog",
    "project"
}

export const NOT_VIEWED: string = "0";
export const VIEWED: string = "1";

function get_article_memory_from_local_storage(mode: ArticleType): string {
    const memory_key = (mode === ArticleType.blog) ? BLOG_MEMORY_KEY : PROJECT_MEMORY_KEY;
    return localStorage.getItem(memory_key) || "";
}

export function article_is_viewed_in_local_storage(id: number, mode: ArticleType): boolean {
    const memory: string = get_article_memory_from_local_storage(mode);

    if (id >= memory.length) return false;
    else return memory[id] == VIEWED;
}

export function set_article_memory_in_local_storage(id: number, viewed: true, mode: ArticleType): boolean {
    let memory: string = get_article_memory_from_local_storage(mode);

    // add any needed extra characters
    const extra_characters_needed = Math.max(0, id - memory.length + 1);
    memory += NOT_VIEWED.repeat(extra_characters_needed);

    // change memory[id] to BLOG_VIEWED
    const state = (viewed) ? VIEWED : NOT_VIEWED;
    memory = memory.substring(0, id) + state + memory.substring(id + 1);

    let successfully_set: boolean = false;
    try {
        localStorage.setItem(BLOG_MEMORY_KEY, memory);
        successfully_set = true;
    } catch (e) {
        console.error(e);
        successfully_set = false;
    }

    return successfully_set
}

export function new_articles_exist(mode: ArticleType): boolean {
    const memory: string = get_article_memory_from_local_storage(mode);
    const num_articles: number = (mode === ArticleType.blog) ? get_blog_ids().length : get_project_ids().length;
    if (num_articles > memory.length) return true;
    return Array.from(memory).some((article) => article === NOT_VIEWED);
}