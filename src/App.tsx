import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./contexts/AuthContext";
import * as P from "./pages";
import FirebaseContextProvider from "./contexts/FirebaseContext";
import DialogProvider from "./contexts/DialogContext";

function App() {
  return (
    <FirebaseContextProvider>
      <DialogProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<P.Root />}>
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
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </DialogProvider>
    </FirebaseContextProvider>
  );
}

export default App;
