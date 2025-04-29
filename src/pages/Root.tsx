import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router";

function Root() {
  const { hasCheckedSignedIn, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isInLoginPage = location.pathname === "/login";
    if (!isSignedIn && !isInLoginPage) {
      navigate("/login");
    } else if (isSignedIn && isInLoginPage) {
      navigate("/");
    }
  }, [isSignedIn, location]);

  const Loading = () => (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white font-bold p-3 rounded-full animate-bounce">
      Carregando...
    </div>
  );

  return (
    <div className="flex flex-col items-strech justify-start h-screen w-screen bg-gray-100 overflow-y-hidden">
      {hasCheckedSignedIn ? <Outlet /> : <Loading />}
    </div>
  );
}

export default Root;
