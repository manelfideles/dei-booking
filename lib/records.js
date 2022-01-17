import { doc, getDoc, setDoc, arrayUnion, runTransaction } from 'firebase/firestore';
import { db } from './db';
// import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';


const dailyTemplate = {
    enrollmentsClosed: false,
    rooms: {
        A61: {
            capacity: 12,
            isFull: false,
            timeSlots: {
                12_14: [],
                14_16: [],
                16_18: [],
                18_20: [],
            }
        },
        C53: {
            capacity: 24,
            isFull: false,
            timeSlots: {
                12_14: [],
                14_16: [],
                16_18: [],
                18_20: [],
            }
        },
        C54: {
            capacity: 24,
            isFull: false,
            timeSlots: {
                12_14: [],
                14_16: [],
                16_18: [],
                18_20: [],
            }
        },
    }
}

function getReorderedDateStr(dateStr, sep) {
    let [year, month, day] = [
        dateStr.slice(0, 4),
        dateStr.slice(5, 7),
        dateStr.slice(8, dateStr.length),
    ];
    return `${day}${sep}${month}${sep}${year}`;
}

async function getTodayData() {
    const today = getReorderedDateStr(new Date().toISOString().split('T')[0], '_');
    const docSnap = await getDoc(doc(db, "daily_room_enrollments", today));

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document :(");
        console.log("Creating records for today...");
        await setDoc(doc(db, 'daily_room_enrollments', today), dailyTemplate)
            .then(() => {
                console.log('Successfully created today\'s records!');
            }).catch((error) => { console.log('Something went wrong : ', error); })
        const docSnap = await getDoc(doc(db, "daily_room_enrollments", today));
        return docSnap.data();

    }
}

async function updateEnrollments() { }

async function setReservation(email, ticket) {
    let ticketArray = Object.entries(ticket);
    const today = getReorderedDateStr(new Date().toISOString().split('T')[0], '_');
    try {
        await runTransaction(db, async (transaction) => {
            for (let index = 0; index < ticketArray.length; index++) {
                const item = ticketArray[index];
                if (item[1]) {
                    transaction.update(doc(db, 'daily_room_enrollments', today), {
                        [`rooms.${item[1]}.timeSlots.${item[0]}`]: arrayUnion(email)
                    });
                    console.log('Successfully added ticket to bookings!');
                }
            }
        });
        console.log('Successfully updated bookings with user\'s ticket.');
        return true;
    } catch (e) {
        console.log('Something went wrong: ', e);
        return false;
    }
}

/* function loginUser() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
        .then((result) => {
            console.log(result.user);
            return result.user;
        }).catch((error) => {
            console.log('Something went wrong: ', error);
            return null;
        })
} */

export { getTodayData, getReorderedDateStr, setReservation, /* loginUser */ };