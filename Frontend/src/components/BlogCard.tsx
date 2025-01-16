import { Link } from "react-router";

import { BlogPreviewProps } from "../types/BlogTypes";

import SkeletonText from "./SkeletonText";
import { SkeletonTextProps } from "./SkeletonText";

export default function BlogCard({id, starred, image, title, description}: BlogPreviewProps) {
    if (id === undefined || starred === undefined || image === undefined || title === undefined || description === undefined) 
        return <SkeletonBlogCard />

    /// TODO: implement cache / cookies, account for the no_next / no_prev cards and don't display badges for them
    const viewed: Boolean = Math.random() > 0.5;
    const color: string = viewed ? "bg-primary" : "bg-secondary";
    const mask: string = starred ? "mask mask-star-2 " : "mask mask-circle";
    const placement: string = starred ? "-top-3.5 -right-3.5" : "-top-2 -right-2";
    const size: string = starred ? "w-8 h-8" : "w-5 h-5"
    const display: boolean = !viewed || starred;
    const badge: JSX.Element = <div className={`absolute z-[999] ${size} ${placement} ${color} ${mask}`} />;

    return <Link to={`/blog/${id}`} className="relative transform transition-transform duration-300 hover:scale-110">
        { display && badge }
        <div className="card bg-base-100 w-80 shadow-xl shrink-0">
            <figure>
                <img
                    src={image}
                    alt={title} />
            </figure>
            <div className="card-body bg-base-200 rounded-b-2xl">
                <p className="card-title">{title}</p>
                <p className="">{description}</p>
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