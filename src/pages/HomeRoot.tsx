import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router";
import { ThreeBarsIcon } from "@primer/octicons-react";

function HomeRoot() {
  const { isSignedIn } = useAuth();
  const { signOut } = useAuth();

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
    <>
      <Header />
      <div className="flex flex-col items-stretch justify-start overflow-y-auto overflow-x-hidden w-full h-full">
        <Outlet />
      </div>
    </>
  );
}

export default HomeRoot;
