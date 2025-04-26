import { useNavigate } from "react-router";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            console.log("User not found, redirecting to login");
            navigate("/login");
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}

export default Home;