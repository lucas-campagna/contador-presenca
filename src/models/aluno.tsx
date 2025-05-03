import Base from "./base";

class Aluno extends Base {
  nome = "";
  sexo? = "";

  protected static _folder = "/alunos";

  async rename(nome: string) {
    // TODO: tem como remover o "<Aluno>"?
    await this.update<Aluno>({ nome });
  }
}

if (process.env.NODE_ENV === "development") {
  (window as any).Aluno = Aluno;
}

export default Aluno;
