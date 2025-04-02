import { createEffect, createSignal, lazy, Match, Switch } from "solid-js";
import useSheet from "../hooks/useSheet";
import useIsLoading from "../hooks/useIsloading";
import ActionButton from "./ActionButton";
import useDialog from "../hooks/useDialog";

const Presenca = lazy(() => import("../routes/Presenca"));
const Aluno = lazy(() => import("../routes/Aluno"));
const Professor = lazy(() => import("../routes/Professor"));
const Nav = lazy(() => import("./Nav"));

function Admin() {
  const [page, setPage] = createSignal("presenca");
  const { refetch, alunos, classes, presencas, professores } = useSheet();
  const setIsLoading = useIsLoading();
  const { hideDialog } = useDialog();

  function refetchAll() {
    refetch.alunos();
    refetch.classes();
    refetch.presencas();
    refetch.professores();
    hideDialog();
    setIsLoading(true);
  }

  createEffect(() => {
    const allReady =
      !alunos.loading &&
      !classes.loading &&
      !presencas.loading &&
      !professores.loading;
    if (allReady) {
      setIsLoading(false);
    }
  });

  return (
    <>
      <ActionButton
        actions={{
          atualizar: refetchAll,
          adicionar: () => alert("Ainda não implementado"),
        }}
      />
      <div class="flex flex-col justify-center items-center w-1/1 max-w-3xl mb-20">
        <Switch>
          <Match when={page() === "presenca"}>
            <Presenca />
          </Match>
          <Match when={page() === "aluno"}>
            <Aluno />
          </Match>
          <Match when={page() === "professor"}>
            <Professor />
          </Match>
        </Switch>
      </div>
      <Nav
        actions={[
          {
            label: "Presença",
            onClick: () => setPage("presenca"),
            selected: page() === "presenca",
          },
          {
            label: "Aluno",
            onClick: () => setPage("aluno"),
            selected: page() === "aluno",
          },
          {
            label: "Professor",
            onClick: () => setPage("professor"),
            selected: page() === "professor",
          },
        ]}
      />
    </>
  );
}
export default Admin;
