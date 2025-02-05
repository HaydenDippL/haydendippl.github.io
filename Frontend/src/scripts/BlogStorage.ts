const BLOG_MEMORY_KEY: string = "BLOG_MEMORY";

export const BLOG_NOT_VIEWED: string = "0";
export const BLOG_VIEWED: string = "1";

export function get_blogs_from_local_storage(): string {
    return localStorage.getItem(BLOG_MEMORY_KEY) || "";
}

export function blog_is_viewed_in_local_storage(id: number): boolean {
    const blog_memory: string = get_blogs_from_local_storage();

    if (id >= blog_memory.length) return false;
    else return blog_memory[id] == BLOG_VIEWED;
}

export function blog_is_viewed(blog_memory: string, id: number): boolean {
    if (id >= blog_memory.length) return false;
    else return blog_memory[id] == BLOG_VIEWED;
}

export function set_blog_in_local_storage(id: number, viewed: true): string {
    let blog_memory: string = get_blogs_from_local_storage();

    // add any needed extra characters
    const extra_characters_needed = Math.max(0, id - blog_memory.length + 1);
    blog_memory += BLOG_NOT_VIEWED.repeat(extra_characters_needed);

    // change blog_memory[id] to BLOG_VIEWED
    const state = (viewed) ? BLOG_VIEWED : BLOG_NOT_VIEWED;
    blog_memory = blog_memory.substring(0, id) + state + blog_memory.substring(id + 1);
    set_blogs_in_local_storage(blog_memory);
    return blog_memory;
}

export function set_blogs(blog_memory: string, id: number, viewed: true): string {
    // add any needed extra characters
    const extra_characters_needed = Math.max(0, id - blog_memory.length + 1);
    blog_memory += BLOG_NOT_VIEWED.repeat(extra_characters_needed);

    // change blog_memory[id] to BLOG_VIEWED
    const state = (viewed) ? BLOG_VIEWED : BLOG_NOT_VIEWED;
    blog_memory = blog_memory.substring(0, id) + state + blog_memory.substring(id + 1);
    set_blogs_in_local_storage(blog_memory);
    return blog_memory;
}

export function set_blogs_in_local_storage(blog_memory: string): void {
    localStorage.setItem(BLOG_MEMORY_KEY, blog_memory);
}