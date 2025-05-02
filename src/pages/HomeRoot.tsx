import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router";

function HomeRoot() {
  const { isSignedIn, signOut } = useAuth();

  if (!isSignedIn) {
    return null;
  }

  function handleMenuClick() {
    signOut();
  }

  return (
    <>
      <Header onMenuClick={handleMenuClick}/>
      <div className="flex flex-col items-stretch justify-start overflow-y-auto overflow-x-hidden w-full h-full p-2">
        <Outlet />
      </div>
    </>
  );
}

export default HomeRoot;
