import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { ThreeBarsIcon } from '@primer/octicons-react'
import useDialogList from "../hooks/useDialogList";



function Root() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { openDialogList } = useDialogList();

    useEffect(() => {
        console.log("User changed", user);
        if (!user) {
            console.log("User not found, redirecting to login");
            navigate("/login");
        } else if (user.papel === "professor") {
            navigate("/presencas");
        }
    }, [user]);

    if (!user) {
        return null;
    }

    function handleMenuClick() {
        const nomeItem = `Nome: ${user?.nome}`;
        const tipoContaItem = `Tipo de conta: ${user?.papel}`;
        openDialogList({
            title: "Sobre",
            items: {
                [nomeItem]: () => null,
                [tipoContaItem]: () => null,
            }
        })
    }

    const Header = () => (
        <div className="flex flex-row items-center justify-between bg-primary w-full relative p-2 min-h-10">
            <div className="flex flex-row items-center justify-start text-white p-2 absolute left-0" onClick={handleMenuClick}>
                <ThreeBarsIcon size={24} />
            </div>
            <div className="flex flex-col items-center justify-center bg-primary w-full text-white">
                <p className="text-sm capitalize">{user?.nome}</p>
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