import { signIn, logOut } from "./authFirebase";
import { addUser, getUser } from "./firestoreFirebase";


export async function signInFunction() {
    try {
        const result = await signIn();
        const user = await getUser(result.user.uid);
        if (!user) {
            const value = {
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                watchList: [],
            }
            await addUser(value.uid, value);
            return value;
            // dispatch(setUser(value));
        } else {
            return user;
            // dispatch(setUser(user));
        }
    }
    catch (e) {
        console.error(e)
    }
}

export async function logOutFunction() {
    try {
        await logOut();
        return {};
        // dispatch(setUser({}));
    }
    catch (e) {
        console.error(e)
    }
}