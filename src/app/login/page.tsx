'use client';

import React from 'react';
import Login from '@/components/layout/Login/Login';
import {useAuthStore} from "@/stores/authStore";
import {authService} from "@/services/authService";
import {useUser} from "@/context/UserContext";
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/navigation";
import {UserRole, UserStatus} from "@/types/user";

const LoginPage: React.FC = () => {
    const { setUser } = useUser();
    const router = useRouter();

    const handleLogin = async (username: string, password: string) => {
        try {
            const res = await authService.login(username, password);
            console.log(res)
            useAuthStore.getState().setToken(res.token);
            localStorage.setItem('token', res.token);

            const decoded = jwtDecode<Record<string, unknown>>(res.token);

            const fullName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] as string | '';
            const [firstName, lastName] = fullName.split(' ');

            setUser({
                id: decoded['sub'] as string || '',
                username: fullName,
                email: decoded['email'] as string || '',
                firstName: firstName || '',
                lastName: lastName || '',
                role: ((decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as string || 'user').toLowerCase() as UserRole),
                department: '',        // default nếu token không có
                status: 'active' as UserStatus,      // default value
                createdAt: new Date(),
                updatedAt: new Date(),
                avatar: '',            // default
                phone: ''              // default
            });

            // Use router.push instead of window.location.href for better navigation
            router.push("/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid username or password");
        }
    };

    return <Login onLogin={handleLogin} />;
};

export default LoginPage;
