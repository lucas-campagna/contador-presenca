import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./contexts/AuthContext";
import * as P from "./pages";
import DialogProvider from "./contexts/DialogContext";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCswKxqW-evd_LJ7RTlFvbH1FUPpp-iXaE",
  authDomain: "ibconforto-ebd.firebaseapp.com",
  projectId: "ibconforto-ebd",
  storageBucket: "ibconforto-ebd.firebasestorage.app",
  messagingSenderId: "114467328800",
  appId: "1:114467328800:web:5e80eba5cd30266d8b7d45",
};
initializeApp(firebaseConfig);

function App() {
  return (
    <DialogProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<P.Root />}>
              <Route path="/" element={<P.HomeRoot />}>
                <Route index element={<P.Home />} />
                <Route path="presencas" element={<P.Presencas />} />
                <Route path="admin" element={<P.Admin />}>
                  <Route path="presencas" element={<P.AdminPresencas />} />
                  <Route path="criar-turma" element={<P.CriarTurma />} />
                  <Route
                    path="registrar-aluno"
                    element={<P.RegistrarAluno />}
                  />
                  <Route
                    path="registrar-professor"
                    element={<P.RegistrarProfessor />}
                  />
                </Route>
              </Route>
              <Route path="/login" element={<P.Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </DialogProvider>
  );
}

export default App;
