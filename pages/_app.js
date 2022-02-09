import { AuthUserProvider } from "../lib/AuthUserContext";
import '../styles/base.css';
import '../styles/index.css';
import '../styles/Navbar.css';
import '../styles/PrimaryBtn.css';
import '../styles/RoomCard.css';
import '../styles/GifGrid.css';
import '../styles/AmenitiesCard.css';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  )
}

export default MyApp
