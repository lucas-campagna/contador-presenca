import { createMemo, createSignal, lazy } from "solid-js";
import useSheet, { TClasse } from "../hooks/useSheet";
import RelationalTable from "../components/RelationalTable";
import { getTime } from "../utils/time";

const Header = lazy(() => import("../components/Header"));

function Presenca() {
  const { presencas, classes } = useSheet();
  const [classe, setClasse] = createSignal<TClasse>(classes()?.[0] as TClasse);

  function handleSelectClassByTema(tema: string) {
    const newClasse = (classes() ?? []).find((classe) => classe.tema === tema);
    if (newClasse) {
      setClasse(newClasse);
    }
  }

  const temaClasses = createMemo(() =>
    (classes() ?? [])?.map((item) => item.tema)
  );

  const presencasClasse = createMemo(() =>
    (presencas() ?? [])
      .filter((presenca) =>
        classe()
          ?.aluno.map(({ id }) => id)
          .includes(presenca.aluno)
      )
      ?.sort((a, b) => getTime(a.dia) - getTime(b.dia))
  );

  return (
    <>
      <Header items={temaClasses} onClick={handleSelectClassByTema} />
      <div class="overflow-hidden  size-1/1 mt-12 p-1">
        <div class="overflow-auto">
          <RelationalTable
            column="dia"
            row="aluno"
            cell={(items) => (items?.length ? "x" : null)}
            class={{
              cell: "",
              cols: "bg-gray-100 px-1",
              rows: "bg-gray-100",
            }}
            items={presencasClasse}
            fallback="Nenhuma presença registrada ainda."
          />
        </div>
      </div>
    </>
  );
}
export default Presenca;
