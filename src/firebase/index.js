import { initializeApp } from "firebase/app";

export default function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyCswKxqW-evd_LJ7RTlFvbH1FUPpp-iXaE",
    authDomain: "ibconforto-ebd.firebaseapp.com",
    projectId: "ibconforto-ebd",
    storageBucket: "ibconforto-ebd.firebasestorage.app",
    messagingSenderId: "114467328800",
    appId: "1:114467328800:web:5e80eba5cd30266d8b7d45"
  };
  initializeApp(firebaseConfig);
}