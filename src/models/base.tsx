import { getRef as getEscolaRef } from "./escola";
import { DocumentReference } from "firebase/firestore";
import firestore, { CollectionRequest, DocumentRequest } from "./firestore";

type IdOrRefType = string | DocumentReference;

export class Base {
  ref?: DocumentReference;
  get id() {
    return this.ref?.id;
  }

  protected static _pathSaved?: string;
  protected static _folder?: string;

  static get _path() {
    if (this._pathSaved) {
      return this._pathSaved;
    }
    if (!this._folder) {
      throw new Error("Folder not defined");
    }
    this._pathSaved = `${getEscolaRef().path}${this._folder}`;
    return this._pathSaved;
  }

  static _coll<T = typeof this, U extends typeof Base = typeof Base>(this: U) {
    return firestore<CollectionRequest<T>>(this._path);
  }

  static _doc<T = typeof this, U extends typeof Base = typeof Base>(
    this: U,
    idOrRef?: IdOrRefType
  ) {
    if (!idOrRef) {
      throw new Error("Requesting doc without ref or id");
    }
    if (idOrRef instanceof DocumentReference) {
      const ref = idOrRef as DocumentReference;
      return firestore<DocumentRequest<T>>(ref);
    } else {
      const id = idOrRef as string;
      const path = this._path + (id ? `/${id}` : "");
      return firestore<DocumentRequest<T>>(path);
    }
  }

  static list<T extends typeof Base>(this: T) {
    return this._coll().get() as Promise<T[]>;
  }

  static async create<T extends typeof Base, U extends Base>(
    this: T,
    content: U
  ) {
    const other = new this(content);
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
      this._doc<T>(ref)?.rm();
    } else {
      const id = idOrRef;
      this._doc<T>(id)?.rm();
    }
  }

  static async clear<T extends typeof Base>(this: T) {
    this.rm(Object.keys(await this.list()));
  }

  static async get<U extends Base>(idOrRef: IdOrRefType) {
    if (idOrRef instanceof DocumentReference) {
      const ref = idOrRef;
      const base = await this._doc<U>(ref).get();
      if (base) {
        base.ref = ref;
        return base;
      }
    } else {
      const id = idOrRef;
      const req = this._doc<U>(id);
      const base = await req.get();
      if (base) {
        base.ref = req.ref;
        return base;
      }
    }
  }

  #toRemote() {
    // Returns 'this' with local fields dropped
    return Object.assign({ ...this }, { ref: null });
  }

  _assign<T extends Base>(this: T, other: Partial<T>) {
    if (other.id && !other.ref) {
      other.ref = this._doc().ref;
    }
    Object.assign(this, other);
  }

  constructor(other: Base) {
    this._assign(other as any);
  }

  _doc<T extends Base, U extends typeof Base>(this: T) {
    const self = this.constructor as U;
    return self._doc<DocumentRequest<T>>(this.ref);
  }

  async push<U extends typeof Base>() {
    if (this.ref) {
      await this._doc().set(this.#toRemote());
    } else {
      const self = this.constructor as U;
      this.ref = await self._coll().add(this.#toRemote());
    }
  }

  async pull<T extends typeof Base>() {
    const self = this.constructor as T;
    const other = await self._doc<this>(this.ref).get();
    if (other) {
      this._assign(other);
    }
  }

  async update<T extends Base>(this: T, other: Partial<T>) {
    this._assign(other);
    await this.push();
  }

  async rm<T extends typeof Base>() {
    const self = this.constructor as T;
    this.ref && (await self._doc<this>(this.ref).rm());
  }
}

export default Base;
