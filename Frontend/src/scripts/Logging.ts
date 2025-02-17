import { get_session, get_session_id_from_storage, get_session_UUID_from_backend } from "./UserSessionStorage";

type Page = "home" | "blogs" | "projects" | "blog" | "project" | "analytics"
export async function log_page(page: Page) {
    const session_id: string | null = await get_session();
    const resp = await call_page_logging(session_id, page)
    const data = await resp.json();

    if (resp.status === 403 || resp.status === 418) {
        await get_session_UUID_from_backend();
        const session_id: string | null = get_session_id_from_storage();
        call_page_logging(session_id, page);
    }

    if (resp.status !== 200) {
        console.error(`${resp.status}: ${data["error"] || "Unknown Error"}`);
    }
}

async function call_page_logging(session_id: string | null, page: Page): Promise<Response> {
    const url: string = `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_LOG_PAGE_PATH}`;
    const headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ "session-id": session_id, "page": page });
    let resp = await fetch(url, { method: "POST", body: body, headers: headers });
    return resp;
}

type RefferingToLink = "GitHub" | "YouTube" | "LinkedIn";
export async function log_referring_to(link: RefferingToLink) {
    const session_id: string | null = await get_session();
    const resp = await call_referring_to_logging(session_id, link);
    const data = await resp.json();

    if (resp.status === 403 || resp.status === 418) {
        await get_session_UUID_from_backend();
        const session_id: string | null = get_session_id_from_storage();
        call_referring_to_logging(session_id, link);
    }

    if (resp.status !== 200) {
        console.error(`${resp.status}: ${data["error"] || "Unknown Error"}`);
    }
}

async function call_referring_to_logging(session_id: string | null, link: RefferingToLink): Promise<Response> {
    const url: string = `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_LOG_REFERRING_TO_PATH}`;
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({ "session-id": session_id, "link": link });
    const resp = await fetch(url, { method: "POST", body: body, headers: headers });
    return resp;
}

type ReferringFromLink = "GitHub" | "YouTube" | "LinkedIn";
export async function log_referral_from(link: ReferringFromLink) {
    const session_id: string | null = await get_session();
    const resp = await call_referral_from_logging(session_id, link);
    const data = await resp.json();

    if (resp.status === 403 || resp.status === 418) {
        await get_session_UUID_from_backend();
        const session_id: string | null = get_session_id_from_storage();
        call_referral_from_logging(session_id, link);
    }

    if (resp.status !== 200) {
        console.error(`${resp.status}: ${data["error"] || "Unknown Error"}`);
    }
}

async function call_referral_from_logging(session_id: string | null, link: ReferringFromLink) {
    const url: string = `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_LOG_REFERRING_FROM_PATH}`;
    const headers = { "Content-Type": "application/json" };
    let body = JSON.stringify({ "session-id": session_id, "link": link });
    let resp = await fetch(url, { method: "POST", body: body, headers: headers });
    return resp
}

type ArticleType = "blog" | "project";
export async function log_article(article_id: number, article_type: ArticleType) {
    const session_id: string | null = await get_session();
    const resp = await call_article_logging(session_id, article_id, article_type);
    const data = await resp.json();

    if (resp.status === 403 || resp.status === 418) {
        await get_session_UUID_from_backend();
        const session_id: string | null = get_session_id_from_storage();
        call_article_logging(session_id, article_id, article_type);
    }

    if (resp.status !== 200) {
        console.error(`${resp.status}: ${data["error"] || "Unknown Error"}`);
    }
}

async function call_article_logging(session_id: string | null, article_id: number, article_type: ArticleType) {
    const url: string = `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_LOG_ARTICLE_PATH}`;
    const headers = { "Content-Type": "application/json" };
    const body: string = JSON.stringify({ "session-id": session_id, "article-id": article_id, "article-type": article_type });
    const resp = await fetch(url, { method: "POST", body: body, headers: headers });
    return resp;
}