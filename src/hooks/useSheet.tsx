import { useContext } from "solid-js";
import { sheetContext } from "../context/Sheet";
import { createDelayedCallbackPools } from "../utils/delayedCallbackPool";
import createLocalFirstResource from "../utils/localFirst";

type TStudent = any;

function useSheet() {
  const sheet = useContext(sheetContext);

  const [tables, { refetch: refetchTables }] = createLocalFirstResource(
    "tables",
    sheet,
    (sheet: any) => sheet.get?.()
  );

  const [me, { refetch: refetchMe }] = createLocalFirstResource(
    "me",
    sheet,
    (sheet: any) => sheet.me?.()
  );

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
    refetch: {
      tables: refetchTables,
      me: refetchMe,
    },
  };
}
export default useSheet;
