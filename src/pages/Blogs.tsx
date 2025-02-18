import { useEffect, useState } from "react";

import { get_blog_previews } from "../scripts/Blogs";

import BlogCard from "../components/BlogCard";
import { BlogPreviewData } from "../types/BlogTypes";

const total_skeleton_elements: number = 8;
const skeleton: JSX.Element[] = Array.from({ length: total_skeleton_elements }).map((_, i) => <BlogCard key={i} />);

export default function Blogs() {

    const [cards, set_cards] = useState<JSX.Element[]>(skeleton);

    useEffect(() => {
        const blog_previews: BlogPreviewData[] = get_blog_previews();
        const blog_cards: JSX.Element[] = blog_previews.map((blog_preview, i) => {
            return <BlogCard key={i} {...blog_preview} />
        });

        set_cards(blog_cards);
    }, []);

    return <>
        <div className="flex flex-col items-center">
            <p className="text-6xl font-semibold">Blogs</p>
            <p className="text-xl font-medium p-4 text-center">Check in <span className="font-semibold text-primary">every week</span> for a <span className="font-semibold text-secondary">new</span> article!</p>
            <div className="flex justify-center w-full">
                <div id="blog-gallery" className="w-3/4 flex flex-row flex-wrap justify-center gap-6 mt-8">
                    { cards }
                </div>
            </div>
        </div>
    </>
}