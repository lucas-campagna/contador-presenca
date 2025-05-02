import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router";
import useDialog from "../hooks/useDialog";
import Button from "../components/Button";

function HomeRoot() {
  const { isSignedIn, signOut } = useAuth();
  const { setDialog, clearDialog } = useDialog();

  if (!isSignedIn) {
    return null;
  }

  function handleMenuClick() {
    setDialog(
      <div className="flex flex-col gap-4">
        <h1>Sair da conta?</h1>
        <div className="flex flex-row gap-2">
          <Button
            text={"Sim"}
            onClick={() => {
              signOut();
              clearDialog();
            }}
          />
          <Button text={"Não"} onClick={() => clearDialog()} />
        </div>
      </div>
    );
    // signOut();
  }

  return (
    <>
      <Header onMenuClick={handleMenuClick} />
      <div className="flex flex-col items-stretch justify-start overflow-y-auto overflow-x-hidden w-full h-full p-2">
        <Outlet />
      </div>
    </>
  );
}

export default HomeRoot;
