import { DocumentReference } from "firebase/firestore";
import Aluno from "./aluno";
import Base from "./base";

type AlunoRef = DocumentReference;
type ClasseRemote = Classe & {
  alunos: AlunoRef[];
}

class Classe extends Base {
  nome = "";
  alunos: Aluno[] = [];

  protected static _folder = "/classes";

  async rename(nome: string) {
    await this.update<Classe>({ nome });
  }

  async attachAlunos(alunos: Aluno | Aluno[]) {
    alunos = Array.isArray(alunos) ? alunos : [alunos];
    const alunosId = this.alunos.map((aluno) => aluno.id).filter(Boolean);
    this.alunos = [
      ...this.alunos,
      ...alunos.filter((aluno) => !aluno.id || !alunosId.includes(aluno.id)),
    ];
  }

  async detachAlunos(alunos: Aluno | Aluno[]) {
    alunos = Array.isArray(alunos) ? alunos : [alunos];
    const alunosId = alunos.map((aluno) => aluno.id).filter(Boolean);
    this.alunos = this.alunos.filter(
      (aluno) => !aluno.id || !alunosId.includes(aluno.id)
    );
  }

  async _toRemote(): Promise<this> {
    return {
      ...(await super._toRemote()),
      alunos: await Promise.all(
        this.alunos.map(
          async (a) => a.ref ?? (((await a.push()) as undefined) || a.ref)
        )
      ),
    };
  }

  async _fromRemote(other: object): Promise<typeof this> {
    const classeRemote = (await super._fromRemote(other)) as any as ClasseRemote;
    return {
      ...classeRemote,
      alunos: await Promise.all((classeRemote.alunos as AlunoRef[]).map(ref => Aluno.get(ref)))
    } as typeof this;
  }
}

if (process.env.NODE_ENV === "development") {
  (window as any).Classe = Classe;
}

export default Classe;
