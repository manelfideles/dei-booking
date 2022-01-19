import { useState } from 'react';
import { setCookies } from 'cookies-next';
import Link from 'next/link';
import Timer from '../components/Timer';
import Navbar from '../components/Navbar';
import RoomTable from '../components/RoomTable';
import { useAuth } from '../lib/AuthUserContext';
import Loading from '../components/Loading';

export default function Booking() {
    const { authUser, loading } = useAuth();
    const [open, setOpen] = useState(true);
    // @TODO - initial state == bookings que o user fez hoje
    // - bloquear em checked as bookings que ja estao
    // demasiado proximas, p.ex < 2h de diferenca
    const [booking, setBooking] = useState({
        // timeSlot: room -> can only be one room per timeSlot per user
        ticket: {
            '1214': '',
            '1416': '',
            '1618': '',
            '1820': ''
        }
    });

    const timeUntilClosing = (obj) => { Object.values(obj).reduce((a, b) => a + b); }
    function handleTimeLeft(timeLeft) {
        if ((timeUntilClosing(timeLeft) <= 0) && (open == true))
            setOpen(false);
    }

    if (!loading)
        if (authUser)
            if (open == true) {
                return (
                    <div>
                        <h1>Booking</h1>
                        <Navbar />
                        <Timer timeLeft={handleTimeLeft} />
                        <main>
                            <RoomTable roomName='A61' booking={booking} setBooking={setBooking} />
                            <RoomTable roomName='C53' booking={booking} setBooking={setBooking} />
                            <RoomTable roomName='C54' booking={booking} setBooking={setBooking} />
                            <button id='next' onClick={setCookies('ticket', JSON.stringify(booking))}>
                                <Link href='confirmation'>Seguinte</ Link>
                            </button>
                        </main>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <h1>Enrollments closed for today</h1>
                        <p>Wait until 12pm to enroll for tomorrow.</p>
                    </div >
                )
            }
        else window.location.href = '/login';
    else return <Loading />;
}