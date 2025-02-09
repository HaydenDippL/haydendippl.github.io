import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import BlogsViewedContextProvider from "../contexts/BlogsViewedContextProvider";
import ScrollToTop from "../scripts/ScrollToTop";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { log_article, log_page, log_referral_from } from "../scripts/Logging";

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();
    const current_url = location.pathname;

    useEffect(() => {
        // get the part of the URL after the domain name "http://HaydenDippL.io/..."
        const PAGE_INDEX_IN_PATH = 3;
        const ARTICLE_ID_INDEX_IN_PATH = 4;
        const path: string[] = current_url.split("/").slice(PAGE_INDEX_IN_PATH);
        const page: string = (path[0] || "").toLowerCase();
        let article_id: number | null;

        switch (page) {
            // Referral Links
            case "linkedin":
                log_referral_from("LinkedIn");
                navigate("/");
                break;
            case "youtube":
                log_referral_from("YouTube");
                navigate("/");
                break;
            case "github":
                log_referral_from("GitHub");
                navigate("/");
                break;

            // Pages
            case "":
            case "home":
                log_page("home");
                break;
            case "blogs":
                log_page("blogs");
                break;
            case "projects":
                log_page("projects");
                break;
            case "analytics":
                log_page("analytics");
                break;

            // Articles and Pages
            case "blog":
                log_page("blog");
                article_id = parse_number(path[ARTICLE_ID_INDEX_IN_PATH]);
                if (article_id !== null) {
                    log_article(article_id, "blog");
                }
                break;
            case "project":
                log_page("project");
                article_id = parse_number(path[ARTICLE_ID_INDEX_IN_PATH]);
                if (article_id !== null) {
                    log_article(article_id, "project");
                }
                break;
        }
    }, [current_url])

    return <>
        <ScrollToTop />
        <BlogsViewedContextProvider>
            <Navbar />
                <main className="pt-24 md:pt-40 pb-32 min-h-[calc(100vh-20rem)]">
                    { children }
                </main>
            <Footer />
        </BlogsViewedContextProvider>
    </>;
}

function parse_number(num: string): number | null {
    const parsed = parseInt(num, 10);
    return isNaN(parsed) ? null : parsed;
}