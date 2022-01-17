import { useState, useEffect } from "react";
import { getTodayData } from "../lib/records";


export default function RoomTable(props) {
    const [state, setState] = useState();

    useEffect(() => {
        getTodayData().then((res) => { setState(res); })
    }, []);

    const slotString = (slot_name, idx) => {
        return slot_name.slice(0, idx) + 'h-' + slot_name.slice(idx) + 'h';
    }

    function handleCheckboxChange(e) {
        const [roomName, timeSlot] = e.target.name.split('-');
        props.setBooking((prevBooking) => {
            let ticket = { ...prevBooking.ticket };
            if (e.target.checked) ticket[timeSlot] = roomName;
            else ticket[timeSlot] = '';
            return { ticket };
        });
    }

    function makeTable(roomName) {
        const room = state.rooms[roomName];
        let table = Object.entries(room['timeSlots']).map((slot, index) => {
            const slotName = slotString(slot[0], 2);
            const available_tables = room.capacity - slot[1].length;
            return (
                <tr key={index} data-item={slot}>
                    <td data-title='timeslot'>{slotName}</td>
                    <td data-title='available_tables'>{available_tables}</td>
                    <td data-title='booked'>
                        <input type="checkbox"
                            name={roomName + '-' + slot[0]}
                            onChange={handleCheckboxChange}
                            disabled={(props.booking.ticket[slot[0]] !== '' && props.booking.ticket[slot[0]] !== roomName) || !available_tables}
                        />
                    </td>
                </tr >
            )
        });
        return table;
    }

    if (state !== undefined && Object.keys(state).length) {
        return (
            <section>
                <h2>{props.roomName}</h2 >
                <table id='room_info'>
                    <thead>
                        <tr>
                            <th>Time Slot</th>
                            <th>Mesas Disponíveis</th>
                            <th>Checked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {makeTable(props.roomName)}
                    </tbody>
                </table>
            </section>
        );
    }
    else return <p>Loading...</p>;
}
