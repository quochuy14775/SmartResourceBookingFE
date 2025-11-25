import axios from 'axios';
import {useAuthStore} from "@/stores/authStore";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // If your backend uses cookie-based auth (session cookie), set NEXT_PUBLIC_API_USE_CREDENTIALS=true
    // in your .env so the browser will send cookies with requests. If you're using JWT in headers,
    // this can remain false/undefined.
    withCredentials: process.env.NEXT_PUBLIC_API_USE_CREDENTIALS === 'true',
});

api.interceptors.request.use((config) => {
    // Ensure headers object exists before assigning
    if (!config.headers) {
        // axios types may require a specific shape - cast to any to be safe for runtime assignment
        (config as any).headers = {};
    }

    const token = useAuthStore.getState().token;
    // If you store JWT in localStorage and set it into zustand, this will attach Authorization header
    if (token) {
        (config.headers as any).Authorization = `Bearer ${token}`;
    }

    // Temporary: helpful debug logging (remove or gate behind env var in production)
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.debug('[api] outgoing request', config.method, config.url, config.headers ? { Authorization: (config.headers as any).Authorization } : {});
    }

    return config;
});

export default api;
