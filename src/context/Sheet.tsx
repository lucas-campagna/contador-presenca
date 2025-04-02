import {
  createContext,
  createSignal,
  JSXElement,
  Accessor,
  createEffect,
} from "solid-js";
import { TCredentials } from "../hooks/useLogin";
import Sheet from "@lprett/gsheetdb";

const sheetContext = createContext<Accessor<Sheet>>((() => ({})) as Accessor<Sheet>);

type SheetContextProviderProps = {
  credentials: Accessor<TCredentials>;
  children: JSXElement;
};

function SheetContextProvider(props: SheetContextProviderProps) {
  const [sheet, setSheet] = createSignal<Sheet>({} as Sheet);
  const { deploymentId, token } = props.credentials();
  if (!deploymentId || !token) {
    throw false;
  }
  createEffect(() => {
    const newSheet = new Sheet({
      deploymentId,
      token,
    });
    setSheet(newSheet);
  });
  return (
    <sheetContext.Provider value={sheet}>
      {props.children}
    </sheetContext.Provider>
  );
}

export { sheetContext, SheetContextProvider };
