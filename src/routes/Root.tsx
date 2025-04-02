import { JSXElement, ErrorBoundary, lazy } from "solid-js";
import useLogin from "../hooks/useLogin";
import { SheetContextProvider } from "../context/Sheet";

const Login = lazy(() => import("../components/Login"));
const Dialog = lazy(() => import("../components/Dialog"));

type RootProps = {
  children?: JSXElement;
};

function Root(props: RootProps) {
  const credentials = useLogin();
  return (
    <div class="h-screen w-screen flex justify-center">
      <Dialog>
        <ErrorBoundary fallback={<Login />}>
          <SheetContextProvider credentials={credentials}>
            {props.children}
          </SheetContextProvider>
        </ErrorBoundary>
      </Dialog>
    </div>
  );
}

export default Root;
