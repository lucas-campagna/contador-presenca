import { Accessor, createMemo } from "solid-js";
import useSheet, { TStudent } from "../hooks/useSheet";
import useDialog from "../hooks/useDialog";

function Admin(props: any) {
    const { presencas, professor } = useSheet();

    const setContent = useDialog();

    setContent(<div>Adicionar Aluno</div>);

    const classe = createMemo(() => professor()?.classe);
    const alunos = createMemo(() => classe?.()?.aluno?.split(','));

    return (
        <div class="flex flex-col justify-center items-center w-1/1 max-w-3xl">
            <div class="flex flex-col justify-center items-center w-1/1 h-1/1">
                {JSON.stringify(professor())}
                <div class="flex flex-row gap-4">
                    <button>Adicionar Aluno</button>
                    <button>Adicionar Professor</button>
                </div>
            </div>
        </div>
    );
}
export default Admin;