import { useEffect, useState } from "react";

import BlogCard from "../components/BlogCard";
import { BlogData } from "../types/BlogTypes";

const total_skeleton_elements: number = 8;
const skeleton: JSX.Element[] = Array.from({ length: total_skeleton_elements }).map((_, i) => <BlogCard key={i} />);

export default function Blogs() {

    const [cards, set_cards] = useState<JSX.Element[]>(skeleton);

    useEffect(get_cards, []);

    function get_cards(): void {
        const url = `${import.meta.env.VITE_BACKEND_URL}/blogs?preview=true`;

        fetch(url)
            .then(resp => resp.json())
            .then((data: BlogData[]) => {
                const cards = data.map((blog, i) => {
                    return <BlogCard
                        key={i}
                        id={blog.id}
                        title={blog.title}
                        description={blog.description}
                        starred={blog.starred}
                        image={`${import.meta.env.VITE_BACKEND_URL}/${blog.image}`}
                    />;
                });

                set_cards(cards);
            });
            // TODO: catch error
    }

    return <>
        <div className="flex flex-col items-center">
            <p className="text-6xl font-semibold">Blogs</p>
            <p className="text-xl font-medium">Check in <span className="font-semibold text-primary">every week</span> for a <span className="font-semibold text-secondary">new</span> article!</p>
            <div className="flex justify-center w-full">
                <div id="blog-gallery" className="w-3/4 flex flex-row flex-wrap justify-center gap-6 mt-8">
                    { cards }
                </div>
            </div>
        </div>
    </>
}