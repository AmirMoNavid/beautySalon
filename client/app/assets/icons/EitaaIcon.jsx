import Eitaa from "../../assets/images/eitaa.png";
import Link from 'next/link'

const EitaaIcon = ({ link = "https://eitaa.com/abyekiha" }) => (
    <Link href={link}>
        <img src={Eitaa.src} className='icon-top' alt='eitaa' />
    </Link>
)

export default EitaaIcon;

