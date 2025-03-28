import { createEffect, createMemo, Match, Switch } from "solid-js";
import useSheet from "../hooks/useSheet";
import useIsLoading from "../hooks/useIsloading";

function Home() {
  const setIsLoading = useIsLoading();
  const { alunos, tables, me } = useSheet();

  const hasData = createMemo(() =>
    [me, tables].reduce(
      (acc, curr) => acc && !curr.loading && !curr.error && !!curr(),
      true
    )
  );
  createEffect(() => {
    console.log(hasData());
    setIsLoading(!hasData());
  });
  return (
    <Switch>
      <Match when={me()?.permission === "admin"}>
        Admin
        <br />
        {JSON.stringify(alunos())}
      </Match>
      <Match when={me()?.permission === "user"}>User</Match>
    </Switch>
  );
}
export default Home;
