import React, { useState, useEffect, useContext } from 'react'
import { getAuth, signInAnonymously } from 'firebase/auth'
import useFirestore from '../hooks/useFirestore';

interface User {
    token: string,
    papel: string,
    nome: string,
}

interface AuthContextProps {
    user: User | null
    login: (token: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextProps>({
    user: null,
    login: async () => { },
    logout: async () => { },
})

type AuthProviderProps = {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const { get: getUser } = useFirestore('usuarios');

    useEffect(() => {
        async function fetchUser() {
            const auth = getAuth();
            await signInAnonymously(auth);
            const cachedUserEncoded = localStorage.getItem('user');
            if (cachedUserEncoded) {
                const cachedUser = JSON.parse(atob(cachedUserEncoded as string));
                setUser(cachedUser);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', btoa(JSON.stringify(user)));
        }
    }, [user]);

    const login = async (token: string) => {
        const user = await getUser(token);
        setUser({...user, token });
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

export const useAuth = () => useContext(AuthContext)