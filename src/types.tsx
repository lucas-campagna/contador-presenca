import { DocumentData, DocumentReference } from "firebase/firestore"
type Modify<T, R> = Omit<T, keyof R> & R;

export type User = {
    token: string,
    papel: string,
    nome: string,
    classes: DocumentReference<DocumentData, DocumentData>[],
}

export type AdminUser = User | {
    addClasse: (classe: ClasseType) => Promise<void>,
}

export type ClasseType = Modify<RequestedClasseType, {
    presencas: string[],
    renameAluno: (key: string, aluno: string) => Promise<void>,
    addAluno: (aluno: string) => Promise<void>,
    rmAluno: (key: string) => Promise<void>,
    addPresenca: (key: string) => Promise<void>,
    rmPresenca: (key: string) => Promise<void>,
}>

export type RequestedClasseType = {
    nome: string;
    alunos: { [key: AlunoKeyType]: string };
    presencas: { [key: string]: AlunoKeyType[] };
}

export type ProfessorUser = User & {
    classe: ClasseType | void,
}

export type AlunoKeyType = string;
