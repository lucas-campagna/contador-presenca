import {
  createContext,
  createEffect,
  createSignal,
  JSXElement,
  Accessor,
} from "solid-js";
import { TCredentials } from "../hooks/useLogin";
// @ts-ignore
import Sheet from "@lprett/gsheetdb";

const sheetContext = createContext<any>();

type SheetContextProviderProps = {
  credentials: Accessor<TCredentials>;
  children: JSXElement;
};

function SheetContextProvider({
  credentials,
  children,
}: SheetContextProviderProps) {
  const [sheet, setSheet] = createSignal<any>();
  createEffect(() => {
    const { deploymentId, token } = credentials();
    if (!deploymentId || !token) {
      throw false;
    }
    setSheet(
      new Sheet({
        deploymentId,
        token,
      })
    );
  });

  return (
    <sheetContext.Provider value={sheet}>{children}</sheetContext.Provider>
  );
}

export { sheetContext, SheetContextProvider };
