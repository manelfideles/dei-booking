// Hooks
import { useAuth } from "../lib/AuthUserContext";

// Animations
import clocks1 from '../public/gifs/clocks1.gif';
import clocks2 from '../public/gifs/clocks2.gif';
import clocks3 from '../public/gifs/clocks3.gif';
import clocks4 from '../public/gifs/clocks4.gif';

// SVG
import bolt from '../public/img/bolt.svg';
import clock from '../public/img/clock.svg';
import wifi from '../public/img/wifi.svg';
import at from '../public/img/at.svg';
import website from '../public/img/website.svg';
import facebook from '../public/img/facebook.svg';
import instagram from '../public/img/instagram.svg';

// Components
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import PrimaryBtn from "../components/PrimaryBtn";
import RoomCard from "../components/RoomCard";
import GifGrid from "../components/GifGrid";
import ContactLink from "../components/ContactLink";
import Image from "next/image";

// Resources
import sala1 from '../public/img/sala-dei-1-duotone.jpg';
import sala2 from '../public/img/sala-dei-2-duotone.jpg';
import sala3 from '../public/img/sala-dei-3-duotone.jpg';
import AmenitiesCard from "../components/AmenitiesCard";

const particlesConfig = {
  fpsLimit: 30,
  particles: {
    number: { value: 15 },
    color: { value: "#000" },
    shape: { type: "image" },
    opacity: { value: 1, random: true, },
    size: { value: 10 },
    move: {
      enable: true,
      speed: 5,
      direction: "left",
      random: false,
      straight: true,
      outModes: { default: "out" },
    },
    zIndex: { value: -1, opacityRate: 0.5 }
  },
  interactivity: { detectsOn: "canvas" },
  detectRetina: true,
  emitters: {
    position: {
      y: 55,
      x: -30
    },
    rate: {
      delay: 2,
      quantity: 10
    },
    size: {
      width: 50,
      height: 50
    },
    particles: {
      shape: {
        type: "images",
        options: {
          images: [
            {
              src: "../public/img/books-emoji.png",
              width: 205,
              height: 267
            },
            {
              src: "../public/img/graduation-cap-emoji.png",
              width: 207,
              height: 265
            },
            {
              src: "../public/img/writing-hand-emoji.png",
              width: 204,
              height: 266
            }
          ]
        }
      },
      size: {
        value: 40
      },
      move: {
        speed: 5,
        outModes: {
          default: "destroy",
          left: "none"
        },
        straight: true
      },
      zIndex: {
        value: 10000
      },
      /* rotate: {
        value: {
          min: 0,
          max: 360
        },
        animation: {
          enable: false,
          speed: 10,
          sync: true
        }
      } */
    }
  }
};

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
          <h2>Escolhe qualquer uma das salas disponíveis</h2>
          <div id='card-list'>
            <RoomCard title='C5.1' url={sala1} />
            <RoomCard title='C5.3' url={sala2} />
            <RoomCard title='A6.1' url={sala3} />
          </div>
        </section>
        <section id='schedule'>
          <h2>Seleciona o melhor horário para ti.</h2>
          <GifGrid gifs={[clocks1, clocks2, clocks3, clocks4]} />
        </section>
        <section id='amenities'>
          <h2>Aproveita!</h2>
          <div className="am-div">
            <AmenitiesCard url={bolt} title='Tomadas' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' />
            <AmenitiesCard url={clock} title='Horário' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' />
            <AmenitiesCard url={wifi} title='Wifi' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' />
          </div>
        </section>
        <section id='contacts'>
          {/* <Image /> */}
          <h2>Contactos</h2>
          <p>Não hesites em contactar-nos caso tenhas alguma dúvida!</p>
          <div className="contact-links">
            <ContactLink image_url={at} title='neiaac@gmail.com' />
            <ContactLink image_url={website} title='neiaac@gmail.com' />
            <ContactLink image_url={facebook} title='neiaac@gmail.com' />
            <ContactLink image_url={instagram} title='neiaac@gmail.com' />
          </div>

        </section>
      </div>
    )
}
