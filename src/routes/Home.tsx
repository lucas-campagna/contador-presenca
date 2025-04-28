import { createEffect, lazy, Match, onMount, Switch } from "solid-js";
import useSheet from "../hooks/useSheet";
import useIsLoading from "../hooks/useIsloading";

const Admin = lazy(() => import("../components/Admin"));
const User = lazy(() => import("../components/User"));

function Home() {
  const setIsLoading = useIsLoading();
  const { me } = useSheet();
  
  onMount(() => {
    setIsLoading(true);
  });
  createEffect(() => {
    const hasData = me() && !me.loading && !me.error;
    setIsLoading(!hasData);
  });


  return (
    <Switch>
      <Match when={me()?.permission === "admin"}>
        <Admin />
      </Match>
      <Match when={me()?.permission === "user"}>
        <User />
      </Match>
    </Switch>
  );
}

export default Home;
