import { useAuth } from "../lib/AuthUserContext";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useRouter } from "next/router";

export default function Login() {
    const { userSignIn, loading } = useAuth();
    const router = useRouter();

    if (loading) return <Loading />;
    else
        return (
            <div>
                <h1>Login</h1>
                <Navbar />
                <button onClick={() => { userSignIn(); router.push('/') }}>Login with Google</button>
            </div>
        )
}