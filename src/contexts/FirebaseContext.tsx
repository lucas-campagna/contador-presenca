import React from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

interface FirebaseContextProps {
    app: FirebaseApp,
    db: Firestore,
}

export const FirebaseContext = React.createContext<FirebaseContextProps>({
    app: null as any,
    db: null as any,
})

type FirebaseProviderProps = {
    children: React.ReactNode
}


export default function FirebaseContextProvider({children}: FirebaseProviderProps) {
  const firebaseConfig = {
    apiKey: "AIzaSyCswKxqW-evd_LJ7RTlFvbH1FUPpp-iXaE",
    authDomain: "ibconforto-ebd.firebaseapp.com",
    projectId: "ibconforto-ebd",
    storageBucket: "ibconforto-ebd.firebasestorage.app",
    messagingSenderId: "114467328800",
    appId: "1:114467328800:web:5e80eba5cd30266d8b7d45"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <FirebaseContext.Provider value={{app, db}}>
        {children}
    </FirebaseContext.Provider>
  )
}