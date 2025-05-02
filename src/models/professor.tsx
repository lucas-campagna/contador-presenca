import { DocumentReference } from "firebase/firestore";
import Classe from "./classe";
import Base from "./base";

type ClasseRef = DocumentReference;
type ProfessorRemote = Professor & {
  classes: ClasseRef[];
}

class Professor extends Base {
  nome = "";
  classes: Classe[] = [];

  protected static _folder = "/professores";

  async rename(nome: string) {
    await this.update<Professor>({ nome });
  }

  async attachClasse(classes: Classe | Classe[]) {
    classes = Array.isArray(classes) ? classes : [classes];
    const alunosId = this.classes.map((classe) => classe.ref).filter(Boolean);
    this.classes = [
      ...this.classes,
      ...classes.filter((classe) => !classe.ref || !alunosId.includes(classe.ref)),
    ];
  }

  async detachClasse(classes: Classe | Classe[]) {
    classes = Array.isArray(classes) ? classes : [classes];
    const alunosId = classes.map((classe) => classe.ref).filter(Boolean);
    this.classes = this.classes.filter(
      (classe) => !classe.ref || !alunosId.includes(classe.ref)
    );
  }

  async _toRemote(): Promise<this> {
    return {
      ...(await super._toRemote()),
      classes: await Promise.all(
        this.classes.map(
          async (a) => a.ref ?? (((await a.push()) as undefined) || a.ref)
        )
      ),
    };
  }

  async _fromRemote(other: object): Promise<typeof this> {
    const classeRemote = (await super._fromRemote(other)) as any as ProfessorRemote;
    return {
      ...classeRemote,
      classes: await Promise.all((classeRemote.classes as ClasseRef[]).map(ref => Classe.get(ref)))
    } as typeof this;
  }
}

if (process.env.NODE_ENV === "development") {
  (window as any).Professor = Professor;
}

export default Professor;
