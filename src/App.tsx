import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./Home";
import Login from "./Login";
import { FirebaseContextProvider } from "./contexts/FirebaseContext";

function App() {
  return (
    <FirebaseContextProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </FirebaseContextProvider>
  )
}

export default App
