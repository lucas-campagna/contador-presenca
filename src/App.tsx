import { HashRouter, Route } from "@solidjs/router";
import Root from "./routes/Root";
import Home from "./routes/Home";

function App() {
  return (
    <HashRouter root={Root}>
      <Route path="/" component={Home} />
    </HashRouter>
  );
}

export default App;
