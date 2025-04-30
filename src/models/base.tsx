import { getRef as getEscolaRef } from "./escola";
import { DocumentReference } from "firebase/firestore";
import firestore, { CollectionRequest, DocumentRequest } from "./firestore";

type IdOrRefType = string | DocumentReference;

export class Base {
  id?: string = undefined;
  ref?: DocumentReference;

  protected static _pathSaved?: string;
  protected static _folder?: string;

  static get _path() {
    if (this._pathSaved) {
      return this._pathSaved;
    }
    if (!this._folder) {
      throw "Folder not defined";
    }
    this._pathSaved = `${getEscolaRef().path}${this._folder}`;
    return this._pathSaved;
  }

  static _coll<T extends typeof Base, U = any>(this: T) {
    return firestore<CollectionRequest<U>>(this._path);
  }

  static _doc<T extends typeof Base, U = any>(this: T, idOrRef: IdOrRefType) {
    if (idOrRef instanceof DocumentReference) {
      const ref = idOrRef as DocumentReference;
      return firestore<DocumentRequest<U>>(ref);
    } else {
      const id = idOrRef as string;
      const path = this._path + (id ? `/${id}` : "");
      return firestore<DocumentRequest<U>>(path);
    }
  }

  static list<T extends typeof Base>(this: T) {
    return this._coll().get() as Promise<T[]>;
  }

  static async create<T extends typeof Base, U extends Base>(
    this: T,
    content: U
  ) {
    const Constructor = this;
    const other = new Constructor(content);
    await other.push();
    return other;
  }

  static rm<T extends typeof Base>(
    this: T,
    idOrRef: IdOrRefType | IdOrRefType[]
  ) {
    if (Array.isArray(idOrRef)) {
      // NOTE: 'forEach(this.rm)' calls 'this.rm' with 'this === undefined'
      idOrRef.forEach((e) => this.rm(e));
      return;
    }
    if (idOrRef instanceof DocumentReference) {
      const ref = idOrRef;
      this._doc<T>(ref).rm();
    } else {
      const id = idOrRef;
      this._doc<T>(id).rm();
    }
  }

  static async clear<T extends typeof Base>(this: T) {
    this.rm(Object.keys(await this.list()));
  }

  static async get<T extends typeof Base>(this: T, idOrRef: IdOrRefType) {
    if (idOrRef instanceof DocumentReference) {
      const ref = idOrRef;
      const aluno = await this._doc<T>(ref).get();
      if (aluno) {
        aluno.id = ref.id;
        return new this(aluno);
      }
    } else {
      const id = idOrRef;
      const aluno = await this._doc<T>(id).get();
      if (aluno) {
        aluno.id = id;
        return new this(aluno);
      }
    }
  }

  #ref() {
    return (this.ref ?? this.id) as DocumentReference | string;
  }

  #toRemote() {
    // 'this' with local fields dropped
    return Object.assign({ ...this }, { ref: null, id: null });
  }

  constructor(other: Base) {
    Object.assign(this, other);
  }

  async push<T extends typeof Base>() {
    const self = this.constructor as T;
    if (this.ref || this.id) {
      await self._doc<T>(this.#ref()).set(this.#toRemote());
    } else {
      this.ref = await self._coll().add(this.#toRemote());
      this.id = this.ref.id;
    }
  }

  async pull<T extends typeof Base>() {
    const self = this.constructor as T;
    const other = await self._doc<T>(this.#ref()).get();
    Object.assign(this, other);
  }

  async update<T extends Base>(other: Partial<T>) {
    Object.assign(this, other);
    await this.push();
  }

  async rm<T extends typeof Base>() {
    const self = this.constructor as T;
    this.#ref() && (await self._doc(this.#ref()).rm());
  }
}

export default Base;
