
export default function PrimaryBtn({ handler, title }) {
    return (
        <button id='primary-btn' onClick={handler}>{title}</button>
    )
}