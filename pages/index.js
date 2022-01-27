import { useAuth } from "../lib/AuthUserContext";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import PrimaryBtn from "../components/PrimaryBtn";
import RoomCard from "../components/RoomCard";
import sala1 from '../public/img/sala-dei-1-duotone.jpg';
import sala2 from '../public/img/sala-dei-2-duotone.jpg';
import sala3 from '../public/img/sala-dei-3-duotone.jpg';

export default function Home() {
  const { loading } = useAuth();

  if (loading) return <Loading />;
  else
    return (
      <div>
        <section id='hero'>
          <Navbar />
          <div>
            <h1>Ter lugar no DEI nunca foi tão <span>fácil</span>.</h1>
            <PrimaryBtn handler={() => { console.log('clicked marcar'); }} title='Marcar' />
          </div>
        </section>
        <section id='rooms'>
          <RoomCard title='C5.1' url={sala1} />
          <RoomCard title='C5.3' url={sala2} />
          <RoomCard title='A6.1' url={sala3} />
        </section>
        <section id='schedule'>schedule</section>
        <section id='amenities'>amenities</section>
        <section id='contacts'>contacts</section>
      </div>
    )
}
