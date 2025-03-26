import { JSXElement, ErrorBoundary } from "solid-js";
import useLogin from "../hooks/useLogin";
import Login from "../components/Login";
import { SheetContextProvider } from "../context/Sheet";

type RootProps = {
  children: JSXElement;
};

function Root(props: RootProps) {
  const credentials = useLogin();
  return (
    <div class="mx-3 min-h-screen flex justify-center py-3">
      <ErrorBoundary fallback={<Login />}>
        <SheetContextProvider credentials={credentials}>
          {props.children}
        </SheetContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default Root;
