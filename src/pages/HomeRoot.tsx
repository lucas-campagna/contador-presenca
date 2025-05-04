import { ChevronLeftIcon } from '@primer/octicons-react'
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { Outlet, useLocation, useNavigate } from "react-router";
import useDialog from "../hooks/useDialog";
import Button from "../components/Button";
import { useMemo } from "react";

function HomeRoot() {
  const { isSignedIn, signOut } = useAuth();
  const { setDialog, closeDialog } = useDialog();
  const navigate = useNavigate();
  const location = useLocation();
  const isInHomePage = useMemo(() => location.pathname === '/', [location]);

  if (!isSignedIn) {
    return null;
  }

  function handleMenuClick() {
    if (!isInHomePage) {
      navigate(-1);
      return
    }
    setDialog(
      <div className="flex flex-col gap-4">
        <h1>Sair da conta?</h1>
        <div className="flex flex-row gap-2">
          <Button
            label={"Sim"}
            onClick={() => {
              signOut();
              closeDialog();
            }}
          />
          <Button label={"Não"} onClick={() => closeDialog()} />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header onMenuClick={handleMenuClick} leftIcon={isInHomePage ? undefined : <ChevronLeftIcon/>} />
      <div className="flex flex-col items-stretch justify-start overflow-y-auto overflow-x-hidden w-full h-full p-2">
        <Outlet />
      </div>
    </>
  );
}

export default HomeRoot;
