import Image from "next/image";

export default function GifGrid({ gifs }) {
    let gifList = gifs.map((gif, index) => {
        return <Image className='box' key={index} src={gif} alt='ticking clocks animation' />
    })
    return <div className='gif-grid'>{gifList}</div>
}