import {
  createContext,
  createSignal,
  JSXElement,
  Accessor,
  createEffect,
} from "solid-js";
import { TCredentials } from "../hooks/useLogin";
// @ts-ignore
import Sheet from "@lprett/gsheetdb";

const defaultSheetValue = () => ({});
const sheetContext = createContext<Accessor<any>>(defaultSheetValue);

type SheetContextProviderProps = {
  credentials: Accessor<TCredentials>;
  children: JSXElement;
};

function SheetContextProvider(props: SheetContextProviderProps) {
  const [sheet, setSheet] = createSignal<any>(defaultSheetValue);
  const { deploymentId, token } = props.credentials();
  if (!deploymentId || !token) {
    console.debug('no credentials');
    throw false;
  }
  console.debug('credentials found');
  createEffect(() => {
    const newSheet = new Sheet({
      deploymentId,
      token,
    })
    setSheet(newSheet);
  })

  return (
    <sheetContext.Provider value={sheet}>{props.children}</sheetContext.Provider>
  );
}

export { sheetContext, SheetContextProvider };
