import Image from "next/image";

export default function RoomCard({ title, url }) {
    return (
        <div id='room-card'>
            <div id='img-container'>
                <Image class='room-image' src={url} alt="room-img" />
            </div>
            <span>{title}</span>
        </div>
    )
}