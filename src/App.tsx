import { HashRouter, Route } from "@solidjs/router";
import Root from "./routes/Root";
import Home from "./routes/Home";
import { IsLoadingProvider } from "./context/IsLoading";

function App() {
  return (
    <IsLoadingProvider>
      <HashRouter root={Root}>
        <Route path="/" component={Home} />
      </HashRouter>
    </IsLoadingProvider>
  );
}

export default App;
