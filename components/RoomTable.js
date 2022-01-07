import React from "react";
import { getTodayData } from "../firebase/records";

class RoomTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        getTodayData().then((res) => { this.setState(res); });
    }

    makeSlotString(slot_name, idx) {
        return slot_name.slice(0, idx) + 'h-' + slot_name.slice(idx) + 'h';
    }

    makeTable(roomName) {
        const room = this.state.rooms[roomName];
        let table = Object.entries(room['timeSlots']).map((slot, index) => {
            const slot_name = this.makeSlotString(slot[0], 2);
            const available_tables = room.capacity - slot[1].length;
            return (
                <tr key={index} data-item={slot}>
                    <td data-title='timeslot'>{slot_name}</td>
                    <td data-title='available_tables'>{available_tables}</td>
                    <td data-title='checked'><input type="checkbox" name="selected" disabled={!available_tables} /></td>
                </tr >
            )
        });
        return table;
    }

    render() {
        if (this.state !== undefined && Object.keys(this.state).length) {
            return (
                <section>
                    <h2>{this.props.roomName}</h2 >
                    <table id='room_info'>
                        <th>Time Slot</th>
                        <th>Mesas Disponíveis</th>
                        <th>Checked</th>
                        <tbody>
                            {this.makeTable(this.props.roomName)}
                        </tbody>
                    </table>
                </section>
            );
        }
        return <span>merda</span>
    }
}

export default RoomTable;