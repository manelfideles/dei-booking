import Image from "next/image";

export default function ContactLink({ image_url, title }) {
    return (
        <div className="contact-link">
            <Image id='cl-image' src={image_url} />
            <span id="cl-title" >{title}</span>
        </div>
    )
};
