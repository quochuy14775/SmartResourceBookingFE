'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import {User, UserRole, UserStatus} from "@/types/user";


interface DecodedToken {
    sub?: string;
    email?: string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    logout: () => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);

                setUser({
                    id: decoded.sub ?? '',
                    username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? '',
                    email: decoded.email ?? '',
                    firstName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']?.split(' ')[0] ?? '',
                    lastName: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']?.split(' ')[1] ?? '',
                    role: (decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? 'user') as UserRole,
                    department: '',
                    status: 'active' as UserStatus,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    avatar: '',
                    phone: ''
                });
            } catch (err) {
                console.error('Invalid token', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
