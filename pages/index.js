import { useAuth } from "../lib/AuthUserContext";
import Navbar from "../components/Navbar";

export default function Home() {
  const { authUser } = useAuth();

  if (authUser) {
    return (
      <div>
        <h1>Home</h1>
        <Navbar />
        <h1>Bem-vindo {authUser.displayName}</h1>
      </div>
    );
  }
  else {
    return (
      <div>
        <h1>Home</h1>
        <Navbar />
        <h1>Faça login pf</h1>
      </div>
    );
  }

}
