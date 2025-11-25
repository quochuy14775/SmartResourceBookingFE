import api from "@/lib/axios";

export const authService = {
    login: async (username: string, password: string) => {
        const response = await api.post("/Auth/login", {
            userName: username,
            password: password,
        });

        return response.data;
    },
};