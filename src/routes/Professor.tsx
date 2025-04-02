import { createEffect, createMemo, createSignal, For } from "solid-js";
import useSheet, { TClasse } from "../hooks/useSheet";
import Header from "../components/Header";

function Professor() {
  const { classes, professores } = useSheet();

  const [classe, setClasse] = createSignal(classes()?.[0] as TClasse);
  const professoresDaClasse = createMemo(() =>
    professores()?.filter((professor) => professor.classe === classe().id || professor.classe.id === classe().id)
  );

  const temaClasses = createMemo(() =>
    (classes() ?? [])?.map((item) => item.tema)
  );

  function handleSelectClassByTema(tema: string) {
    const newClasse = (classes() ?? []).find((classe) => classe.tema === tema);
    if (newClasse) {
      setClasse(newClasse as TClasse);
    }
  }

  return (
    <>
      <Header items={temaClasses} onClick={handleSelectClassByTema} />
      <div class="flex flex-col justify-stretch items-stretch mt-12 p-2 size-1/1 gap-1 overflow-y-auto">
        <For
          each={professoresDaClasse()}
          fallback={
            <div class="font-bold uppercase p-2 rounded-sm">
              Nenhum professor registrado
            </div>
          }
        >
          {(item, index) => (
            <div
              class="bg-sky-500 text-white font-bold uppercase p-2 rounded-sm"
              data-index={index()}
            >
              {item.nome}
            </div>
          )}
        </For>
      </div>
    </>
  );
}
export default Professor;
