import { Resource, useContext } from "solid-js";
import { sheetContext } from "../context/Sheet";
import { createDelayedCallbackPools } from "../utils/delayedCallbackPool";
import { createLocalFirstResources } from "../utils/localFirst";
import Sheet from "@lprett/gsheetdb";

export type TStudent = {
  id?: string | number;
  nome: string;
  telefone?: string;
  classe: string;
};

function useSheet() {
  const sheet = useContext(sheetContext);

  const {
    me: [me, { refetch: refetchMe }],
    alunos: [alunos, { refetch: refetchAlunos }],
    presencas: [presencas, { refetch: refetchPresencas }],
    professor: [professor, { refetch: refetchProfessor }],
  } = createLocalFirstResources(sheet, {
    tables: (sheet: Sheet) => sheet.get(),
    me: (sheet: Sheet) => sheet.me(),
    alunos: (sheet: Sheet) => sheet.get("aluno"),
    // TODO: internationalize "presencas"
    presencas: (sheet: Sheet) => sheet.get("presença"),
    professor: (sheet: Sheet) => sheet.get("professor"),
  }
  );

  // TODO: internationalize "aluno"
  // TODO: type students here
  const [
    addAluno,
    changeAluno,
    addProfessor,
    addPresenca,
    rmPresenca,
  ] = createDelayedCallbackPools([
    {
      check: (aluno: TStudent) => !aluno?.id,
      call: (alunos: TStudent[]) => {
        sheet().set("aluno", alunos as any[]);
        refetchAlunos();
      },
    },
    {
      check: (aluno: TStudent) => !!aluno?.id,
      call: (alunos: TStudent[]) => {
        sheet().set("aluno", alunos as any[]);
        refetchAlunos();
      },
    },
    {
      check: (professor: any) => !professor?.id,
      call: (professor: any[]) => {
        sheet().set("professor", professor);
        refetchProfessor();
      },
    },
    {
      check: (presenca: any) => !presenca?.id,
      call: (presenca: any[]) => {
        sheet().set("presença", presenca);
        refetchPresencas();
      }
    },
    {
      check: (presenca: any) => !!presenca?.id,
      call: (presenca: any[]) => {
        sheet().rm("presença", presenca);
        refetchPresencas();
      }
    }
  ]);

  return {
    changeAluno,
    addAluno,
    addProfessor,
    addPresenca,
    rmPresenca,
    me,
    alunos,
    presencas,
    professor,
    refetch: {
      me: refetchMe,
      alunos: refetchAlunos,
      presencas: refetchPresencas,
      professor: refetchProfessor,
    },
  } as {
    changeAluno: (aluno: TStudent) => void;
    addAluno: (aluno: TStudent) => void;
    addProfessor: (professor: any) => void;
    addPresenca: (presenca: any) => void;
    rmPresenca: (presenca: any) => void;
    me: Resource<any>;
    alunos: Resource<TStudent[]>;
    presencas: Resource<any[]>;
    professor: Resource<any>;
    refetch: {
      me: () => void;
      alunos: () => void;
      presencas: () => void;
      professor: () => void;
    };
  };
}
export default useSheet;
