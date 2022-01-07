const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

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

// Creates a new document
// on Firebase with empty slots
exports.dailyJob = functions.pubsub
    .schedule('1 0 * * *').onRun((context) => {
        console.log('Initiating scheduled operation.');
        const dateStr = new Date().toISOString().split('T')[0];
        let [year, month, day] = [
            dateStr.slice(0, 4),
            dateStr.slice(5, 7),
            dateStr.slice(8, dateStr.length),
        ];
        const today = `${day}_${month}_${year}`;
        const newDoc = db.collection('daily_room_enrollments').doc(today);
        newDoc.set(dailyTemplate)
            .then(() => {
                console.log('Successfully created.');
            }).catch((error) => {
                console.error("Error writing document to Firebase: ", error);
            });
        return null;
    });


