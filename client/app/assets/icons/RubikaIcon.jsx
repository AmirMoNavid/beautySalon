import Rubika from "../../assets/images/rubika.png"
import Link from 'next/link'

const RubikaIcon = ({ link = "https://rubika.ir/abyekiha" }) => (
    <Link href={link}>
        <img src={Rubika.src} className='icon-top' alt='Rubika' />
    </Link>
)

export default RubikaIcon;
