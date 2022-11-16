import { app as appFirebase } from '../services/firebase';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

export const auth = getAuth(appFirebase);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export async function signIn() {
    return await signInWithPopup(auth, provider);
}

export async function logOut() {
    return await signOut(auth, provider);
}

