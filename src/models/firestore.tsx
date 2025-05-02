import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

type Reference = string | CollectionReference | DocumentReference;
export type CollectionRequest<T = any> = {
  ref: CollectionReference;
  docsRef: () => Promise<DocumentReference[]>;
  get: (docName?: string) => Promise<T | void>;
  set: (docName: string, content: T) => Promise<T>;
  add: (content: T) => Promise<DocumentReference>;
  rm: (docName: string) => Promise<void>;
};
export type DocumentRequest<T = any> = {
  ref: DocumentReference;
  get: () => Promise<T | void>;
  set: (content: T) => Promise<T>;
  rm: () => Promise<void>;
};

const isDocumentPath = (path: string) => path.split("/").length % 2 === 0;
const parseObject = (obj: any) =>
  Object.keys(obj).reduce(
    (acc, key) =>
      obj[key] !== undefined && obj[key] !== null
        ? { ...acc, [key]: obj[key] }
        : acc,
    {}
  );

export default function firestore<T>(ref: Reference): T {
  const db = getFirestore(getApp());
  ref =
    typeof ref === "string"
      ? isDocumentPath(ref)
        ? doc(db, ref)
        : collection(db, ref)
      : ref;
  if (ref instanceof CollectionReference) {
    const get = async (docName?: string) =>
      docName
        ? firestore(`${ref.path}/${docName}`)
        : (await getDocs(ref as CollectionReference)).docs.reduce(
            (acc, doc) => ({
              ...acc,
              [doc.id]: doc.data(),
            }),
            {}
          );
    const add = (content: any) => addDoc(ref, parseObject(content));
    const set = async (docName: string, content: any) => {
      const refDoc = doc(db, ref.path, docName);
      await setDoc(refDoc, parseObject(content));
      return refDoc;
    };
    const docsRef = async () => (await getDocs(ref as CollectionReference)).docs.map(d => d.ref);

    return { ref, docsRef, get, set, add } as T;
  } else if (ref instanceof DocumentReference) {
    const get = async () => {
      const snap = await getDoc(ref);
      return snap.exists() ? snap.data() : null;
    };
    const set = async (content: any) => {
      await setDoc(ref, parseObject(content));
      return ref;
    };
    const rm = () => deleteDoc(ref);
    return { ref, get, set, rm } as T;
  }
  throw "Invalid props type. Expected string or DocumentReference.";
}

if (process.env.NODE_ENV === "development") {
  (window as any).firestore = firestore;
  (window as any).auth = getAuth;
}
