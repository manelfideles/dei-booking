import { useAuth } from "../lib/AuthUserContext";
import { useRouter } from "next/router";
import PrimaryBtn from "./PrimaryBtn";

export default function Navbar() {
    const { authUser, userSignOut } = useAuth();
    const router = useRouter();

    const onLogout = () => {
        userSignOut();
        router.push('/');
    }

    if (authUser) {
        return (
            <nav>
                <a href="/">dei_booking</a>
                <ul>
                    <li><PrimaryBtn handler={() => router.push('/booking')} title='Marcar' /></li>
                    <li><PrimaryBtn handler={onLogout} title='Sair' /></li>
                </ul>
            </nav>
        )
    }
    else {
        return (
            <nav>
                <ul>
                    <li><a href="/">dei_booking</a></li>
                    <li><PrimaryBtn handler={() => { router.push('/login') }} title='Entrar' /></li>
                </ul>
            </nav>
        )
    }
}