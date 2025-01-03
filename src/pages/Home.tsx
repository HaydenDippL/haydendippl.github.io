import Carousel from "../components/Carousel";

import code_image from "../assets/code.png";

export default function Home() {
    const dummy_projects: JSX.Element[] = [
        <div className="card bg-base-100 image-full w-96 shadow-xl shrink-0">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes! 1</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>,
        <div className="card bg-base-100 image-full w-96 shadow-xl shrink-0">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes! 2</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>,
        <div className="card bg-base-100 image-full w-96 shadow-xl shrink-0">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes! 3</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>,
        <div className="card bg-base-100 image-full w-96 shadow-xl shrink-0">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes! 4</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>,
        <div className="card bg-base-100 image-full w-96 shadow-xl shrink-0">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes! 5</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>,
        <div className="card bg-base-100 image-full w-96 shadow-xl shrink-0">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes! 6</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>,
        <div className="card bg-base-100 image-full w-96 shadow-xl shrink-0">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes! 7</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>,
        <div className="card bg-base-100 image-full w-96 shadow-xl shrink-0">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes!8</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>,
        <div className="card bg-base-100 image-full w-96 shadow-xl shrink-0">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes! 9</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>,
    ];

    return <>
        <div className="flex flex-col items-center">
            <div className="flex flex-row gap-48">
                <div id="Hello" className="w-80 mt-12">
                    <p className="font-semibold text-5xl tracking-tight">Hi, my name is <span className="text-primary">Hayden Dippel</span></p>
                    <p className="font-semibold text-2xl text-opacity-60 text-base-content/40 leading-9 mt-6">I am a soon to be graduate from the University of <span className="font-extrabold" style={{color: "#A92A38"}}>Wisconsin</span>-Madison</p>
                </div>
                {/* TODO: change to image */}
                <div id="Picture" className="relative pb-12">
                    <div className="w-80 h-80 bg-gray-300 mask mask-circle"></div>
                    <img
                        src="https://gamepedia.cursecdn.com/lolesports_gamepedia_en/e/e3/University_of_Wisconsin%E2%80%93Madisonlogo_square.png"
                        alt="University of Wisconsin-Madison Logo"
                        className="absolute bottom-0 right-1 w-36 h-36"
                    />
                </div>
            </div>
            <div className="flex flex-row gap-24 justify-center items-center mt-24">
                <img src={code_image} alt="Code Image" className="w-5/12"/>
                <div className="flex flex-col gap-12">
                    <div id="Junior" className="w-96 mt-12">
                        <p className="font-semibold text-5xl tracking-tight">Experience the <span style={{
                            background: "linear-gradient(to right, #308AFF, #FF308A)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}>junior experience</span></p>
                        <p className="font-semibold text-2xl tracking-tight mt-6">journey &gt;&gt; experience</p>
                        <p className="font-semibold text-2xl text-opacity-80 text-base-content/40 leading-9 mt-6">I want to be able to share my experience breaking into the software development industry...</p>
                    </div>
                    <div id="Community" className="mt-24">
                        <p className="font-semibold text-5xl tracking-tight w-auto">Learning <span style={{ color: "#FF308A" }}>Community</span></p>
                        <p className="font-semibold text-2xl text-opacity-80 text-base-content/40 leading-9 mt-6 w-96">I will create a community that can to learn from me <span className="text-primary text-opacity-80">&&</span> each other</p>
                    </div>
                </div>
            </div>
            <div className="justify-center items-center mt-48 w-10/12">
                <div className="divider"></div>
            </div>
            <div className="flex flex-row gap-48 mt-12">
                <div id="blogs" className="w-80 mt-12">
                    <p className="font-semibold text-5xl tracking-tight">Keep up with my <span className="text-info">blogs</span></p>
                    <p className="font-semibold text-2xl text-opacity-60 text-base-content/40 leading-9 mt-6">I write blogs about new technologies, personal experience, and projects...</p>
                    <p className="font-semibold text-2xl text-opacity-60 text-base-content/40 leading-9 mt-6">Here are <span className="text-info">5</span> of my most recent blogs</p>
                </div>
                {/* TODO: make this dynamic content */}
                {/* TODO: ensure that text gets cut off after certain length... */}
                {/* TODO: make these <Link> elements */}
                <div id="blogs-display" className="card bg-black bg-opacity-10 shadow-xl w-auto">
                    <div className="card-body gap-4">
                        <div id="pinned-blogs">
                            <p className="text-xl font-semibold text-base-content/40">Pinned</p>
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="text-left rounded-lg bg-black bg-opacity-20 p-4 relative">
                                    <p className="text-3xl font-semibold">Trying Django for the First Time</p>
                                    <div className="mask mask-circle w-6 h-6 bg-secondary absolute -top-2 -right-2"></div>
                                </div>
                                <div className="text-left rounded-lg bg-black bg-opacity-20 p-4 relative">
                                    <p className="text-3xl font-semibold">Why I Prefer PyTorch</p>
                                </div>
                            </div>
                        </div>
                        <div id="recent-blogs">
                            <p className="text-xl font-semibold text-base-content/40">Recent</p>
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="text-left rounded-lg bg-black bg-opacity-20 p-4 relative">
                                    <p className="text-3xl font-semibold">Python is my Favorite Programming Language</p>
                                    <div className="mask mask-circle w-6 h-6 bg-secondary absolute -top-2 -right-2"></div>
                                </div>
                                <div className="text-left rounded-lg bg-black bg-opacity-20 p-4 relative">
                                    <p className="text-3xl font-semibold">Dynamic Programming</p>
                                </div>
                                <div className="text-left rounded-lg bg-black bg-opacity-20 p-4 relative">
                                    <p className="text-3xl font-semibold">Is the Job Search Really That Hard</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="projects">
                <div className="relative mt-36 mb-16">
                    <p className="text-8xl">Check Out My Projects</p>
                    <p className="text-xl text-base-content/40 absolute -left-24 bottom-4">also...</p>
                </div>
            </div>
            <Carousel items={dummy_projects}/>
        </div>
  </>
}