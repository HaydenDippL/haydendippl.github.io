import { useEffect, useState } from "react";
import { ArticleType, article_is_viewed_in_local_storage, set_article_memory_in_local_storage } from "../scripts/ArticleStorage";
import { DateTime } from "luxon";
import { BlogData } from "../types/BlogTypes";
import { ProjectData } from "../types/ProjectTypes";
import { Link } from "react-router";

export default function ArticleContent({ mode, article }: { mode: ArticleType, article: ProjectData | BlogData }) {
    const [new_article, set_new_article] = useState<boolean>(false);

    useEffect(() => {
        const article_is_new: boolean = !article_is_viewed_in_local_storage(article.id, mode);
        set_new_article(article_is_new);
        set_article_memory_in_local_storage(article.id, true, mode);
    }, []);

    const viewed: Boolean = !new_article;
    const color: string = viewed ? "bg-primary" : "bg-secondary";
    const mask: string = article.starred ? "mask mask-star-2" : "mask mask-circle";
    const display: boolean = !viewed || article.starred;
    const badge_element: JSX.Element = <div className={`absolute -top-6 -right-6 w-12 h-12 ${color} ${mask}`} />;
    const date_published: string = DateTime.fromISO(article.published).toFormat("LLL d, y");
    const date_modified: string = DateTime.fromISO(article.modified).toFormat("t ZZZZ, LLL d, y");
    const display_modified_date: boolean = article.created !== article.modified;

    return <div className="flex flex-col w-[90%] md:w-[80%] xl:[50%] items-start">
        <div id="feature-image" className="relative">
            <img src={article.image} className="rounded-xl" />
            { display && badge_element }
        </div>
        <div className="px-2">
            <p id="title" className="text-4xl md:text-6xl font-bold mt-8">{article.title}</p>
            <p id="sub-title" className="text-2xl md:text-3xl font-normal mt-8">{article.description}</p>
            <div id="dates" className="mt-6 mb-16">
                <p id="date-created" className="text-md md:text-xl mt-6">Published: { date_published }</p>
                { display_modified_date && <p id="date-edited" className="text-xl">Edited: { date_modified }</p> }
            </div>
            <div className="prose prose-md md:prose-lg xl:prose-xl">
                { article.content }
            </div>
        </div>
    </div>
}

export function ArticleNotFound({ mode }: { mode: ArticleType}): JSX.Element {
    if (mode === ArticleType.blog) {
        return <div className="text-2xl font-bold pl-6">
            <p>404: Blog Not Found :(</p>
            <p>This blog doesn't exist, but I bet it would be pretty cool...</p>
            <p>Try going <Link to="/home" className="underline text-primary">Home</Link> or finding different <Link to="/blogs" className="underline text-primary">Blogs</Link></p>
        </div>
    } else {
        return <div className="text-2xl font-bold pl-6">
            <p>404: Project Not Found :(</p>
            <p>This project doesn't exist, but I bet it would be pretty cool...</p>
            <p>Try going <Link to="/home" className="underline text-primary">Home</Link> or finding different <Link to="/projects" className="underline text-primary">Projects</Link></p>
        </div>
    }
}