import { useContext } from "solid-js";
import { sheetContext } from "../context/Sheet";
import { createDelayedCallbackPools } from "../utils/delayedCallbackPool";
import { createLocalFirstResources } from "../utils/localFirst";
import Sheet from "@lprett/gsheetdb";

type TStudent = any;

function useSheet() {
  const sheet = useContext(sheetContext);

  const {
    tables: [tables, { refetch: refetchTables }],
    me: [me, { refetch: refetchMe }],
    alunos: [alunos, { refetch: refetchAlunos }],
    presenca: [presenca, { refetch: refetchPresenca }],
  } = createLocalFirstResources(sheet, {
    tables: (sheet: Sheet) => sheet.get?.(),
    me: (sheet: Sheet) => sheet.me?.(),
    alunos: (sheet: Sheet) => sheet.get?.("aluno"),
    presenca: (sheet: Sheet) => sheet.get?.("presenca"),
    }
  );

  // TODO: internationalize "aluno"
  // TODO: type students here
  const [addStudent, modifyStudent] = createDelayedCallbackPools([
    {
      check: (student: TStudent) => !student?.id,
      call: (students: TStudent[]) => {
        sheet().set("aluno", students);
        refetchAlunos();
      },
    },
    {
      check: (student: TStudent) => !!student?.id,
      call: (students: TStudent[]) => {
        sheet().set("aluno", students);
        refetchAlunos();
      },
    },
  ]);

  return {
    modifyStudent,
    addStudent,
    tables,
    me,
    alunos,
    presenca,
    refetch: {
      tables: refetchTables,
      me: refetchMe,
      alunos: refetchAlunos,
      presenca,
      refetchPresenca,
    },
  };
}
export default useSheet;
