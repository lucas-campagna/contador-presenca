import { BrowserRouter, Routes, Route } from "react-router";
import * as C from "./contexts";
import * as P from "./pages";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDyo2mXWNKsxEeFSZeQG9WVCnXCaFfelmc",
  authDomain: "presente-3ad7a.firebaseapp.com",
  projectId: "presente-3ad7a",
  storageBucket: "presente-3ad7a.firebasestorage.app",
  messagingSenderId: "771287059740",
  appId: "1:771287059740:web:0d34ad7543cd74619d7ed9",
  measurementId: "G-DYN62Q8XLF",
};
initializeApp(firebaseConfig);

function App() {
  return (
    <C.DialogProvider>
      <C.AuthProvider>
        <C.LoadingProvider>
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
                      path="alunos"
                      element={<P.Alunos />}
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
        </C.LoadingProvider>
      </C.AuthProvider>
    </C.DialogProvider>
  );
}

export default App;
