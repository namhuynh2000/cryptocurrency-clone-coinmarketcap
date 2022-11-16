import { app as appFirebase } from '../services/firebase';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(appFirebase);

export async function addUser(id, data) {
    try {
        await setDoc(doc(db, "users", id), data);
    }
    catch (e) {
        console.error(e);
    }
}

export async function getUser(id) {
    try {
        const docSnap = await getDoc(doc(db, "users", id));
        if (docSnap.exists()) {
            return docSnap.data();
        }
        else {
            return null;
        }
    } catch (e) {
        console.error(e)
    }
}

export async function updateUser(id, data) {
    try {
        await updateDoc(doc(db, "users", id), data);
    } catch (e) {
        console.error(e);
    }
}