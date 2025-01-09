import { useEffect, useState } from "react";

import BlogCard from "../components/BlogCard";
import { BlogPreviewData } from "../types/BlogTypes";

import dummy_image from "../assets/dummy-image.png";

export default function Blogs() {
    const [cards, set_cards] = useState<JSX.Element[] | null>(null);

    useEffect(get_cards, []);

    function get_cards(): void {
        const DUMMY_BLOG_PREVIEW: BlogPreviewData = {
            blog_id: 90120,
            starred: true,
            image_source: dummy_image,
            title: "Trying Django for the First Time",
            description: "Implementing Django as the backend for this website",
        };

        const cards: JSX.Element[] = Array.from({ length: 10}, (_, i) => {
            return <BlogCard
                key={i}
                blog_id={DUMMY_BLOG_PREVIEW.blog_id}
                starred={Math.random() > 0.5}
                image_source={DUMMY_BLOG_PREVIEW.image_source}
                title={DUMMY_BLOG_PREVIEW.title}
                description={DUMMY_BLOG_PREVIEW.description}
            />;
        });

        set_cards(cards);
    }

    return <>
        <div className="flex flex-col items-center">
            <p className="text-6xl font-semibold">Blogs</p>
            <p className="text-xl font-medium">Check in <span className="font-semibold text-primary">every week</span> for a <span className="font-semibold text-secondary">new</span> article!</p>
            <div className="flex justify-center">
                <div id="blog-gallery" className="w-3/4 flex flex-row flex-wrap justify-center gap-6 mt-8">
                    { cards }
                </div>
            </div>
        </div>
    </>
}