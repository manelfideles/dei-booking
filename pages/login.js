import { useAuth } from "../lib/AuthUserContext";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

export default function Login() {
    const { userSignIn } = useAuth();
    const router = useRouter();

    const onLogin = () => {
        userSignIn();
        router.push('/login');
    }

    return (
        <div>
            <h1>Login</h1>
            <Navbar />
            <button onClick={onLogin}>Login with Google</button>
        </div>
    )
}