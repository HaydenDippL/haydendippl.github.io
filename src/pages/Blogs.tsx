import { useEffect, useState } from "react";

import dummy_image from "../assets/dummy-image.png";

type Card = {
    img: HTMLImageElement | null;
    title: string;
    subtitle: string;
    date_created: Date;
};

export default function Blogs() {
    const [cards, set_cards] = useState<JSX.Element[] | null>(null);

    useEffect(get_cards, []);

    function get_cards(): void {
        const card: JSX.Element = <div className="card bg-base-100 w-80 shadow-xl shrink-0 transform transition-transform duration-300 hover:scale-110">
            <figure>
                <img
                    src={dummy_image}
                    alt="Dummy Image" />
            </figure>
            <div className="card-body bg-base-200 rounded-b-2xl">
                <h2 className="card-title">Dummy</h2>
                <p>This is dummy text</p>
            </div>
        </div>;

        const cards: JSX.Element[] = Array.from({ length: 10}, () => card);

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