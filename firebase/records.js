import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './db';


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

// @TODO: mudar para transações:
// - Ler array
// - Verificar se o email que queremos adicionar não está já no array
// - Adicionar se não estiver; rejeitar reserva se já estiver.
async function setReservation(email, ticket) {
    let ticketArray = Object.entries(ticket);
    const today = getReorderedDateStr(new Date().toISOString().split('T')[0], '_');
    for (let index = 0; index < ticketArray.length; index++) {
        const item = ticketArray[index];
        if (item[1]) {
            await updateDoc(doc(db, 'daily_room_enrollments', today), {
                [`rooms.${item[1]}.timeSlots.${item[0]}`]: arrayUnion(email)
            }).then(() => {
                console.log(item);
                console.log('Successfully added requested bookings!');
                return true;
            }).catch((error) => {
                console.log('Something went wrong : ', error);
                return false;
            })
        }
    }
}

export { getTodayData, getReorderedDateStr, setReservation };