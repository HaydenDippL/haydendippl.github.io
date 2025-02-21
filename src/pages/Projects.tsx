import { useEffect, useState } from "react"

import ProjectCard from "../components/ProjectCard"
import { ExternalLink } from "../scripts/ExternalLinks";
import { log_referring_to } from "../scripts/Logging";
import { get_article_previews } from "../scripts/Articles";
import { ArticleType } from "../scripts/ArticleStorage";

function get_cards(): JSX.Element[] {
    return get_article_previews(ArticleType.project)
        .map((project_preview, i) => <ProjectCard key={i} {...project_preview} />)
}

export default function Projects() {
    
    const [cards, set_cards] = useState<JSX.Element[]>(get_cards());

    useEffect(() => {
        set_cards(get_cards());
    }, [])
    
    return <>
        <div className="flex flex-col items-center">
            <p className="text-6xl font-semibold">Projects</p>
            <p className="text-xl font-medium p-4 text-center">Check out my <span className="text-primary">projects</span>! I haven't made posts for most of them <span className="text-accent font-bold">yet</span>, come back soon or check my <a className="text-cyan-400 underline" href={ExternalLink.LinkedIn} onClick={() => { log_referring_to("LinkedIn"); }}>LinkedIn</a> for updates.</p>
            <div className="flex justify-center w-full">
                <div id="project-gallery" className="w-3/4 flex flex-row flex-wrap justify-center gap-6 mt-8">
                    { cards }
                </div>
            </div>
        </div>
    </>
}