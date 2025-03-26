import { useContext } from "solid-js";
import { sheetContext } from "../context/Sheet";

function useSheet() {
  return useContext(sheetContext);
}
export default useSheet;
