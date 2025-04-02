import { Resource, useContext } from "solid-js";
import { sheetContext } from "../context/Sheet";
import { createDelayedCallbackPools } from "../utils/delayedCallbackPool";
import { createLocalFirstResources } from "../utils/localFirst";
import Sheet from "@lprett/gsheetdb";

export type TAluno = {
  id?: string;
  nome: string;
  telefone?: string;
};

export type TClasse = {
  id?: string;
  tema: string;
  aluno: TAluno[];
};

export type TPresenca = {
  id?: string;
  dia: string;
  aluno: string;
};

export type TProfessor = {
  id?: string;
  nome: string;
  classe: string & TClasse;
  _user?: string;
};

export type TMe = {
  id?: string;
  token: string;
  permission: string;
  read: string[];
  write: string[];
  delete: string[];
};

function useSheet() {
  const sheet = useContext(sheetContext);

  const {
    me: [me, { refetch: refetchMe }],
    alunos: [alunos, { refetch: refetchAlunos }],
    presencas: [presencas, { refetch: refetchPresencas }],
    professores: [professores, { refetch: refetchProfessores }],
    classes: [classes, { refetch: refetchClasses }],
  } = createLocalFirstResources(sheet, {
    tables: { fetcher: (sheet: Sheet) => sheet.get(), initialValue: {} },
    me: { fetcher: (sheet: Sheet) => sheet.me(), initialValue: {} as TMe },
    alunos: {
      fetcher: (sheet: Sheet) => sheet.get("aluno"),
      initialValue: [] as TAluno[],
    },
    // TODO: internationalize "presencas"
    presencas: {
      fetcher: (sheet: Sheet) => sheet.get("presença", { _deep: false }),
      initialValue: [] as TPresenca[],
    },
    professores: {
      fetcher: (sheet: Sheet) => sheet.get("professor"),
      initialValue: [] as TProfessor[],
    },
    classes: {
      fetcher: (sheet: Sheet) => sheet.get("classe"),
      initialValue: [] as TClasse[],
    },
  });

  // TODO: internationalize "aluno"
  // TODO: type students here
  const [addAluno, changeAluno, addProfessor, addPresenca, rmPresenca] =
    createDelayedCallbackPools([
      {
        check: (aluno: TAluno) => !aluno?.id,
        call: (alunos: TAluno[]) => {
          sheet().set("aluno", alunos as any[]);
          refetchAlunos();
        },
      },
      {
        check: (aluno: TAluno) => !!aluno?.id,
        call: (alunos: TAluno[]) => {
          sheet().set("aluno", alunos as any[]);
          refetchAlunos();
        },
      },
      {
        check: (professor: any) => !professor?.id,
        call: (professores: any[]) => {
          sheet().set("professor", professores);
          refetchProfessores();
        },
      },
      {
        check: (presenca: any) => !presenca?.id,
        call: (presencas: any[]) => {
          sheet().set("presença", presencas);
          refetchPresencas();
        },
      },
      {
        check: (presencaId: TPresenca["id"]) => !!presencaId,
        call: (presencasId: TPresenca["id"][]) => {
          sheet().rm("presença", presencasId as string[]);
          refetchPresencas();
        },
      },
    ]);

  async function syncPresenca(dia: Date, alunosId: TAluno["id"][]) {
    const cloudPresenca = await sheet().get("presença");
    const idOfPresencasToRemove = cloudPresenca
      .filter(({ aluno }) => !alunosId.includes(aluno))
      .map(({ id }) => id);
    if (idOfPresencasToRemove.length > 0) {
      await sheet().rm("presença", idOfPresencasToRemove as string[]);
    }
    const newPresencas = alunosId.map(
      (aluno) => ({ dia: dia.toISOString(), aluno } as any)
    );
    if (newPresencas.length > 0) {
      await sheet().set(
        "presença",
        // TODO: "any" here is to fix the sheet.set API which is requiring "id" field
        newPresencas
      );
    }
    refetchPresencas();
  }

  return {
    changeAluno,
    addAluno,
    addProfessor,
    syncPresenca,
    me,
    alunos,
    presencas,
    professores,
    classes,
    refetch: {
      me: refetchMe,
      alunos: refetchAlunos,
      presencas: refetchPresencas,
      professores: refetchProfessores,
      classes: refetchClasses,
    },
  } as {
    changeAluno: (aluno: TAluno) => void;
    addAluno: (aluno: TAluno) => void;
    addProfessor: (professor: TProfessor) => void;
    syncPresenca: (dia: Date, alunosId: TAluno["id"][]) => void;
    me: Resource<TMe>;
    alunos: Resource<TAluno[]>;
    presencas: Resource<TPresenca[]>;
    professores: Resource<TProfessor[]>;
    classes: Resource<TClasse[]>;
    refetch: {
      me: () => void;
      alunos: () => void;
      presencas: () => void;
      professores: () => void;
      classes: () => void;
    };
  };
}
export default useSheet;
