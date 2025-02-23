import { useEffect, useState } from "react";

import BlogCard from "../components/BlogCard";
import { get_article_previews } from "../scripts/Articles";
import { ArticleType } from "../types/ArticleTypes";

function get_cards(): JSX.Element[] {
    return get_article_previews(ArticleType.blog)
        .map((blog_preview, i) => <BlogCard key={i} {...blog_preview} />)
}

export default function Blogs() {

    const [cards, set_cards] = useState<JSX.Element[]>(get_cards());

    useEffect(() => {
        set_cards(get_cards());
    }, []);

    return <div className="flex flex-col items-center">
        <p className="text-6xl font-semibold">Blogs</p>
        <p className="text-xl font-medium p-4 text-center">Check in <span className="font-semibold text-primary">every month</span> for a <span className="font-semibold text-secondary">new</span> article!</p>
        <div className="flex justify-center w-full">
            <div id="blog-gallery" className="w-3/4 flex flex-row flex-wrap justify-center gap-6 mt-8">
                { cards }
            </div>
        </div>
    </div>
}