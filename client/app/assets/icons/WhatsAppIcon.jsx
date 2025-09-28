import whatsapp from "../../assets/images/whatsapp.png"
import Link from 'next/link'

const WhatsAppIcon = ({ link = "" }) => (
    <Link href={link}>
        <img src={whatsapp.src} className='icon-top' alt='whatsapp' />
    </Link>
)

export default WhatsAppIcon;
