import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArticlePreviewData, ArticleType } from "../types/ArticleTypes";
import { get_article_previews } from "../scripts/Articles";
import BlogCard from "../components/BlogCard";
import ProjectCard from "../components/ProjectCard";
import { is_tech, Tech, TechBadgeSize } from "../types/TechTypes";
import { DateTime } from "luxon";
import TechBadge from "../components/TechBadge";

export default function Articles() {
    const { query } = useParams();
    const [articles, set_articles] = useState<JSX.Element[]>([]);
    const [message ,set_message] = useState<JSX.Element | undefined>(undefined);

    function get_article_components(query: Tech): JSX.Element[] {
        const blogs: ArticlePreviewData[] = get_article_previews(ArticleType.blog);
        const projects: ArticlePreviewData[] = get_article_previews(ArticleType.project);
        const articles: ArticlePreviewData[] = [...blogs, ...projects];
        
        return articles
            .filter(article => article.technologies.includes(query))
            .sort((a, b) => {
                const a_publish_time: number = a.published.toMillis();
                const b_publish_time: number = b.published.toMillis();
                return b_publish_time - a_publish_time;
            })
            .map((article, i) => {
                if (article.article_type === ArticleType.blog) return <BlogCard key={i} {...article} />
                else return <ProjectCard key={i} {...article} />
            })
    }

    useEffect(() => {
        if (query && is_tech(query)) {
            const article_cards: JSX.Element[] = get_article_components(query as Tech);
            if (article_cards.length <= 0) {
                set_message(<>
                    <p className="content-text mb-8">I haven't made many blog, nor posted all my projects yet :(</p>
                    <p className="content-text">... Check back soon for my <TechBadge tech={query as Tech} size={TechBadgeSize.large} /> content</p>
                </>);
                set_articles([]);
            } else {
                set_articles(article_cards);
                set_message(undefined);
            }
        } else {
            set_message(<>
                <p className="content-text text-6xl text-red-400 mb-24">This is an invalid query <span className="text-9xl">{">:("}</span></p>
                <p className="content-text">Go back to you <Link to="/" className="text-primary underline">Home</Link>!</p>
            </>);
            set_articles([]);
        }
    }, [query]);

    if (!query)
        return <ArticlesQueryInvalid />

    return <div className="flex flex-col justify-center items-center w-full max-md:mt-8">
        { message && message }
        <div id="article-gallery" className="w-3/4 flex flex-row flex-wrap justify-center gap-6 mt-8">
            { articles.length !== 0 && articles }
        </div>
    </div>
}

function ArticlesQueryInvalid() {
    return <p></p>
}