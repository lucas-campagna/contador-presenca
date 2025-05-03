import { useCallback, useEffect, useState } from "react";
import Aluno from "../../models/aluno";
import ListItem from "../../components/ListItem";
import Button from "../../components/Button";
import useDialog from "../../hooks/useDialog";
import Input from "../../components/Input";
import Select from "../../components/Select";
import CardInfo from "../../components/DialogInfo";
import FormList from "../../components/FormList";

function Alunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const { setDialog, closeDialog } = useDialog();

  const fetchAlunos = () => {
    Aluno.list().then((alunos) => setAlunos(alunos as Aluno[]));
    closeDialog();
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleClickAluno = useCallback((aluno: Aluno) => {
    setDialog(
      <CardInfo
        header="Aluno"
        body={[aluno.nome, aluno.sexo as string]}
        actions={[
          {
            text: "Remover",
            onClick: () => {
              aluno.rm();
              closeDialog();
              fetchAlunos();
            },
          },
        ]}
      />
    );
  }, []);

  function handleAddAluno() {
    async function handleSubmit(data: any) {
      const { nome, sexo } = data;
      if (nome) {
        // TODO: fix to remove as Aluno
        await Aluno.create({ nome, sexo } as Aluno);
        closeDialog();
        fetchAlunos();
      }
    }
    setDialog(
      <FormList
        title={"Adicionar Aluno"}
        fields={[
          { name: "nome", type: Input, label: "Nome" },
          { name: "sexo", type: Select, options: ["", "Masculino", "Feminino"] },
        ]}
        submitText="Salvar"
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <ListItem>
      <>
        {alunos
          .sort((a, b) => (a.nome < b.nome ? -1 : 0))
          .map((aluno) => (
            <Button
              text={aluno.nome}
              key={aluno.id}
              onClick={() => handleClickAluno(aluno)}
            />
          ))}
        <Button text="+" onClick={handleAddAluno} />
      </>
    </ListItem>
  );
}

export default Alunos;
