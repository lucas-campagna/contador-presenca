import Base from "./base";

class Aluno extends Base {
  nome = "";
  
  protected static _folder = "/alunos";
  
  async rename(nome: string) {
    await this.update({ nome } as Aluno);
  }
}

if (process.env.NODE_ENV === "development") {
  (window as any).Aluno = Aluno;
}

export default Aluno;
