import { getRef as getEscolaRef } from "./escola";
import { DocumentReference } from "firebase/firestore";
import firestore, { CollectionRequest, DocumentRequest } from "./firestore";
import { InvalidReferenceToFirestore } from "../errors";

type IdOrRefType = string | DocumentReference;

class Base {
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
      throw InvalidReferenceToFirestore();
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
      throw InvalidReferenceToFirestore();
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

  static async list<T extends typeof Base, U extends Base>(this: T): Promise<U[]> {
    return Promise.all((await this._coll().docsRef()).map(d => this.get<T, U>(d)));
  }

  static async create<T extends typeof Base, U extends Base>(
    this: T,
    content: U
  ) {
    const other = await this.build(content);
    await other?.push();
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

  static async get<T extends typeof Base, U extends Base>(
    this: T,
    idOrRef: IdOrRefType
  ): Promise<U> {
    if (idOrRef instanceof DocumentReference) {
      const ref = idOrRef;
      const obj = await this._doc<U>(ref).get();
      if (obj) {
        obj.ref = ref;
        return this.build(obj);
      }
    } else if(typeof idOrRef === 'string') {
      const id = idOrRef;
      const req = this._doc<U>(id);
      const obj = await req.get();
      if (obj) {
        obj.ref = req.ref;
        return this.build(obj);
      }
    }
    throw InvalidReferenceToFirestore();
  }

  static async build<T extends typeof Base, U extends Base>(
    this: T,
    other: U
  ): Promise<U> {
    const r = new this();
    r._assign(other as any);
    return r as U;
  }

  async _toRemote<T extends Base>(this: T): Promise<this> {
    return { ...this, ref: null };
  }
  async _fromRemote(other: object): Promise<typeof this> {
    return other as typeof this;
  }

  _assign<T extends Base>(this: T, other: Partial<T>): void {
    if (other.id && !other.ref) {
      other.ref = this._doc().ref;
    }
    Object.assign(this, other);
  }

  _doc<T extends Base, U extends typeof Base>(this: T) {
    const self = this.constructor as U;
    return self._doc<T>(this.ref);
  }

  async push<U extends typeof Base>() {
    if (this.ref) {
      await this._doc().set(await this._toRemote());
    } else {
      const self = this.constructor as U;
      this.ref = await self._coll().add(await this._toRemote());
    }
  }

  async pull<T extends typeof Base>() {
    const self = this.constructor as T;
    const other = await self._doc<this>(this.ref).get();
    if (other) {
      this._assign(await this._fromRemote(other));
    }
  }

  async update<T extends Base>(this: T, other: Partial<T>) {
    this._assign(await this._fromRemote(other));
    await this.push();
  }

  async rm<T extends typeof Base>() {
    const self = this.constructor as T;
    this.ref && (await self._doc<this>(this.ref).rm());
  }
}

if (process.env.NODE_ENV === "development") {
  (window as any).Base = Base;
}

export default Base;
