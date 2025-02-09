import { get_session } from "./UserSessionStorage";

type Page = "home" | "blogs" | "projects" | "blog" | "project" | "analytics"
export async function log_page(page: Page) {
    const session_id: string | null = await get_session();

    const url: string = `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_LOG_PAGE_PATH}`;
    const headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ "session-id": session_id, "page": page });
    let resp = await fetch(url, { method: "POST", body: body, headers: headers });
    let data = await resp.json();

    if (resp.status === 403 || resp.status === 418) {
        console.error("Invalid session-id; trying again with new");
        const session_id: string | null = await get_session();
        body = JSON.stringify({ "session-id": session_id, "page": page });
        resp = await fetch(url, { method: "POST", body: body, headers: headers });
        data = await resp.json();
    }

    if (resp.status !== 200) {
        console.error(`${resp.status}: ${data["error"] || "Unknown Error"}`);
    }
}

type RefferingToLink = "GitHub" | "YouTube" | "LinkedIn";
export async function log_referring_to(link: RefferingToLink) {
    const session_id: string | null = await get_session();

    const url: string = `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_LOG_REFERRING_TO_PATH}`;
    const headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ "session-id": session_id, "link": link });
    let resp = await fetch(url, { method: "POST", body: body, headers: headers });
    let data = await resp.json();

    if (resp.status === 403 || resp.status === 418) {
        console.error("Invalid session-id; trying again with new");
        const session_id: string | null = await get_session();
        body = JSON.stringify({ "session-id": session_id, "link": link });
        resp = await fetch(url, { method: "POST", body: body, headers: headers });
        data = await resp.json();
    }

    if (resp.status !== 200) {
        console.error(`${resp.status}: ${data["error"] || "Unknown Error"}`);
    }
}

type RefferingFromLink = "GitHub" | "YouTube" | "LinkedIn";
export async function log_referral_from(link: RefferingFromLink) {
    const session_id: string | null = await get_session();

    const url: string = `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_LOG_REFERRING_FROM_PATH}`;
    const headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ "session-id": session_id, "link": link });
    let resp = await fetch(url, { method: "POST", body: body, headers: headers });
    let data = await resp.json();

    if (resp.status === 403 || resp.status === 418) {
        console.error("Invalid session-id; trying again with new");
        const session_id: string | null = await get_session();
        body = JSON.stringify({ "session-id": session_id, "link": link });
        resp = await fetch(url, { method: "POST", body: body, headers: headers });
        data = await resp.json();
    }

    if (resp.status !== 200) {
        console.error(`${resp.status}: ${data["error"] || "Unknown Error"}`);
    }
}

type ArticleType = "blog" | "project";
export async function log_article(article_id: number, article_type: ArticleType) {
    const session_id: string | null = await get_session();

    const url: string = `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_LOG_ARTICLE_PATH}`;
    const headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ "session-id": session_id, "article-id": article_id, "article-type": article_type });
    let resp = await fetch(url, { method: "POST", body: body, headers: headers });
    let data = await resp.json();

    if (resp.status === 403 || resp.status === 418) {
        console.error("Invalid session-id; trying again with new");
        const session_id: string | null = await get_session();
        body = JSON.stringify({ "session-id": session_id, "article-id": article_id, "article-type": article_type });
        resp = await fetch(url, { method: "POST", body: body, headers: headers });
        data = await resp.json();
    }

    if (resp.status !== 200) {
        console.error(`${resp.status}: ${data["error"] || "Unknown Error"}`);
    }
}