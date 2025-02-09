const USER_ID_KEY = "user-id";
const SESSION_ID_KEY = "session-id";

/**
 * Attempts to get the user id from LOCAL STORAGE. If it can't
 * find a user id, it will query the backend to receive a new
 * session id. If it has to query for a new user id, it will
 * also query and get a new session id and set it
 * 
 * @returns the user id (UUID)
 */
export async function get_user_id(): Promise<string | null> {
    const user_id = get_user_id_from_storage() || await get_user_id_from_backend();
    if (!user_id) {
        console.error("Error getting user-id from backend");
        return null;
    }

    if (!set_user_UUID(user_id)) {
        return null;
    } else {
        return user_id;
    }
}

/**
 * Attempts to get the user-id from LOCAL STORAGE
 * 
 * @returns user-id or null if it isn't in storage
 */
function get_user_id_from_storage(): string | null {
    return localStorage.getItem(USER_ID_KEY)
}

/**
 * Gets a new user id from the backend. Also gets and sets a
 * session id
 * 
 * @returns user id from the backend
 */
async function get_user_id_from_backend(): Promise<string | null> {
    const url: string = `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_CREATE_USER_PATH}`;
    const headers = { "Content-Type": "application/json" };
    const resp = await fetch(url, { method: 'POST', headers: headers });
    const data = await resp.json();

    if (resp.status === 500) {
        console.error(`500: ${data["error"] || "INTERNAL SERVER ERROR"}`);
        return null;
    } else if (resp.status !== 200) {
        console.error(`${resp.status}: Unexpected status code retrieving user and session`);
        return null;
    }

    const user_id: string | undefined = data["user-id"];
    const session_id: string | undefined = data["session-id"];

    if (!user_id || !session_id) {
        console.error(`'user-id' and 'session-id' not present in response`);
        return null;
    }

    set_session_UUID(session_id);
    return user_id;
}

/**
 * Sets the user id in the local storage of the browser
 * 
 * @param uuid of the user
 * @return true if successful, false otherwise
 */
function set_user_UUID(uuid: string): boolean {
    try {
        localStorage.setItem(USER_ID_KEY, uuid);
        return true;
    } catch (error) {
        console.error(`Could not set ${USER_ID_KEY} in local storage`);
        return false;
    }
}

/**
 * Attempts to get the session id from SESSION STORAGE. If it
 * can't find a session id, it will query the backend to receive
 * a new session id.
 * 
 * @returns the session id (UUID)
 */
export async function get_session(): Promise<string | null> {
    let session_id: string | null = get_session_id_from_storage();
    let user_id: string | null = get_user_id_from_storage();

    if (!session_id) {
        if (!user_id) {
            user_id = await get_user_id_from_backend();
            if (user_id === null) {
                console.error("Could not get user-id");
                return null;
            }
            if (!set_user_UUID(user_id)) {
                console.error("Could not set user-id");
                return null;
            }
            session_id = get_session_id_from_storage();
        } else {
            session_id = await get_session_UUID_from_backend(user_id);
        }
    }

    if (!session_id) {
        console.log("Could not get session-id");
        return null;
    }

    if (!set_session_UUID(session_id)) {
        return null;
    } else {
        return session_id;
    }
}

/**
 * Attempts to get the session id from the SESSION STORAGE
 * 
 * @returns the session id or null
 */
function get_session_id_from_storage(): string | null {
    return sessionStorage.getItem(SESSION_ID_KEY);
}

/**
 * Gets a new session id from the backend
 * 
 * @returns session id from the backend
 */
async function get_session_UUID_from_backend(user_id: string): Promise<string | null> {
    const url: string = `${import.meta.env.VITE_BACKEND_URL}/${import.meta.env.VITE_CREATE_SESSION_PATH}`;
    const headers = { "Content-Type": "application/json" };
    const body: string = JSON.stringify({ "user-id": user_id });
    const resp = await fetch(url, { method: "POST", body: body, headers: headers });
    const data = await resp.json();

    if (resp.status === 500) {
        console.error(`500: ${data["error"] || "INTERNAL SERVER ERROR"}`);
        return null;
    } else if (resp.status === 403) {
        console.error(`403: User does not exist`);
        return null;
    } else if (resp.status !== 200) {
        console.error(`${resp.status}: Unexpected status code retrieving user and session`);
        return null;
    }

    const session_id: string | undefined = data["session-id"];

    if (!session_id) {
        console.error(`'session-id' not present in response`);
        return null;
    }

    return session_id;
}

/**
 * Sets the session id in the SESSION STORAGE of the browser
 * 
 * @param uuid of the session from the backend
 * @returns true if successful, false otherwise
 */
function set_session_UUID(uuid: string): boolean {
    try {
        sessionStorage.setItem(SESSION_ID_KEY, uuid);
        return true;
    } catch (error) {
        console.error(`Could not set ${SESSION_ID_KEY} in session storage`);
        return false;
    }
}