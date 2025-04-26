import React, { useState, useEffect, useContext } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getApp } from 'firebase/app';
import { User } from 'firebase/auth'

interface AuthContextProps {
    user: User | null
    login: (email: string, password: string) => Promise<void>
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
    const app = getApp();
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        await setPersistence(auth, browserLocalPersistence);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            await createUserWithEmailAndPassword(auth, email, password);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)