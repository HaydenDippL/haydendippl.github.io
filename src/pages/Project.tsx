import { useEffect, useState } from "react";
import { useParams } from "react-router";

import ArticleContent, { ArticleNotFound } from "../components/ArticleContent";
import { get_article } from "../scripts/Articles";
import { ArticleData, ArticleType } from "../types/ArticleTypes";

export default function Project() {
    const { id } = useParams();
    const [project, set_project] = useState<ArticleData | undefined>(undefined);

    useEffect(() => {
        set_project(get_article(id, ArticleType.project));
    }, [id]);

    if (project === undefined) {
        return <ArticleNotFound mode={ArticleType.project} />
    }

    return <div className="flex flex-col justify-center items-center w-full max-md:mt-8">
        <ArticleContent mode={ArticleType.project} article={project} />
    </div>
}