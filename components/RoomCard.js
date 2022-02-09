import Image from "next/image";
import { useState } from "react";

const useMove = () => {
    const [state, setState] = useState({ x: 0, y: 0 })

    const handleMouseMove = e => {
        e.persist()
        setState(state => ({ ...state, x: e.clientX, y: e.clientY }))
    }
    return {
        x: state.x,
        y: state.y,
        handleMouseMove,
    }
}

export default function RoomCard({ title, url }) {

    const { x, y, handleMouseMove } = useMove();
    const { translation, setTranslation } = useState({});

    return (
        <div id='room-card' onMouseMove={handleMouseMove}>
            <div id='img-container'>
                <Image class='room-image' src={url} alt="room-img" />
            </div>
            <div id='text-container'>
                <span>{title}</span>
            </div>
        </div>
    )
}