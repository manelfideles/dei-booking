import { getCookies } from 'cookies-next';
import { setReservation } from '../firebase/records';
import Link from 'next/link';

export default function Confirmation() {

    function submitBooking() {
        // jeez
        let ticket = JSON.parse(decodeURIComponent(getCookies('ticket').ticket)).ticket;
        console.log(ticket);
        setReservation('fabricio@gmail.com', ticket);
        // if (setReservation('manuelfideles77@gmail.com', ticket)) window.location.href = 'success';
    }

    // @TODO: Apresentar informação do ticket
    return (
        <div>
            <h1>Confirmation</h1>
            <button><Link href='booking'>go back</Link></button>
            <p>Ticket Placeholder</p>
            <button onClick={submitBooking}>book now</button>
        </div>
    )
}