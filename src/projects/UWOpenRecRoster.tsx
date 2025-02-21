import { DateTime } from "luxon";
import { Tech } from "../types/TechTypes";
import { ArticleData } from "../types/ArticleTypes";

const now: string = DateTime.now().toISODate();

const content: JSX.Element = <>
    <p></p>
</>

export const UWOpenRecRosterProject: ArticleData = {
    id: 0,
    title: "UWOpenRecRoster",
    description: "How I fixed my schools court shedule problem",
    starred: true,
    created: now,
    published: now,
    modified: now,
    image: "https://uqwajwnxrblspjafxmyc.supabase.co/storage/v1/object/public/HaydenDippL.io%20Assets//UWOepnRecRoster.png",
    content: content,
    technologies: [Tech.SQL, Tech.React]
};