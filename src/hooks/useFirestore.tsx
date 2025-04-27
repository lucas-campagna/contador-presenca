import { getDoc, getDocs, addDoc, setDoc, doc, collection, DocumentReference, DocumentData } from "firebase/firestore";
import useFirebase from "./useFirebase";

type FirestoreProp = string | DocumentReference<DocumentData, DocumentData> | void;
export type SearchCollection<T = any> = {
    get: (docName: string) => Promise<T>;
    set: (docName: string, content: T) => Promise<void>;
    add: (content: T) => Promise<void>;
    getAll: () => Promise<T[]>;
}
export type SearchDocument<T = any> = {
    get: () => Promise<T>;
    set: (content: T) => Promise<void>;
}

export default function useFirestore<T = any>(prop: FirestoreProp) {
    const { db } = useFirebase();

    if (typeof prop === 'string') {
        const collectionName = prop;
        const getAll = async () => {
            const ref = collection(db, collectionName);
            const snap = await getDocs(ref);
            const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            return data;
        }

        const get = async (docName: string) => {
            const ref = doc(db, collectionName, docName);
            const snap = await getDoc(ref);
            if (!snap.exists()) {
                return null;
            }
            return snap.data() as any;
        }

        const add = async (content: any) => {
            const ref = collection(db, collectionName);
            await addDoc(ref, content);
        }

        const set = async (docName: string, content: any) => {
            const ref = doc(db, collectionName, docName);
            await setDoc(ref, content);
        }

        return { get, set, add, getAll } as T;
    } else if (prop instanceof DocumentReference) {
        const ref = prop;
        const get = async () => {
            const snap = await getDoc(ref);
            return snap.exists() ? snap.data() : null;
        }
        const set = (content: any) => setDoc(ref, content)
        return { get, set } as T;
    }
    console.log("Invalid prop type. Expected string or DocumentReference.");
    return {} as T;
}