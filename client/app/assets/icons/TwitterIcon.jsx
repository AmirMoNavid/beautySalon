import twitter from "../../assets/images/twitter.png"
import Link from 'next/link'

const TwitterIcon = ({ link = "" }) => (
    <Link href={link}>
        <img src={twitter.src} className='icon-top' alt='twitter' />
    </Link>
)

export default TwitterIcon;
