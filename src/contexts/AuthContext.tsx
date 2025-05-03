import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from "firebase/auth";
import Escola from "../models/escola";

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
  hasCheckedSignedIn: boolean;
  isSignedIn: boolean;
  signIn: (_: SignInProps) => Promise<void>;
  signUp: (_: SignUpProps) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextProps>({
  hasCheckedSignedIn: false,
  isSignedIn: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [hasCheckedSignedIn, setHasCheckedSignedIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setHasCheckedSignedIn(true);
      setIsSignedIn(!!user);
    });
  }, []);

  async function signUp({ email, password }: SignUpProps) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    await signIn({ email, password });
    // TUDO: should be called only after e-mail validation
    await validateAccount();
  }

  async function signIn(props: SignInProps) {
    if ("token" in props) {
      // TODO
      throw false;
    } else if ("email" in props && "password" in props) {
      const { email, password } = props;
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setIsSignedIn(true);
    }
  }

  async function signOut() {
    const auth = getAuth();
    await signOutFirebase(auth);
    setIsSignedIn(false);
  }

  async function validateAccount() {
    // Cria nova escola
    const auth = getAuth();
    if (!auth.currentUser) {
      throw "Erro ao validar conta: login nao efetuado"
    }
    await Escola.create({nome: "Minha escola"} as Escola);
  }

  return (
    <AuthContext.Provider
      value={{
        hasCheckedSignedIn,
        isSignedIn,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
