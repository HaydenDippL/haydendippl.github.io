import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";

import profile_photo from "../assets/pfp.jpg";
import globe_icon from "../assets/globe-icon.svg"

import { PinnedRecentBlogs } from "../types/BlogTypes";

import { get_pinned_and_recent } from "../scripts/Blogs";
import { BlogsViewedContext } from "../contexts/BlogsViewedContextProvider";
import { blog_is_viewed } from "../scripts/BlogStorage";

export default function Home() {
    const profile_picture_element: JSX.Element = <div id="Picture" className="relative w-max pb-12">
        <img className="w-80 h-80 mask mask-circle" src={profile_photo} />
        <img
            src="https://gamepedia.cursecdn.com/lolesports_gamepedia_en/e/e3/University_of_Wisconsin%E2%80%93Madisonlogo_square.png"
            alt="University of Wisconsin-Madison Logo"
            className="absolute bottom-0 right-1 w-36 h-36"
        />
    </div>

    return <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-col items-left text-left w-[38rem] max-w-[90%] text-white font-inter relative">
                <div className="hidden 2xl:inline-block absolute top-4 -right-96">{ profile_picture_element }</div>
                <p id="hello" className="title-text mb-3">Hi, my name is <span className="text-primary">Hayden Dippel</span></p>
                <div id="location" className="flex flex-row items-center gap-2 mb-12">
                    <img src={globe_icon} alt="Globe Icon" className="w-12 h-12 opacity-70" />
                    <p className="subtitle-text font-bold opacity-50">Madison, WI</p>
                </div>
                <div className="2xl:hidden">{ profile_picture_element }</div>
                <p id="intro" className="content-text">I am a full-stack developer graduating from the University of Wisconsin in the spring of 2025. I have experience with...</p>
                <div id="skills" className="content-text flex flex-wrap gap-x-3.5 gap-y-2 mb-16">
                    <TechButton color="#58c4dc" name="React" />
                    <TechButton color="#cf44f9" name="Angular" />
                    <TechButton color="#3178c6" name="TypeScript" />
                    <TechButton color="#0c4b33" name="Django" />
                    <TechButton color="#ffdf5d" name="Python" />
                    <TechButton color="#c5df2f" name="SQL" />
                    <TechButton color="#bb74da" name=".NET" />
                    <TechButton color="#659bd3" name="C++" />
                </div>
                <p className="title-text">Check Out My <Link to="/projects" className="underline" style={{"color": "#6dfff8"}}>Projects</Link></p>
            </div>
            {/* TODO: implement carousel */}
            {/* <Carousel /> */}
            <div className="flex flex-col items-center font-inter mb-16">
                <button className="btn btn-secondary btn-lg">Download Resume</button>
            </div>
            <div className="divider w-[90%] lg:w-[70%] mx-auto mb-12" />
            <div className="flex flex-col items-left text-left w-[38rem] max-w-[90%] text-white font-inter">
                <p className="title-text mb-12">Keep up with my <Link to="/blogs" className="underline" style={{"color": "#6dfff8"}}>Blogs</Link></p>
                <p className="content-text font-semibold mb-12">I write blogs about now tech, personal experiences, and projects. Here are some of my most recent blogs.</p>
                <BlogList />
            </div>
        </div>
    </div>
}

function TechButton({ color, name }: { color: string, name: string }) {
    type HoverFocusEvent = React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FocusEvent<HTMLButtonElement, Element>;
    const set_colors = (e: HoverFocusEvent) => {
        const button = e.currentTarget;
        button.style.backgroundColor = color;
        button.style.borderColor = color;
    };
    const reset_colors = (e: HoverFocusEvent) => {
        const button = e.currentTarget;
            button.style.backgroundColor = "transparent";
            button.style.borderColor = "rgba(255, 255, 255, 0.5)";
    }

    return <button 
        className="bg-transparent px-2.5 py-0.5
            border-solid border-2 border-white/50 rounded-lg
            transform transition-all duration-300 ease-in-out
            hover:scale-125 hover:z-[900] focus:scale-125 hover:z-[900]"
        style={{
            "--hover-color": color,
            transition: "transform 0.3s, background-color 0.3s, border-color 0.3s",
        } as React.CSSProperties}
        onMouseEnter={(e) => set_colors(e)}
        onMouseLeave={(e) => reset_colors(e)}
        onFocus={(e) => set_colors(e)}
        onBlur={(e) => reset_colors(e)} 
    >
        {name}
    </button>
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