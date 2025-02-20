import { Link } from "react-router"

import profile_photo from "../assets/pfp.jpg";
import { log_referring_to } from "../scripts/Logging";

import { ExternalLink } from "../scripts/ExternalLinks";

export default function Footer() {
    return <div id="footer" className="w-full bg-neutral flex flex-col justify-between py-16 px-12 gap-16 md:flex-row md:gap-4">
        <div id="links" className="flex flex-row gap-6 text-2xl font-semibold">
            <div id="nav-links" className="flex flex-col gap-2">
                <p className="font-bold mb-3">Nav</p>
                <Link id="home" to="/" className="underline text-primary">Home</Link>
                <Link id="blogs" to="/blogs" className="underline text-primary">Blogs</Link>
                <Link id="projects" to="/projects" className="underline text-primary">Projects</Link>
            </div>
            <div id="social-links" className="flex flex-col gap-2">
                <p className="font-bold mb-3">Socials</p>
                {/* <a id="YouTube" href={YOUTUBE_LINK} onClick={() => { log_referring_to("YouTube"); }} target="_blank" className="underline text-primary">YouTube</a> */}
                <a id="GitHub" href={ExternalLink.GitHub} onClick={() => { log_referring_to("GitHub"); }} target="_blank" className="underline text-primary">GitHub</a>
                <a id="LinkedIn" href={ExternalLink.LinkedIn} onClick={() => { log_referring_to("LinkedIn"); }} target="_blank" className="underline text-primary">LinkedIn</a>
            </div>
        </div>
        <div id="credits" className="flex flex-col text-2xl font-semibold -ml-6">
            <div id="DaisyUI" className="flex flex-row-reverse justify-end items-center gap-3 md:flex-row">
                <p>Made with <a className="underline" href="https://daisyui.com/" target="_blank">DaisyUI</a></p>
                <a href="https://daisyui.com/" target="_blank">
                    <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F76870092%3Fs%3D280%26v%3D4&f=1&nofb=1&ipt=2494a220caf07b3c62d73f1bf90fcebfd79023caa17a8e2d45271c06617d877a&ipo=images" 
                        height="80" width="80" 
                    />
                </a>
            </div>
            <div id="DigitalOcean" className="flex flex-row-reverse justify-end items-center gap-3 md:flex-row">
                <p>Powered by <a className="underline" href="https://www.digitalocean.com/" target="_blank">DigitalOcean</a></p>
                <a href="https://www.digitalocean.com/" target="_blank">
                    <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa3%2F25%2Fc3%2Fa325c3ebd161403a8fce5645c2c5f4d9.png&f=1&nofb=1&ipt=33515fd98f62ac8f8b91e062b38d36af8a07e0af72b77021250883bba234c490&ipo=images"
                        height="80" width="80"
                    />
                </a>
            </div>
            <div className="flex flex-row-reverse justify-end items-center gap-3 md:flex-row">
                <p>Designed and Created by Hayden Dippel</p>
                <img className="h-14 w-14 mask mask-circle mx-3.5" src={profile_photo} />
            </div>
        </div>
    </div>
}