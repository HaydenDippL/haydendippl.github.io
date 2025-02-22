import { useEffect, useState } from "react";
import { Link } from "react-router";

import TechBadge from "./TechBadge";

import { article_is_viewed_in_local_storage } from "../scripts/ArticleStorage";
import { ArticleType } from "../types/ArticleTypes";

import { ProjectPreviewData } from "../types/ProjectTypes";

export default function ProjectCard({ id, starred, published, image, title, description, technologies }: ProjectPreviewData) {
    id; starred; published; image; title; description; technologies;

    const [image_loading, set_image_loading] = useState<boolean>(true);
    const [image_src, set_image_src] = useState<string>("");

    useEffect(() => {
        if (image === undefined) return

        const img = new Image();
        img.src = image;
        img.onload = () => {
            if (image)
                set_image_src(image);
            set_image_loading(false);
        };
    }, [image]);

    const viewed: Boolean = article_is_viewed_in_local_storage(id, ArticleType.project);
    const color: string = viewed ? "bg-primary" : "bg-secondary";
    const mask: string = starred ? "mask mask-star-2 " : "mask mask-circle";
    const placement: string = starred ? "-top-3.5 -right-3.5" : "-top-2 -right-2";
    const size: string = starred ? "w-8 h-8" : "w-5 h-5"
    const display: boolean = !viewed || starred;
    const badge: JSX.Element = <div className={`absolute z-[999] ${size} ${placement} ${color} ${mask}`} />;

    return <Link to={`/project/${id}`} className="relative">
        <div className="card bg-base-100 image-full w-80 md:w-96 shadow-xl transform transition-transform duration-300 hover:scale-110">
            { display && badge }
            <figure>
                { image_loading && <div className="w-full h-48 skeleton rounded-b-none" /> }
                { !image_loading && <img
                    className="filter blur-sm grayscale-[20%]"
                    src={image_src}
                    alt={title}
                /> }
            </figure>
            <div className="card-body text-white">
                <h2 className="card-title text-white">{title}</h2>
                <p>{description}</p>
                <div className="flex flex-row gap-1">
                    { technologies.map((tech, i) => <TechBadge key={i} tech={tech} />) }
                </div>
            </div>
        </div>
    </Link>
}