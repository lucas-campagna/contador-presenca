import { HashRouter, Route } from "@solidjs/router";
import { IsLoadingProvider } from "./context/IsLoading";
import { lazy } from "solid-js";

const Root = lazy(() => import("./routes/Root"));
const Home = lazy(() => import("./routes/Home"));

function App() {
  return (
    <IsLoadingProvider>
      <HashRouter root={Root}>
        <Route path="/" component={Home}/>
      </HashRouter>
    </IsLoadingProvider>
  );
}

export default App;
