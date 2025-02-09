import CodeAnimation from "../components/CodeAnimation";

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";

import profile_photo from "../assets/pfp.jpg";

import { PinnedRecentBlogs } from "../types/BlogTypes";

import { get_pinned_and_recent } from "../scripts/Blogs";
import { BlogsViewedContext } from "../contexts/BlogsViewedContextProvider";
import { blog_is_viewed } from "../scripts/BlogStorage";

export default function Home() {
    return <>
        <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row gap-16 md:gap-24 lg:gap-48">
                <div id="Hello" className="w-80 mt-12">
                    <p className="font-semibold text-5xl tracking-tight">Hi, my name is <span className="text-primary">Hayden Dippel</span></p>
                    <p className="font-semibold text-2xl text-opacity-60 text-base-content/40 leading-9 mt-6">I am a soon to be graduate from the University of <span className="font-extrabold" style={{color: "#A92A38"}}>Wisconsin</span>-Madison</p>
                </div>
                <div id="Picture" className="relative pb-12">
                    <img className="w-80 h-80 mask mask-circle" src={profile_photo} />
                    <img
                        src="https://gamepedia.cursecdn.com/lolesports_gamepedia_en/e/e3/University_of_Wisconsin%E2%80%93Madisonlogo_square.png"
                        alt="University of Wisconsin-Madison Logo"
                        className="absolute bottom-0 right-1 w-36 h-36"
                    />
                </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-24 justify-center items-center xl:items-start mt-32">
                <div className="w-full xl:w-9/12">
                    <CodeAnimation />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col justify-center w-64 md:w-96">
                            <p className="font-semibold text-5xl tracking-tight">Experience the <span style={{
                                background: "linear-gradient(to right, #308AFF, #FF308A)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>junior experience</span></p>
                            <p className="font-semibold text-2xl tracking-tight mt-6 azeret-mono">journey &gt;&gt; dest</p>
                            <p className="font-semibold text-2xl text-opacity-80 text-base-content/40 leading-9 mt-6">I want to be able to share my experience breaking into the software development industry...</p>
                        </div>
                        <div id="Community" className="mt-24 w-64 md:w-76">
                            <p className="font-semibold text-5xl tracking-tight w-auto">Learning <span style={{ color: "#FF308A" }}>Community</span></p>
                            <p className="font-semibold text-2xl text-opacity-80 text-base-content/40 leading-9 mt-6 ">I will create a community that can to learn from me <span className="text-primary text-opacity-100">&&</span> each other</p>
                        </div>
                </div>
            </div>
            <div className="justify-center items-center mt-48 w-10/12">
                <div className="divider"></div>
            </div>
            <div className="flex flex-col items-center gap-24 lg:flex-row lg:items-start xl:gap-48 mt-12 p-2">
                <div id="blogs" className="w-80 mt-12">
                    <p className="font-semibold text-5xl tracking-tight">Keep up with my <span className="text-info">blogs</span></p>
                    <p className="font-semibold text-2xl text-opacity-60 text-base-content/40 leading-9 mt-6">I write blogs about new technologies, personal experience, and projects...</p>
                    <p className="font-semibold text-2xl text-opacity-60 text-base-content/40 leading-9 mt-6">Here are <span className="text-info">5</span> of my most recent blogs</p>
                </div>
                {/* TODO: ensure that text gets cut off after certain length... */}
                <BlogList />
            </div>
            <div id="projects">
                <div className="relative mt-36 mb-16 text-center">
                    <p className="text-xl text-base-content/40 mb-4 xl:mb-12 block xl:hidden">also...</p>
                    <p className="text-6xl md:text-8xl">Check Out My Projects</p>
                    <p className="text-xl text-base-content/40 absolute -left-24 bottom-4 hidden xl:block">also...</p>
                </div>
            </div>
            <p className="text-4xl opacity-50">Coming Soon!</p>
            {/* <Carousel items={dummy_projects}/> */}
            {/* <button className="btn btn-secondary btn-lg mt-24">Contact Me</button> */}
        </div>
    </>
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

    const { blog_memory } = useContext(BlogsViewedContext);

    // TODO: cut off text after a certain length
    const new_blog: boolean = blog_is_viewed(blog_memory, id);
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