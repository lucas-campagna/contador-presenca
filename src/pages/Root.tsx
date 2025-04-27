import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router";

function Root() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.papel === "professor") {
                navigate("/professor");
            } else if (user.papel === "admin") {
                navigate("/admin");
            }
        } else {
            console.log("User not found, redirecting to login");
            navigate("/login");
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return <Outlet />;

}

export default Root;