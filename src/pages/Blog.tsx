import { useEffect, useState } from "react"

import BlogCard from "../components/BlogCard";
import { BlogData } from "../types/BlogTypes";

import dummy_image from "../assets/dummy-image.png";
import dinosaur_image from "../assets/dino-scene.png";
import coming_soon_image from "../assets/coming-soon.png"

// TODO: Implement skeleton

const DUMMY_BLOG: BlogData = {
    id: "3890498371",
    title: "Trying Django for the First Time",
    sub_title: "Implementing Django as the backend for this website",
    starred: true,
    date_created: new Date(),
    date_modified: new Date(),
    image: dummy_image,
    content: <div className="flex flex-col gap-6 text-3xl">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
    </div>
};

// TODO: show some kind og building icon as photo
const coming_soon: JSX.Element = <BlogCard
    blog_id={-2}
    starred={false}
    image_source={coming_soon_image}
    title=" Next Blog Coming Soon"
    description="I post these blogs about once a week, check back in a couple of days"
/>
// TODO: show some king of dinosaur asteroid silhouette  
const beginning_of_time: JSX.Element = <BlogCard
    blog_id={-1}
    starred={false}
    image_source={dinosaur_image}
    title="There are no previous blogs"
    description="You reached the beginning of time, say hi to the dinosaurs"
/>

export default function Blog() {
    const [blog, set_blog] = useState<JSX.Element | null>(null);
    
    useEffect(get_blog, []);

    function get_blog(): void {
        // TODO: replace
        const viewed: Boolean = true; // FIXME: modify for testing purposes
        const color: string = viewed ? "bg-primary" : "bg-secondary";
        const mask: string = DUMMY_BLOG.starred ? "mask mask-star-2" : "mask mask-circle";
        const display: boolean = !viewed || DUMMY_BLOG.starred;
        const badge: JSX.Element = <div className={`absolute -top-6 -right-6 w-12 h-12 ${color} ${mask}`} />;

        // TODO: luxon dates
        const blog: JSX.Element = <>
            <div id="feature-image" className="relative">
                <img src={DUMMY_BLOG.image} className="rounded-xl relative w-auto" />
                { display && badge }
            </div>
            <div className="px-2">
                <p id="title" className="text-6xl font-bold mt-8">{DUMMY_BLOG.title}</p>
                <p id="sub-title" className="text-3xl font-normal mt-8">{DUMMY_BLOG.sub_title}</p>
                <div id="dates" className="mt-6 mb-16">
                    <p id="date-created" className="text-xl mt-6">{String(DUMMY_BLOG.date_created)}</p>
                    { DUMMY_BLOG.date_created !== DUMMY_BLOG.date_modified && <p id="date-edited" className="text-xl">Edited: {String(DUMMY_BLOG.date_modified)}</p> }
                </div>
                { DUMMY_BLOG.content }
            </div>
        </>

        set_blog(blog);
    }

    // TODO: implement next and prev, not dummy values...
    return <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col w-7/12 items-start">
            { blog }
        </div>
        <div id="post-blog" className="flex flex-col w-7/12 ml-[-5%] mt-10 items-center gap-1">
            <div className="divider w-[110%]" />
            <div className="flex flex-col items-center gap-1 text-4xl mb-8">
                <p>Check out the</p>
                <p><span className="text-primary font-bold">next</span> and <span className="text-secondary font-bold">prev</span></p>
                <p>blogs</p>
            </div>
            <div className="flex flex-row gap-16">
                { coming_soon }
                { beginning_of_time }
            </div>
        </div>
    </div>;
}