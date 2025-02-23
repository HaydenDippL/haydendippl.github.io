import { Link } from "react-router";
import { useEffect, useState } from "react";

import { new_articles_exist } from "../scripts/ArticleStorage";
import { ArticleType } from "../types/ArticleTypes";
import { log_referring_to } from "../scripts/Logging";

import { useNavigate } from "react-router";

import { ExternalLink } from "../scripts/ExternalLinks";

export default function Navbar() {
    const [new_blogs, set_new_blogs] = useState<boolean>(new_articles_exist(ArticleType.blog));
    const [new_projects, set_new_projects] = useState<boolean>(new_articles_exist(ArticleType.project));

    useEffect(() => {
        const handleArticleViewed = () => {
            set_new_blogs(new_articles_exist(ArticleType.blog));
            set_new_projects(new_articles_exist(ArticleType.project));
        };
        
        window.addEventListener('articleViewed', handleArticleViewed);
        return () => window.removeEventListener('articleViewed', handleArticleViewed);
    }, []);

    const navigate = useNavigate();
    
    const new_article_badge: JSX.Element = <div className={`absolute z-[999] w-5 h-5 -top-2 -right-2 bg-secondary mask mask-circle`} />

    return <div className="">
        <div id="navbar" className="fixed w-full flex flex-row justify-center lg:justify-between gap-2 p-4 bg-base-100/90 border-b border-b-black pt-8 z-[9999]">
            <div className="flex flex-row gap-20 hidden lg:block">
                <Link to="/" className="text-4xl font-semibold">
                    HaydenDippL
                </Link>
            </div>
            <div className="flex flex-row gap-24 justify-center w-full md:w-auto">
                <div id="nav-links" className="flex flex-row gap-2 sm:gap-4 md:gap-8 items-center">
                    <button
                        id="home-link"
                        className="btn btn-default font-semibold text-2xl md:text-3xl"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>
                    <button
                        id="blogs-link"
                        className="btn btn-default relative font-semibold text-2xl md:text-3xl"
                        onClick={() => navigate("/blogs")}
                    >
                        Blogs
                        { new_blogs && new_article_badge }
                    </button>
                    <button
                        id="projects-link"
                        className="btn btn-default relative font-semibold text-2xl md:text-3xl"
                        onClick={() => navigate("/projects")}
                    >
                        Projects
                        { new_projects && new_article_badge }
                    </button>
                </div>
                <div id="social-links" className="flex flex-row gap-2 hidden md:inline-flex">
                    <div id="GitHub" className="opacity-10 cursor-pointer" onClick={() => {
                        log_referring_to("GitHub");
                        window.open(ExternalLink.GitHub);
                    }}>
                        <svg viewBox="0 0 24 24" width="50px" height="50px">
                            <path
                                d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"
                                stroke="rgb(255, 255, 255)"
                                fill="rgb(255, 255, 255)"
                            />
                        </svg>
                    </div>
                    <div id="LinkedIn" className="opacity-10 cursor-pointer" onClick={() => {
                        log_referring_to("LinkedIn");
                        window.open(ExternalLink.LinkedIn);
                    }}>
                        <svg viewBox="0 0 30 30" width="50px" height="50px">
                            <path
                                d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"
                                stroke="rgb(255, 255, 255)"
                                fill="rgb(255, 255, 255)"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
}