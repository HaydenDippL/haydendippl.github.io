import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { DateTime } from "luxon";

import BlogCard from "../components/BlogCard";
import { BlogData } from "../types/BlogTypes";

import dinosaur_image from "../assets/dino-scene.png";
import coming_soon_image from "../assets/coming-soon.png"

// TODO: Implement skeleton

// const DUMMY_BLOG: BlogData = {
//     id: 1,
//     title: "Trying Django for the First Time",
//     sub_title: "Implementing Django as the backend for this website",
//     starred: true,
//     date_created: new Date(),
//     date_modified: new Date(),
//     image: dummy_image,
//     content: <div className="flex flex-col gap-6 text-3xl">
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
//         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae enim beatae rem possimus praesentium animi, perferendis tenetur aliquam, placeat earum blanditiis dolorum reprehenderit. Officiis autem, minus nihil voluptate neque recusandae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam repellat, animi laborum ipsum reprehenderit minima, dicta unde voluptatem nam vel suscipit libero. Quae impedit vitae inventore sapiente dolores! Sapiente, harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ducimus excepturi deleniti doloremque minus quis provident exercitationem ex alias inventore molestiae nisi, dolore perspiciatis autem veniam distinctio, incidunt, itaque iure!</p>
//     </div>
// };

// TODO: show some kind og building icon as photo
const coming_soon: JSX.Element = <BlogCard
    id={-2}
    starred={false}
    image={coming_soon_image}
    title=" Next Blog Coming Soon"
    description="I post these blogs about once a week, check back in a couple of days"
/>

// TODO: show some king of dinosaur asteroid silhouette  
const beginning_of_time: JSX.Element = <BlogCard
    id={-1}
    starred={false}
    image={dinosaur_image}
    title="There are no previous blogs"
    description="You reached the beginning of time, say hi to the dinosaurs"
/>

export default function Blog() {
    const { id } = useParams();

    const [blog, set_blog] = useState<JSX.Element | null>(null);
    
    useEffect(get_blog, []);

    function get_blog(): void {
        const url = `${import.meta.env.VITE_BACKEND_URL}/blog/${id}`;
        fetch(url)
            .then(resp => resp.json())
            .then((blog_data: BlogData) => {
                const viewed: Boolean = true; // FIXME: modify for testing purposes
                const color: string = viewed ? "bg-primary" : "bg-secondary";
                const mask: string = blog_data.starred ? "mask mask-star-2" : "mask mask-circle";
                const display: boolean = !viewed || blog_data.starred;
                const badge_element: JSX.Element = <div className={`absolute -top-6 -right-6 w-12 h-12 ${color} ${mask}`} />;
                const date_published: string = DateTime.fromISO(blog_data.published).toFormat("LLL d, y");
                const date_modified: string = DateTime.fromISO(blog_data.modified).toFormat("t ZZZZ, LLL d, y");
                const display_modified_date: boolean = blog_data.created !== blog_data.modified;

                const image_source: string = `${import.meta.env.VITE_BACKEND_URL}/${blog_data.image}`

                const blog_element: JSX.Element = <>
                    <div id="feature-image" className="relative">
                        <img src={image_source} className="rounded-xl relative w-auto" />
                        { display && badge_element }
                    </div>
                    <div className="px-2">
                        <p id="title" className="text-6xl font-bold mt-8">{blog_data.title}</p>
                        <p id="sub-title" className="text-3xl font-normal mt-8">{blog_data.description}</p>
                        <div id="dates" className="mt-6 mb-16">
                            <p id="date-created" className="text-xl mt-6">Published: { date_published }</p>
                            { display_modified_date && <p id="date-edited" className="text-xl">Edited: { date_modified }</p> }
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: blog_data.content}} />
                    </div>
                </>;

                set_blog(blog_element);
            });
            // TODO: catch
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