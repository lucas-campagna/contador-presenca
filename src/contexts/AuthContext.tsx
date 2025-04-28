import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
} from "firebase/auth";
import { ColumnsIcon } from "@primer/octicons-react";

export type SignUpProps = {
    email: string;
    password: string;
};

export type SignInProfessorProps = {
    token: string;
};

export type SignInAdminProps = {
    email: string;
    password: string;
};

export type SignInProps = SignInProfessorProps | SignInAdminProps;

export type AuthContextProps = {
    isSignedIn: boolean;
    signIn: (_: SignInProps) => Promise<void>;
    signUp: (_: SignUpProps) => Promise<void>;
    signOut: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextProps>({
    isSignedIn: false,
    signIn: async () => {},
    signUp: async () => {},
    signOut: async () => {},
});

export type AuthProviderProps = {
    children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setIsSignedIn(!!user);
        });
    }, []);

    const signUp = async ({ email, password }: SignUpProps) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        await signIn({ email, password });
    };

    const signIn = async (props: SignInProps) => {
        if ("token" in props) {
            // TODO
            throw false;
        } else if ("email" in props && "password" in props) {
            const { email, password } = props;
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            setIsSignedIn(true);
        }
    };

    const signOut = async () => {
        const auth = getAuth();
        await signOutFirebase(auth);
        setIsSignedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isSignedIn, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}
