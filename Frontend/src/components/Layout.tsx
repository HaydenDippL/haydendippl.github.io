import BlogsViewedContextProvider from "../contexts/BlogsViewedContextProvider";
import ScrollToTop from "../scripts/ScrollToTop";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>
        <ScrollToTop />
        <BlogsViewedContextProvider>
            <Navbar />
                <main className="pt-40 pb-32 min-h-[calc(100vh-20rem)]">
                    { children }
                </main>
            <Footer />
        </BlogsViewedContextProvider>
    </>;
}