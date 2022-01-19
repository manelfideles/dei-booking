import { useAuth } from "../lib/AuthUserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

export default function Login() {
    const { authUser, userSignIn, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (authUser) router.push('/');
    }, [authUser])

    if (loading) return <Loading />;
    else
        return (
            <div>
                <h1>Login</h1>
                <Navbar />
                <button onClick={userSignIn}>Login with Google</button>
            </div>
        )
}