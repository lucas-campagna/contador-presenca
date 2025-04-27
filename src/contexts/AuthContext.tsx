import React, { useState, useEffect } from 'react'
import { getAuth, signInAnonymously } from 'firebase/auth'
import useFirestore from '../hooks/useFirestore';
import { User } from '../types';

export interface AuthContextProps {
    user: User | null
    login: (token: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = React.createContext<AuthContextProps>({
    user: null,
    login: async () => { },
    logout: async () => { },
})

export type AuthProviderProps = {
    children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const { get: getUser } = useFirestore('usuarios');

    useEffect(() => {
        async function fetchUser() {
            const auth = getAuth();
            await signInAnonymously(auth);
            const cachedUserEncoded = localStorage.getItem('user');
            if (cachedUserEncoded) {
                const cachedUser = JSON.parse(atob(cachedUserEncoded as string));
                const user = await getUser?.(cachedUser.token);
                setUser({
                    ...user,
                    token: cachedUser.token,
                });
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', btoa(JSON.stringify({
                token: user.token,
                papel: user.papel,
                nome: user.nome,
            })));
        }
    }, [user]);

    const login = async (token: string) => {
        const user = await getUser?.(token);
        setUser({ ...user, token });
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}