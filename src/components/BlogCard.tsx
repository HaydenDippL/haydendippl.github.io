import { Link } from "react-router";
import { useState, useEffect } from "react";

import { article_is_viewed_in_local_storage } from "../scripts/ArticleStorage";
import { ArticleType } from "../types/ArticleTypes";

import { BlogPreviewProps } from "../types/BlogTypes";

export default function BlogCard(blog_preview: BlogPreviewProps) {
    if (
        blog_preview.id === undefined ||
        blog_preview.starred === undefined ||
        blog_preview.published === undefined ||
        blog_preview.image === undefined ||
        blog_preview.title === undefined ||
        blog_preview.description === undefined
    ) return <></>

    const [image_loading, set_image_loading] = useState<boolean>(true);
    const [image_src, set_image_src] = useState<string>("");

    useEffect(() => {
        if (blog_preview.image === undefined) return

        const img = new Image();
        img.src = blog_preview.image;
        img.onload = () => {
            if (blog_preview.image)
                set_image_src(blog_preview.image);
            set_image_loading(false);
        };
    }, [blog_preview.image]);

    const viewed: Boolean = article_is_viewed_in_local_storage(blog_preview.id as number, ArticleType.blog);
    const color: string = viewed ? "bg-primary" : "bg-secondary";
    const mask: string = blog_preview.starred ? "mask mask-star-2 " : "mask mask-circle";
    const placement: string = blog_preview.starred ? "-top-3.5 -right-3.5" : "-top-2 -right-2";
    const size: string = blog_preview.starred ? "w-8 h-8" : "w-5 h-5"
    const display: boolean = !viewed || blog_preview.starred;
    const badge: JSX.Element = <div className={`absolute z-[999] ${size} ${placement} ${color} ${mask}`} />;

    return <Link to={`/blog/${blog_preview.id}`} className="relative transform transition-transform duration-300 hover:scale-110">
        { display && badge }
        <div className="card bg-base-100 w-80 shadow-xl shrink-0">
            <figure>
                { image_loading && <div className="w-full h-48 skeleton rounded-b-none" /> }
                { !image_loading && <img
                    src={image_src}
                    alt={blog_preview.title}    
                /> }
            </figure>
            <div className="card-body bg-base-200 rounded-b-2xl">
                <p className="card-title">{blog_preview.title}</p>
                <p className="">{blog_preview.description}</p>
            </div>
        </div>
    </Link>
}
