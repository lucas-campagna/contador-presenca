import { createEffect, createMemo, createSignal, For } from "solid-js";
import useSheet, { TAluno } from "../hooks/useSheet";
import ActionButton from "./ActionButton";
import useIsLoading from "../hooks/useIsloading";

function User() {
  const { professores, presencas, syncPresenca, refetch } = useSheet();
  const setIsLoading = useIsLoading();
  const alunos = createMemo(() => professores()?.[0]?.classe.aluno);
  const [selected, setSelected] = createSignal(
    presencas()?.map((p) => p.aluno) ?? []
  );
  const dia = new Date();
  const isSunday = true; //dia.getDay() === 0;

  setIsLoading(true);

  createEffect(() => {
    if (!presencas.loading) {
      setIsLoading(false);
      setSelected(presencas()?.map((p) => p.aluno) ?? []);
    } else {
      setIsLoading(true);
    }
  });

  function handleSelect(aluno: TAluno) {
    if (isSunday) {
      setSelected(
        selected().includes(aluno.id as string)
          ? selected().filter((id) => id !== aluno.id)
          : [...selected(), aluno.id as string]
      );
    } else {
      alert("Só é possível modificar no domingo");
    }
  }

  return (
    <div class="flex flex-col gap-3 p-3 w-1/1 items-stretch overflow-hidden">
      <div class="font-bold text-xl flex justify-center">
        {dia.toLocaleDateString("pt-BR")}
      </div>
      <div class="flex flex-col justify-start aligh-stretch gap-2 overflow-y-auto">
        <For each={alunos()} fallback={<div>Indisponível</div>}>
          {(aluno, index) => (
            <div
              class={
                selected().includes(aluno.id as string)
                  ? "bg-sky-500 text-white text-bold rounded-lg p-3 text-md"
                  : "bg-gray-200 rounded-lg p-3 text-md"
              }
              onClick={() => handleSelect(aluno)}
              data-index={index()}
            >
              {aluno.nome}
            </div>
          )}
        </For>
      </div>

      <ActionButton
        actions={{
          salvar: () => {
            setIsLoading(true);
            syncPresenca(dia, selected());
          },
          recarregar: () => {
            refetch.presencas();
            setIsLoading(true);
          },
        }}
        title={`Total: ${selected().length}`}
      />
    </div>
  );
}
export default User;
