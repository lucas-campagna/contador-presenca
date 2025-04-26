import { getDoc, getDocs, addDoc, doc, collection } from "firebase/firestore";
import useFirebase from "./useFirebase";

export default function useFirestore(collectionName: string) {
    const { db } = useFirebase();

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
    const add = (content: any) => {
        const ref = collection(db, collectionName);
        addDoc(ref, content);
    }
    return { get, add, getAll }

}