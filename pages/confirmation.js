import { getCookies } from 'cookies-next';
import { setReservation } from '../firebase/records';
import Link from 'next/link';

export default function Confirmation() {

    function submitBooking() {
        const ticket = JSON.parse(decodeURIComponent(getCookies('ticket').ticket)).ticket;
        console.log(ticket);
        if (setReservation('ruben@gmail.com', ticket)) {
            window.location.href = 'success';
        } else console.log('deu merrrda');
    }

    // @TODO: Apresentar informação do ticket
    return (
        <div>
            <h1>Confirmation</h1>
            <button><Link href='booking'>go back</Link></button>
            <p>Ticket Info Placeholder</p>
            <button onClick={submitBooking}>book now</button>
        </div>
    )
}