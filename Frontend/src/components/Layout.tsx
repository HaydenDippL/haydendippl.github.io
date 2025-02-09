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
        const path: string = current_url.slice(1); // remove the first '/' in url; EX: '/home' -> 'home'
        const split_path: string[] = path.split("/");
        const page: string = split_path[0] || "";
        const article_id: number | null = parse_number(split_path[1] || "NaN");

        switch (page) {
            // Referral Links
            case "LinkedIn":
                log_referral_from("LinkedIn");
                navigate("/");
                break;
            case "YouTube":
                log_referral_from("YouTube");
                navigate("/");
                break;
            case "GitHub":
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
                if (article_id !== null) {
                    log_article(article_id, "blog");
                }
                break;
            case "project":
                log_page("project");
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