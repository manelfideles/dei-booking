import { useAuth } from "../lib/AuthUserContext";
import { useRouter } from "next/router";

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
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="booking">Booking</a></li>
                    <li><button onClick={onLogout}>Logout</button></li>
                </ul>
            </nav>
        )
    }
    else {
        return (
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        )
    }
}