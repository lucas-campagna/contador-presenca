import { AlunoKeyType, ClasseType, RequestedClasseType } from "../types";
import useAuth from "./useAuth";
import useFirestore, { SearchDocument } from "./useFirestore";
import { useEffect, useMemo, useState } from "react";
import { formatDate, generateKey } from "../utils";

export default function useProfessor() {
    const { user } = useAuth();
    const { get: getClasse, set: updateClasse } = useFirestore<SearchDocument<RequestedClasseType>>(user?.classes?.[0]);
    const date = useMemo(() => formatDate(), []);
    const [classe, setClasse] = useState<ClasseType | null>(null);

    useEffect(() => {
        async function buildNewClasse() {
            if (user?.classes?.[0]) {
                const classe = await getClasse();
                async function renameAluno(key: AlunoKeyType, aluno: string) {
                    classe.alunos[key] = aluno;
                    await updateClasse(classe);
                    setClasse(c => c ? { ...c, alunos: classe.alunos } : c);
                }

                setClasse({
                    ...classe,
                    presencas: classe.presencas[date] ?? [],
                    renameAluno,
                    addAluno: async (aluno: string) => {
                        const key = generateKey();
                        renameAluno(key, aluno);
                    },
                    rmAluno: async (key: AlunoKeyType) => {
                        delete classe.alunos[key];
                        await updateClasse(classe);
                        setClasse(c => c ? { ...c, alunos: classe.alunos } : c);
                    },

                    addPresenca: async (alunoKey: AlunoKeyType) => {
                        if (!classe.presencas[date]) {
                            classe.presencas[date] = [alunoKey];
                        } else {
                            classe.presencas[date].push(alunoKey);
                        }
                        await updateClasse(classe);
                        setClasse(c => c ? { ...c, presencas: classe.presencas[date] } : c);
                    },
                    rmPresenca: async (alunoKey: AlunoKeyType) => {
                        if (!classe.presencas[date]) {
                            return;
                        }
                        const index = classe.presencas[date].indexOf(alunoKey);
                        if (index > -1) {
                            classe.presencas[date].splice(index, 1);
                            setClasse(c => c ? { ...c, presencas: classe.presencas[date] } : c);
                            await updateClasse(classe);
                        }
                    },
                });
            }
        }
        buildNewClasse();
    }, [user]);

    return {
        ...user,
        classe,
    };
}