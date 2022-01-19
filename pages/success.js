import Loading from "../components/Loading";
import { useAuth } from "../lib/AuthUserContext"

export default function Success() {
    const { authUser, loading } = useAuth();
    if (!loading)
        if (authUser)
            return (
                <div>
                    <h1>Success</h1>
                    <p>Your reservation was successfull!</p>
                    <button><a href="/">Home</a></button>
                </div>
            )
        else window.location.href = '/login';
    else return <Loading />;
}