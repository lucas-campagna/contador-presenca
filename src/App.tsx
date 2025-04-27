import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./contexts/AuthContext";
import { Admin, Professor, Root, Login } from "./pages";
import FirebaseContextProvider from "./contexts/FirebaseContext";
import DialogProvider from "./contexts/DialogContext";

function App() {
  return (
    <FirebaseContextProvider>
      <DialogProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Root />}>
                <Route path="/professor" element={<Professor />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </DialogProvider>
    </FirebaseContextProvider>
  )
}

export default App
