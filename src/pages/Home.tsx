import { useEffect, useState } from "react";
import { Link } from "react-router";

import profile_photo from "../assets/pfp.jpg";
import globe_icon from "../assets/globe-icon.svg"

import { get_pinned_and_recent, get_carousel_previews } from "../scripts/Articles";
import { article_is_viewed_in_local_storage } from "../scripts/ArticleStorage";
import TechButton from "../components/TechButton";
import { Tech } from "../types/TechTypes";
import Carousel from "../components/Carousel";
import ProjectCard from "../components/ProjectCard";
import { ArticleType, PinnedRecentBlogs } from "../types/ArticleTypes";
import { log_referring_to } from "../scripts/Logging";
import { ExternalLink } from "../scripts/ExternalLinks";

export default function Home() {
    const profile_picture_element: JSX.Element = <div id="Picture" className="relative w-max pb-12">
        <img className="w-80 h-80 mask mask-circle" src={profile_photo} />
        <img
            src="https://gamepedia.cursecdn.com/lolesports_gamepedia_en/e/e3/University_of_Wisconsin%E2%80%93Madisonlogo_square.png"
            alt="University of Wisconsin-Madison Logo"
            className="absolute bottom-0 right-1 w-36 h-36"
        />
    </div>

    function get_project_cards(): JSX.Element[] {
        return get_carousel_previews()
            .map((project, i) => <ProjectCard key={i} {...project} />);
    }

    const [project_cards, set_project_cards] = useState<JSX.Element[]>(get_project_cards());
    useEffect(() => {
        set_project_cards(get_project_cards());
    }, []);

    return <div className="flex flex-row w-full justify-center font-inter">
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-col items-left text-left w-[38rem] max-w-[90%] font-inter relative">
                <div className="hidden 2xl:inline-block absolute top-4 -right-96">{ profile_picture_element }</div>
                <p id="hello" className="title-text mb-3">Hi, my name is <span className="text-primary">Hayden Dippel</span></p>
                <div className="mb-8 md:mb-12">
                    <div id="location" className="flex flex-row items-center gap-2">
                        <img src={globe_icon} alt="Globe Icon" className="w-12 h-12" />
                        <p className="subtitle-text font-bold opacity-50">Madison, WI</p>
                    </div>
                    <div className="flex flex-row md:hidden">
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
                <div className="2xl:hidden">{ profile_picture_element }</div>
                <p id="intro" className="content-text mb-4">I am a full-stack developer graduating from the University of Wisconsin in the spring of 2025. I have experience with...</p>
                <div id="skills" className="content-text flex flex-wrap gap-x-3.5 gap-y-2 mb-16">
                    <TechButton tech={Tech.React} link={`/articles/${Tech.React}`}/>
                    <TechButton tech={Tech.Angular} link={`/articles/${Tech.Angular}`}/>
                    <TechButton tech={Tech.TypeScript} link={`/articles/${Tech.TypeScript}`}/>
                    <TechButton tech={Tech.Django} link={`/articles/${Tech.Django}`}/>
                    <TechButton tech={Tech.Python} link={`/articles/${Tech.Python}`}/>
                    <TechButton tech={Tech.SQL} link={`/articles/${Tech.SQL}`}/>
                    <TechButton tech={Tech.DotNET} link={`/articles/${Tech.DotNET}`}/>
                    <TechButton tech={Tech.Cpp} link={`/articles/${Tech.Cpp}`}/>
                </div>
                <p className="title-text">Check Out My <Link to="/projects" className="underline" style={{"color": "#6dfff8"}}>Projects</Link></p>
            </div>
            <Carousel items={project_cards} />
            <div className="flex flex-col items-center font-inter my-16">
                <button className="btn btn-secondary btn-lg">Download Resume</button>
            </div>
            <div className="divider w-[90%] lg:w-[70%] mx-auto mb-12" />
            <div className="flex flex-col items-left text-left w-[38rem] max-w-[90%] font-inter">
                <p className="title-text mb-12">Keep up with my <Link to="/blogs" className="underline" style={{"color": "#6dfff8"}}>Blogs</Link></p>
                <p className="content-text font-semibold mb-12">I write blogs about now tech, personal experiences, and projects. Here are some of my most recent blogs.</p>
                <BlogList />
            </div>
        </div>
    </div>
}

function BlogList(): JSX.Element {
    const [blogs, set_blogs] = useState<PinnedRecentBlogs | null>(null)
    const total_blogs: number = 5;
    const skeleton_pinned_blogs: number = 3;
    const skeleton_recent_blogs: number = total_blogs - skeleton_pinned_blogs;

    useEffect(() => {
        const pinned_and_recent_blogs: PinnedRecentBlogs = get_pinned_and_recent();
        set_blogs(pinned_and_recent_blogs);
    }, []);

    return  <div id="blogs-display" className="card bg-black bg-opacity-10 shadow-xl w-auto">
        <div className="card-body gap-4">
            <div id="pinned-blogs">
                <p className="text-xl font-semibold text-base-content/40">Pinned</p>
                <div className="flex flex-col gap-4 mt-4">
                    { blogs === null ?
                        Array.from({ length: skeleton_pinned_blogs }).map((_,i) => {return <BlogLink key={i} />}) :
                        blogs.pinned.map((blog, i) => <BlogLink key={i} id={blog.id} title={blog.title} starred={blog.starred} />)
                    }
                </div>
            </div>
            <div id="recent-blogs">
                <p className="text-xl font-semibold text-base-content/40">Recent</p>
                <div className="flex flex-col gap-4 mt-4">
                    { blogs === null ?
                        Array.from({ length: skeleton_recent_blogs }).map((_, i) => {return <BlogLink key={i} />}) :
                        blogs.recent.map((blog, i) => <BlogLink key={i} id={blog.id} title={blog.title} starred={blog.starred} />)
                    }
                </div>
            </div>
        </div>
    </div>
}

function BlogLink({ id, title, starred }: { id?: number, title?: string, starred?: boolean }): JSX.Element {
    if (id === undefined || title === undefined || starred === undefined)
        return <div className="rounded-lg bg-black bg-opacity-20 h-16 skeleton" /> 

    const new_blog: boolean = article_is_viewed_in_local_storage(id as number, ArticleType.blog);
    const color: string = new_blog ? "bg-primary" : "bg-secondary";
    const mask: string = starred ? "mask mask-star-2 " : "mask mask-circle";
    const placement: string = starred ? "-top-3.5 -right-3.5" : "-top-2 -right-2";
    const size: string = starred ? "w-8 h-8" : "w-5 h-5"
    const display: boolean = new_blog || starred;
    const badge: JSX.Element = <div className={`absolute z-[999] ${size} ${placement} ${color} ${mask}`} />;

    return <Link to={`/blog/${id}`} className="transform transition-transform duration-300 hover:scale-110">
        <div className="text-left rounded-lg bg-black bg-opacity-20 p-4 relative">
            <p className="text-3xl font-semibold">{ title }</p>
            { display && badge }
        </div>
    </Link>
}