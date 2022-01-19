import { getCookies } from 'cookies-next';
import { setReservation } from '../lib/records';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/AuthUserContext';
import Link from 'next/link';
import Loading from '../components/Loading';

export default function Confirmation() {
    const router = useRouter();
    const { authUser, loading } = useAuth();

    function submitBooking() {
        const ticket = JSON.parse(decodeURIComponent(getCookies('ticket').ticket)).ticket;
        // console.log(ticket);
        if (setReservation(authUser.email, ticket)) router.push('/success');
        else console.log('deu merrrda');
    }

    // @TODO: Apresentar informação do ticket
    if (!loading)
        if (authUser)
            return (
                <div>
                    <h1>Confirmation</h1>
                    <button><Link href='booking'>go back</Link></button>
                    <p>Ticket Info Placeholder</p>
                    <button onClick={submitBooking}>book now</button>
                </div>
            )
        else window.location.href = '/login';
    else return <Loading />;
}