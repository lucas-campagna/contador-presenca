import { useContext } from "solid-js";
import { dialogContext } from "../components/Dialog";

function useDialog() {
    const setContent = useContext(dialogContext);
    return {
        setDialog: setContent,
        hideDialog: () => setContent(null)
    };
}

export default useDialog;