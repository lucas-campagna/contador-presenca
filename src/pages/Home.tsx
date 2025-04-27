import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router";

function Home() {
    console.log("Home");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.papel === "professor") {
                navigate("/professor");
            } else if (user.papel === "admin") {
                navigate("/admin");
            }
        }
        else {
            console.log("User not found, redirecting to login");
            navigate("/login");
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center text-center min-h-screen min-w-screen bg-gray-100">
                Tipo de usuário não encontrado. Contate o administrador
            </div>
            <Outlet/>
        </>
    );

}

export default Home;