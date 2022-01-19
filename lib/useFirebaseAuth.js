import { useState, useEffect } from 'react';
import { db } from './db';
import {
    getAuth, signOut,
    getRedirectResult,
    GoogleAuthProvider,
    signInWithRedirect,
    onAuthStateChanged
} from 'firebase/auth';


export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const authStateChanged = (authState) => {
        if (!authState) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setAuthUser(auth.currentUser);
        setLoading(false);
    };

    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    };

    const userSignIn = async () => {
        await signInWithRedirect(auth, provider)
        await getRedirectResult(auth);
    };

    const userSignOut = async () => { signOut(auth).then(clear); }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => { unsubscribe(); };
    }, []);

    return {
        authUser,
        loading,
        userSignIn,
        userSignOut
    };
}