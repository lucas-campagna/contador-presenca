import { useContext } from "solid-js";
import { sheetContext } from "../context/Sheet";

function useSheet() {
  const sheet = useContext(sheetContext);
  return sheet;
}
export default useSheet;
