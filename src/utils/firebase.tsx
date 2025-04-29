import { getApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

type FirestoreProp =
  | string
  | DocumentReference<DocumentData, DocumentData>
  | void;
export type SearchCollection<T = any> = {
  get: (docName: string) => Promise<T>;
  set: (docName: string, content: T) => Promise<void>;
  add: (content: T) => Promise<DocumentReference<any, DocumentData>>;
  getAll: () => Promise<T[]>;
};
export type SearchDocument<T = any> = {
  get: () => Promise<T>;
  set: (content: T) => Promise<void>;
};

const isPathToDocument = (path: string) => path.split("/").length % 2 === 0;

export default function firestore<T = any>(props: FirestoreProp) {
  const db = getFirestore(getApp());
  if (typeof props === "string") {
    const collectionPath = props;
    const getAll = async () => {
      const ref = collection(db, collectionPath);
      const snap = await getDocs(ref);
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return data;
    };

    const get = async (docName: string) => {
      const ref = doc(db, collectionPath, docName);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        return null;
      }
      return snap.data() as any;
    };

    const add = async (content: any) => {
        if (isPathToDocument(collectionPath)) {
            const ref = doc(db, collectionPath);
            return await setDoc(ref, content);
        } else {
            const ref = collection(db, collectionPath);
            return await addDoc(ref, content);
        }
    };

    const set = async (docName: string, content: any) => {
      const ref = doc(db, collectionPath, docName);
      await setDoc(ref, content);
    };

    return { get, set, add, getAll } as T;
  } else if (props instanceof DocumentReference) {
    const ref = props;
    const get = async () => {
      const snap = await getDoc(ref);
      return snap.exists() ? snap.data() : null;
    };
    const set = (content: any) => setDoc(ref, content);
    return { get, set } as T;
  }
  console.log("Invalid props type. Expected string or DocumentReference.");
  return {} as T;
}

if (process.env.NODE_ENV === "development") {
  (window as any).firestore = firestore;
}
