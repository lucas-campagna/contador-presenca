import { getAuth } from "firebase/auth";
import { DocumentReference } from "firebase/firestore";
import firestore, { DocumentRequest } from "./firestore";

import Base from "./base";

class Escola extends Base {
  nome = "";

  protected static _savedRef?: DocumentReference;
  protected static _folder = "/escolas";

  static get _path() {
    if (!this._folder) {
      throw "Folder not defined";
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
      throw "Não logou ainda";
    }
    Escola._savedRef = firestore<DocumentRequest>(`escolas/${uid}`).ref;
    return Escola._savedRef;
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
