import React from 'react';
import Timer from '../components/Timer';
import Navbar from '../components/Navbar';
import RoomTable from '../components/RoomTable';

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: true };

    }

    timeUntilClosing = obj => Object.values(obj).reduce((a, b) => a + b);
    handleTimeLeft = (timeLeft) => {
        if (this.timeUntilClosing(timeLeft) <= 0) this.setState({ open: false });
    }

    render() {
        if (this.state.open == true) {
            return (
                <div>
                    <h1>Booking</h1>
                    <Navbar />
                    <Timer timeLeft={this.handleTimeLeft} />
                    <main>
                        <RoomTable roomName='A61' />
                        <RoomTable roomName='C53' />
                        <RoomTable roomName='C54' />
                    </main>
                </div>
            )
        }
        else return (
            <div>
                <h1>Enrollments closed for today</h1>
                <p>Wait until 12pm to enroll for tomorrow.</p>
            </div >
        )
    }
}

export default Booking;
