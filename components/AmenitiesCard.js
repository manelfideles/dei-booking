import Image from "next/image";

export default function AmenitiesCard({ url, title, description }) {
    return (
        <div className='amenities-card'>
            <Image id='am-card-img' src={url} width='125px' height='125px' />
            <span id="am-card-title">{title}</span>
            <p id='am-card-description'>{description}</p>
        </div>
    )
}