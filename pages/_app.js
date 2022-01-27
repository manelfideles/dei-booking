import { AuthUserProvider } from "../lib/AuthUserContext";
import '../styles/base.css';
import '../styles/index.css';
import '../styles/Navbar.css';
import '../styles/PrimaryBtn.css';
import '../styles/RoomCard.css';


function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  )
}

export default MyApp
