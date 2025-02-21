import { useEffect, useState } from "react"
import { useParams } from "react-router";

import { BlogData } from "../types/BlogTypes";

import ArticleContent, { ArticleNotFound } from "../components/ArticleContent";
import { ArticleType } from "../types/ArticleTypes";
import { get_article } from "../scripts/Articles";

export default function Blog() {
    const { id } = useParams();
    const [blog, set_blog] = useState<BlogData | undefined>(undefined);

    useEffect(() => {
        set_blog(get_article(id, ArticleType.blog));
    }, [id]);

    if (blog === undefined)
        return <ArticleNotFound mode={ArticleType.blog} />
    
    return <div className="flex flex-col justify-center items-center w-full max-md:mt-8">
        <ArticleContent mode={ArticleType.blog} article={blog} />
    </div>
}