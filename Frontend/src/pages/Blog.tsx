import { useEffect, useState } from "react"
import { Link, useParams } from "react-router";

import { DateTime } from "luxon";

import { get_blog } from "../scripts/Blogs";

// import BlogCard from "../components/BlogCard";
import { BlogData, BlogDataProps } from "../types/BlogTypes";

// import dinosaur_image from "../assets/dino-scene.png";
// import coming_soon_image from "../assets/coming-soon.png"
import SkeletonText, { SkeletonTextProps } from "../components/SkeletonText";
import { ArticleType, article_is_viewed_in_local_storage, set_article_memory_in_local_storage } from "../scripts/ArticleStorage";

export default function Blog() {
    const { id } = useParams();
    const [blog, set_blog] = useState<BlogData | undefined>(undefined);
    const [not_found, set_not_found] = useState<boolean>(false);

    useEffect(() => {
        set_not_found(false);
        set_blog(undefined);
        const requested_blog: BlogData | undefined = get_blog(id);
        if (requested_blog == undefined) set_not_found(true);
        else set_blog(requested_blog);
    }, [id]);

    if (not_found)
        return <BlogNotFound />
    
    return <div className="flex flex-col justify-center items-center w-full max-md:mt-8">
        <div className="flex flex-col w-fill items-center p-4">
                <BlogContent {...blog} />
        </div>
    </div>
}

function BlogContent(blog: BlogDataProps): JSX.Element {
    if (
        blog.id === undefined ||
        blog.title === undefined ||
        blog.description === undefined ||
        blog.starred === undefined ||
        blog.created === undefined ||
        blog.modified === undefined ||
        blog.published === undefined ||
        blog.image === undefined ||
        blog.content === undefined
    ) return <BlogSkeleton />

    const [new_blog, set_new_blog] = useState<boolean>(false);

    useEffect(() => {
        const blog_is_new: boolean = !article_is_viewed_in_local_storage(blog.id as number, ArticleType.blog);
        set_new_blog(blog_is_new);
        if (blog_is_new) {
            set_article_memory_in_local_storage(blog.id as number, true, ArticleType.blog);
        }
    }, []);

    const viewed: Boolean = !new_blog;
    const color: string = viewed ? "bg-primary" : "bg-secondary";
    const mask: string = blog.starred ? "mask mask-star-2" : "mask mask-circle";
    const display: boolean = !viewed || blog.starred;
    const badge_element: JSX.Element = <div className={`absolute -top-6 -right-6 w-12 h-12 ${color} ${mask}`} />;
    const date_published: string = DateTime.fromISO(blog.published).toFormat("LLL d, y");
    const date_modified: string = DateTime.fromISO(blog.modified).toFormat("t ZZZZ, LLL d, y");
    const display_modified_date: boolean = blog.created !== blog.modified;

    return <div className="flex flex-col w-[90%] md:w-[80%] xl:[50%] items-start">
        <div id="feature-image" className="relative">
            <img src={blog.image} className="rounded-xl" />
            { display && badge_element }
        </div>
        <div className="px-2">
            <p id="title" className="text-4xl md:text-6xl font-bold mt-8">{blog.title}</p>
            <p id="sub-title" className="text-2xl md:text-3xl font-normal mt-8">{blog.description}</p>
            <div id="dates" className="mt-6 mb-16">
                <p id="date-created" className="text-md md:text-xl mt-6">Published: { date_published }</p>
                { display_modified_date && <p id="date-edited" className="text-xl">Edited: { date_modified }</p> }
            </div>
            <div className="prose prose-md md:prose-lg xl:prose-xl">
                { blog.content }
            </div>
        </div>
    </div>
}

function BlogSkeleton(): JSX.Element {
    const skeleton_title_params: SkeletonTextProps = {
        min_lines: 1,
        max_lines: 1.8,
        min_line_width: 80,
        min_last_line_width: 40,
        tailwind_height_class: "h-[3.75rem]"
    };

    const skeleton_description_params: SkeletonTextProps = {
        min_lines: 0.5,
        max_lines: 1.9,
        min_line_width: 80,
        min_last_line_width: 20,
        tailwind_height_class: "h-[1.875rem]"
    };

    const skeleton_date_params: SkeletonTextProps = {
        min_lines: 1,
        max_lines: 1,
        min_line_width: 80,
        min_last_line_width: 0,
        tailwind_height_class: "h-[1.25rem]"
    };

    const skeleton_text_params: SkeletonTextProps = {
        min_lines: 6.2,
        max_lines: 10.2,
        min_line_width: 80,
        min_last_line_width: 20,
        tailwind_height_class: "h-[1.875rem]"
    };

    return <div className="w-full">
        <div id="feature-image-skeleton" className="h-96 w-fill skeleton" />
        <div className="px-2">
            <div id="title-skeleton" className="mt-8 flex flex-col gap-[1rem]"><SkeletonText {...skeleton_title_params} /></div>
            <div id="description-skeleton" className="mt-8 flex flex-col gap-[0.75rem]"><SkeletonText {...skeleton_description_params} /></div>
            <div id="date-skeleton" className="mt-6 mb-16 flex flex-col gap-[1.25rem]"><SkeletonText {...skeleton_date_params} /></div>
            <div className="flex flex-col gap-[3rem]">
                <div className="flex flex-col gap-[0.755rem]"><SkeletonText {...skeleton_text_params} /></div>
                <div className="flex flex-col gap-[0.75rem]"><SkeletonText {...skeleton_text_params} /></div>
                <div className="flex flex-col gap-[0.75rem]"><SkeletonText {...skeleton_text_params} /></div>
            </div>
        </div>
    </div>
}

function BlogNotFound(): JSX.Element {
    return <div className="text-2xl font-bold pl-6">
        <p>404: Blog Not Found :(</p>
        <p>This blog doesn't exist, but I bet it would be pretty cool...</p>
        <p>Try going <Link to="/home" className="underline text-primary">Home</Link> or finding different <Link to="/blogs" className="underline text-primary">Blogs</Link></p>
    </div>
}