const API_URL = "http://127.0.0.1:8000";


export async function register(
    username,
    email,
    password
) {
    const response = await fetch(
        `${API_URL}/auth/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Ошибка регистрации"
        );
    }

    localStorage.setItem(
        "token",
        data.access_token
    );

    return data;
}


export async function login(
    email,
    password
) {
    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Ошибка входа"
        );
    }

    localStorage.setItem(
        "token",
        data.access_token
    );

    return data;
}


export async function getMe() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/auth/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        localStorage.removeItem("token");

        throw new Error(
            data.detail || "Не авторизован"
        );
    }

    return data;
}


export function logout() {
    localStorage.removeItem("token");
}