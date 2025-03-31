import { createEffect, createMemo, lazy, Match, Switch } from "solid-js";
import useSheet from "../hooks/useSheet";
import useIsLoading from "../hooks/useIsloading";

const Admin = lazy(() => import("../components/Admin"));
const User = lazy(() => import("../components/User"));

function Home() {
  const setIsLoading = useIsLoading();
  const { me } = useSheet();

  const hasData = createMemo(() => me() && !me.loading && !me.error);

  setIsLoading(true);
  createEffect(() => setIsLoading(!hasData()));

  return (
    <Switch>
      <Match when={(me() as any)?.permission === "admin"}>
        <Admin />
      </Match>
      <Match when={(me() as any)?.permission === "user"}>
        <User />
      </Match>
    </Switch>
  );
}

export default Home;
