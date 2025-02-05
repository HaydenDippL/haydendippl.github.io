import { createContext, useState, useEffect } from "react";
import { get_blogs_from_local_storage, set_blogs_in_local_storage } from "../scripts/BlogStorage";

type BlogViewContextType = {
    blog_memory: string,
    set_blog_memory: React.Dispatch<React.SetStateAction<string>>,
};

export const BlogsViewedContext = createContext<BlogViewContextType>({
    blog_memory: "",
    set_blog_memory: () => {} // noop function if no provider is found
});

export default function BlogsViewedContextProvider({ children }: { children: React.ReactNode }) {
    const [blog_memory, set_blog_memory] = useState<string>(get_blogs_from_local_storage());

    useEffect(() => {
        set_blogs_in_local_storage(blog_memory);
    }, [blog_memory]);

    return <BlogsViewedContext.Provider value={{ blog_memory, set_blog_memory }}>
        { children }
    </BlogsViewedContext.Provider>
}