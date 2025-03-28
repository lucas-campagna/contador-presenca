import { ResourceReturn, useContext } from "solid-js";
import { sheetContext } from "../context/Sheet";
import { createDelayedCallbackPools } from "../utils/delayedCallbackPool";
import createLocalFirstResource from "../utils/localFirst";

type TSheet = any;
type TStudent = any;
type TSources = {
  name: string;
  callback: (s: TSheet) => ResourceReturn<TSheet>;
};

function useSheet() {
  const sheet = useContext(sheetContext);

  const createLocalFirstResources = (sources: TSources[]) =>
    sources.map(({ name, callback }) =>
      createLocalFirstResource(name, sheet, callback)
    );

  const [
    [tables, { refetch: refetchTables }],
    [me, { refetch: refetchMe }],
    [alunos, { refetch: refetchAlunos }],
  ] = createLocalFirstResources([
    { name: "tables", callback: (sheet: any) => sheet.get?.() },
    { name: "me", callback: (sheet: any) => sheet.me?.() },
    { name: "alunos", callback: (sheet: any) => sheet.get?.("aluno") },
  ]);

  // TODO: internationalize "aluno"
  // TODO: type students here
  const [addStudent, modifyStudent] = createDelayedCallbackPools([
    {
      check: (student: TStudent) => !student?.id,
      call: (students: TStudent[]) => sheet().set("aluno", students),
    },
    {
      check: (student: TStudent) => !!student?.id,
      call: (students: TStudent[]) => sheet().set("aluno", students),
    },
  ]);

  return {
    modifyStudent,
    addStudent,
    tables,
    me,
    alunos,
    refetch: {
      tables: refetchTables,
      me: refetchMe,
      alunos: refetchAlunos,
    },
  };
}
export default useSheet;
