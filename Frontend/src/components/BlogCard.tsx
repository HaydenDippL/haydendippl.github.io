import { Link } from "react-router";
import { useState, useEffect } from "react";

import { BlogPreviewProps } from "../types/BlogTypes";

import SkeletonText from "./SkeletonText";
import { SkeletonTextProps } from "./SkeletonText";

export default function BlogCard(blog_preview: BlogPreviewProps) {
    if (
        blog_preview.id === undefined ||
        blog_preview.starred === undefined ||
        blog_preview.published === undefined ||
        blog_preview.image === undefined ||
        blog_preview.title === undefined ||
        blog_preview.description === undefined
    ) return <SkeletonBlogCard />

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

    /// TODO: implement cache / cookies, account for the no_next / no_prev cards and don't display badges for them
    const viewed: Boolean = Math.random() > 0.5;
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

function SkeletonBlogCard() {
    const skeleton_title_params: SkeletonTextProps = {
        min_lines: 1,
        max_lines: 1.8,
        min_line_width: 80,
        min_last_line_width: 40,
        tailwind_height_class: "h-6"
    }

    const skeleton_text_params: SkeletonTextProps = {
        min_lines: 1.2,
        max_lines: 3.2,
        min_line_width: 80,
        min_last_line_width: 20,
        tailwind_height_class: "h-4"
    }

    return <div
            className="relative transform transition-transform duration-300 hover:scale-110"
        >
            <div className="card bg-base-100 w-80 shadow-xl shrink-0">
                <div className="w-full h-48 skeleton rounded-b-none" />
                <div className="card-body bg-base-200 rounded-b-2xl">
                    <div className="flex flex-col mb-3 gap-3">
                        <SkeletonText {...skeleton_title_params} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <SkeletonText {...skeleton_text_params} />
                    </div>
                </div>
            </div>
        </div>;
}