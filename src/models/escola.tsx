import { getAuth } from "firebase/auth";
import { DocumentReference } from "firebase/firestore";
import firestore, { DocumentRequest } from "./firestore";
import Base from "./base";
import { DataBaseError, NotSignedIn } from "../errors";

// TODO
// @ts-ignore
class Escola extends Base {
  nome = "";

  protected static _savedRef?: DocumentReference;
  protected static _folder = "/escolas";

  static get _path() {
    if (!this._folder) {
      throw DataBaseError();
    }
    if (!this._pathSaved) {
      this._pathSaved = Escola.ref.path;
    }
    return this._pathSaved;
  }

  static get ref() {
    if (Escola._savedRef) {
      return Escola._savedRef;
    }
    const auth = getAuth();
    const uid = auth.currentUser?.uid as string;
    if (!uid) {
      throw NotSignedIn();
    }
    Escola._savedRef = firestore<DocumentRequest>(`escolas/${uid}`).ref;
    return Escola._savedRef;
  }

  static async get<T extends typeof Escola, U extends Escola>(
    this: T
  ): Promise<U> {
    return super.get(Escola.ref) as Promise<U>;
  }

  static async set<T extends typeof Escola, U extends Escola>(
    this: T,
    content: U
  ) {
    // TODO
    // @ts-ignore
    await this.create(content);
  }

  static async build<T extends typeof Escola, U extends Escola>(
    this: T,
    other: U
  ): Promise<Escola> {
    const r = await super.build(other);
    r.ref = Escola.ref;
    return r;
  }


  async rename(nome: string) {
    await this.update({ nome } as Partial<Escola>);
  }
}

export const getRef = () => Escola.ref;

if (process.env.NODE_ENV === "development") {
  (window as any).Escola = Escola;
}

export default Escola;
