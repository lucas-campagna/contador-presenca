import { ReactNode, useEffect, useMemo, useRef } from "react";
import useDialog from "../hooks/useDialog";
import useProfessor from "../hooks/useProfessor";
import { formatDate } from "../utils";

function Presencas() {
  const today = useMemo(
    () => new Date().toLocaleString("pt-BR").split(",")[0],
    []
  );
  const { nome, classe } = useProfessor();
  const { setDialog, closeDialog } = useDialog();

  useEffect(() => {
    if (!classe) {
      setDialog(
        <div className="flex flex-col items-center justify-center text-center min-h-screen min-w-screen bg-gray-100">
          <p className="text-2xl">Carregando dados da classe...</p>
        </div>
      );
    } else {
      closeDialog();
    }
  }, [classe]);

  async function handleAddStudent() {
    const AddStudentDialog = () => {
      const ref = useRef(null);

      function handleAdd() {
        if ((ref.current as any)?.value) {
          classe?.addAluno?.((ref.current as any).value);
          closeDialog();
        }
      }
      return (
        <>
          <input
            ref={ref}
            type="text"
            placeholder="Nome do aluno"
            className="p-2 rounded-md border-2 border-gray-300"
          />
          <button
            className="bg-sky-500 text-white p-2 rounded-md mt-2"
            onClick={handleAdd}
          >
            Adicionar
          </button>
        </>
      );
    };
    setDialog(<AddStudentDialog />);
  }

  const Header = () => (
    <div className="flex flex-col items-center justify-center bg-sky-500 w-full py-2 text-white">
      <p className="text-sm capitalize">{nome}</p>
      <p className="text-md capitalize">{classe?.nome}</p>
      <p className="text-xl">{today}</p>
    </div>
  );

  const ListItem = ({
    item,
    checked,
    onClick,
  }: {
    item: string;
    checked?: boolean;
    onClick?: () => void;
  }) => (
    <div
      className={
        checked
          ? "flex flex-col items-center justify-center w-full p-2 rounded-lg bg-sky-500 text-white "
          : "flex flex-col items-center justify-center w-full p-2 rounded-lg bg-gray-300"
      }
      onClick={onClick}
    >
      {item}
    </div>
  );

  const List = () => (
    <div className="flex flex-col items-stretch gap-2 justify-start w-full p-2 pt-4 pb-20 overflow-y-auto">
      <>
        {classe?.alunos &&
          Object.entries(classe.alunos).map(([key, aluno]) => (
            <ListItem
              key={key}
              item={aluno}
              checked={classe.presencas.includes(key)}
              onClick={() => {
                if (classe.presencas.includes(key)) {
                  classe.rmPresenca(key);
                } else {
                  classe.addPresenca(key);
                }
              }}
            />
          ))}
      </>
      <ListItem item="+" checked onClick={handleAddStudent} />
    </div>
  );

  if (!classe) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen bg-gray-100 font-bold uppercase overflow-y-hidden">
      <Header />
      <List />
    </div>
  );
}
export default Presencas;
