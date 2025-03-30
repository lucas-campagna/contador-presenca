import { useContext } from "solid-js";
import { dialogContext } from "../components/Dialog";

function useDialog() {
    return useContext(dialogContext);
}

export default useDialog;