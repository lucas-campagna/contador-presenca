import Base from "./base";

class Aluno extends Base {
  nome = "";
  
  protected static _folder = "/alunos";
  
  async rename(nome: string) {
    // TODO: tem como remover o "as Partial<Aluno>"?
    await this.update({ nome } as Partial<Aluno>);
  }
}

if (process.env.NODE_ENV === "development") {
  (window as any).Aluno = Aluno;
}

export default Aluno;