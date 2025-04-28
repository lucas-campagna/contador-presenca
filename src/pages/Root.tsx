import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { ThreeBarsIcon } from "@primer/octicons-react";

function Root() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/login");
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return null;
  }

  function handleMenuClick() {
    signOut();
  }

  const Header = () => (
    <div className="flex flex-row items-center justify-between bg-primary w-full relative p-2 min-h-10">
      <div
        className="flex flex-row items-center justify-start text-white p-2 absolute left-0"
        onClick={handleMenuClick}
      >
        <ThreeBarsIcon size={24} />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-strech justify-start h-screen w-screen bg-gray-100 overflow-y-hidden">
      <Header />
      <div className="flex flex-col items-stretch justify-start overflow-y-auto overflow-x-hidden w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
