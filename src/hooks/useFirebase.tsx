import { useContext } from 'react';
import { FirebaseContext } from "../contexts/FirebaseContext";
const useFirebase = () => useContext(FirebaseContext);
export default useFirebase;
