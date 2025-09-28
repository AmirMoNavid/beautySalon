import telegram from "../../assets/images/telegram.png"
import Link from 'next/link'

const TelegramIcon = ({ link = "" }) => (
    <Link href={link}>
        <img src={telegram.src} className='icon-top' alt='telegram' />
    </Link>
)

export default TelegramIcon;
