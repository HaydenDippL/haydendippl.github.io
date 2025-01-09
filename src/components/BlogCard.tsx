import { BlogPreviewData } from "../types/BlogTypes";

export default function BlogCard({ blog_id, starred, image_source, title, description }: BlogPreviewData) {
    /// TODO: implement cache / cookies, account for the no_next / no_prev cards and don't display badges for them
    blog_id;
    const viewed: Boolean = Math.random() > 0.5;
    const color: string = viewed ? "bg-primary" : "bg-secondary";
    const mask: string = starred ? "mask mask-star-2 " : "mask mask-circle";
    const placement: string = starred ? "-top-3.5 -right-3.5" : "-top-2 -right-2";
    const size: string = starred ? "w-8 h-8" : "w-5 h-5"
    const display: boolean = !viewed || starred;
    const badge: JSX.Element = <div className={`absolute z-[999] ${size} ${placement} ${color} ${mask}`} />;

    return <div className="relative transform transition-transform duration-300 hover:scale-110">
        { display && badge }
        <div className="card bg-base-100 w-80 shadow-xl shrink-0">
            <figure>
                <img
                    src={image_source}
                    alt={title} />
            </figure>
            <div className="card-body bg-base-200 rounded-b-2xl">
                <p className="card-title">{title}</p>
                <p className="">{description}</p>
            </div>
        </div>
    </div>;
}