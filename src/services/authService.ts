// src/services/authService.ts
import axios from "axios";
import {API_URL} from "@/services/api";

export const authService = {
    login: async (username: string, password: string) => {
        const response = await axios.post(`${API_URL}/Auth/login`, {
            userName: username,
            password: password,
        });

        return response.data; // { token: "...", expiration: "..." }
    },
};