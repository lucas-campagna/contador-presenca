import { useContext } from "solid-js";
import { isLoadingContext } from "../context/IsLoading";

const useIsLoading = () => useContext(isLoadingContext);

export default useIsLoading;