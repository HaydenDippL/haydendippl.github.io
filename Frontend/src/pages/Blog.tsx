import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { NavigateFunction, useNavigate } from "react-router";

import { DateTime } from "luxon";

import BlogCard from "../components/BlogCard";
import { BlogData, BlogDataProps } from "../types/BlogTypes";

import dinosaur_image from "../assets/dino-scene.png";
import coming_soon_image from "../assets/coming-soon.png"
import SkeletonText, { SkeletonTextProps } from "../components/SkeletonText";

const coming_soon: JSX.Element = <BlogCard
    id={-2}
    starred={false}
    image={coming_soon_image}
    title=" Next Blog Coming Soon"
    description="I post these blogs about once a week, check back in a couple of days"
/>

const beginning_of_time: JSX.Element = <BlogCard
    id={-1}
    starred={false}
    image={dinosaur_image}
    title="There are no previous blogs"
    description="You reached the beginning of time, say hi to the dinosaurs"
/>

export default function Blog() {
    const { id } = useParams();
    const [blog, set_blog] = useState<BlogData | undefined>(undefined);
    const navigator: NavigateFunction = useNavigate();

    useEffect(() => {
        set_blog(undefined);
        get_blog()
    }, [id]);

    function get_blog(): void {
        const url = `${import.meta.env.VITE_BACKEND_URL}/blog/${id}?next=true&prev=true`;
        fetch(url)
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json();
                } else if (resp.status === 404) {
                    navigator("/blog/not-found");
                    return Promise.reject("404 Not Found");
                }
            })
            .then((blog_data: BlogData) => set_blog(blog_data))
            .catch(error => console.error(error)); // FIXME: more comprehensive catch
    }

    // TODO: implement next and prev, not dummy values...
    return <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col w-7/12 items-start">
            <BlogContent {...blog} />
        </div>
        <div id="post-blog" className="flex flex-col w-7/12 ml-[-5%] mt-10 items-center gap-1">
            <div className="divider w-[110%]" />
            <div className="flex flex-col items-center gap-1 text-4xl mb-8">
                <p>Check out the</p>
                <p><span className="text-primary font-bold">next</span> and <span className="text-secondary font-bold">prev</span></p>
                <p>blogs</p>
            </div>
            <div className="flex flex-row gap-16">
                { blog && blog.next === null ? coming_soon : <BlogCard {...blog?.next} /> }
                { blog && blog.prev === null ? beginning_of_time : <BlogCard {...blog?.prev} />}
            </div>
        </div>
    </div>;
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

    const viewed: Boolean = true; // FIXME: modify for testing purposes
    const color: string = viewed ? "bg-primary" : "bg-secondary";
    const mask: string = blog.starred ? "mask mask-star-2" : "mask mask-circle";
    const display: boolean = !viewed || blog.starred;
    const badge_element: JSX.Element = <div className={`absolute -top-6 -right-6 w-12 h-12 ${color} ${mask}`} />;
    const date_published: string = DateTime.fromISO(blog.published).toFormat("LLL d, y");
    const date_modified: string = DateTime.fromISO(blog.modified).toFormat("t ZZZZ, LLL d, y");
    const display_modified_date: boolean = blog.created !== blog.modified;

    const image_source: string = `${import.meta.env.VITE_BACKEND_URL}/${blog.image}`

    return <>
        <div id="feature-image" className="relative">
            <img src={image_source} className="rounded-xl relative w-auto" />
            { display && badge_element }
        </div>
        <div className="px-2">
            <p id="title" className="text-6xl font-bold mt-8">{blog.title}</p>
            <p id="sub-title" className="text-3xl font-normal mt-8">{blog.description}</p>
            <div id="dates" className="mt-6 mb-16">
                <p id="date-created" className="text-xl mt-6">Published: { date_published }</p>
                { display_modified_date && <p id="date-edited" className="text-xl">Edited: { date_modified }</p> }
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog.content}} />
        </div>
    </>
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