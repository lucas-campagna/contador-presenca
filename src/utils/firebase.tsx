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

type Reference = string | CollectionReference | DocumentReference | void;
export type CollectionRequest<T = any> = {
  get: (docName: string) => Promise<T>;
  set: (docName: string, content: T) => Promise<void>;
  add: (content: T) => Promise<DocumentReference>;
  getAll: () => Promise<T[]>;
  rm: (docName: string) => Promise<void>;
};
export type DocumentRequest<T = any> = {
  get: () => Promise<T>;
  set: (content: T) => Promise<void>;
  rm: () => Promise<void>;
};

const isDocumentPath = (path: string) => path.split("/").length % 2 === 0;

export default function firestore<T>(ref: Reference): T {
  const db = getFirestore(getApp());
  ref =
    typeof ref === "string"
      ? isDocumentPath(ref)
        ? doc(db, ref)
        : collection(db, ref)
      : ref;
  if (ref instanceof CollectionReference) {
    const getAll = async () =>
      (await getDocs(ref as CollectionReference)).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    const get = async (docName: string) =>
      (await getDoc(doc(db, ref.path, docName))).data();
    const add = async (content: any) => await addDoc(ref, content);
    const set = async (docName: string, content: any) =>
      setDoc(doc(db, ref.path, docName), content);

    return { get, set, add, getAll } as T;
  } else if (ref instanceof DocumentReference) {
    const get = async () => {
      const snap = await getDoc(ref);
      return snap.exists() ? snap.data() : null;
    };
    const set = (content: any) => setDoc(ref, content);
    const rm = () => deleteDoc(ref);
    return { get, set, rm } as T;
  }
  console.error("Invalid props type. Expected string or DocumentReference.");
  throw "Invalid props type. Expected string or DocumentReference.";
}

if (process.env.NODE_ENV === "development") {
  (window as any).firestore = firestore;
  (window as any).auth = getAuth();
}
