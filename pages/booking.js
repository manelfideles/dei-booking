import { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import Navbar from '../components/Navbar';
import RoomTable from '../components/RoomTable';

export default function Booking() {
    const [open, setOpen] = useState(true);
    const [booking, setBooking] = useState({
        // timeSlot: room -> can only be one room per timeSlot
        ticket: {
            '1214': '',
            '1416': '',
            '1618': '',
            '1820': '',
        }
    });

    useEffect(() => {
        console.log('re-rendered!');
        console.log('--', booking);
    }, [booking])

    const timeUntilClosing = (obj) => { Object.values(obj).reduce((a, b) => a + b); }
    function handleTimeLeft(timeLeft) {
        if ((timeUntilClosing(timeLeft) <= 0) && (open == true))
            setOpen(false);
    }

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
                    <button id='next' onClick={() => { console.log(booking) }}>Seguinte</button>
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
}