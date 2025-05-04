import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router";
import useLoading from "../hooks/useLoading";

function Root() {
  const { hasCheckedSignedIn, isSignedIn } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(!hasCheckedSignedIn);
  }, [hasCheckedSignedIn]);

  useEffect(() => {
    const isInLoginPage = location.pathname === "/login";
    if (!isSignedIn && !isInLoginPage) {
      navigate("/login");
    } else if (isSignedIn && isInLoginPage) {
      navigate("/");
    }
  }, [isSignedIn, location]);

  return (
    <div className="flex flex-col items-strech justify-start h-screen w-screen bg-light overflow-y-hidden">
      <Outlet />
    </div>
  );
}

export default Root;
